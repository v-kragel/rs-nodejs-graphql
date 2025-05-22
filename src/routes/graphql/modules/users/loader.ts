import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';
import { Author, Subscription } from './type.js';

export const createSubscribedToUserLoader = (prisma: PrismaClient) =>
  new DataLoader(async (userIds) => {
    const ids = userIds as string[];

    const authors: Author[] = await prisma.user.findMany({
      where: {
        userSubscribedTo: { some: { authorId: { in: ids } } },
      },
      include: { userSubscribedTo: true },
    });

    const map = new Map<string, Author[]>();

    for (const author of authors) {
      for (const sub of author.userSubscribedTo) {
        const list = map.get(sub.authorId) ?? [];
        list.push(author);
        map.set(sub.authorId, list);
      }
    }

    return ids.map((id) => map.get(id) ?? []);
  });

export const createUserToSubscribeLoader = (prisma: PrismaClient) =>
  new DataLoader(async (userIds) => {
    const ids = userIds as string[];

    const subscriptions: Subscription[] = await prisma.user.findMany({
      where: {
        subscribedToUser: { some: { subscriberId: { in: ids } } },
      },
      include: { subscribedToUser: true },
    });

    const subscriptionsBySubscriberId = subscriptions.reduce((map, user) => {
      user.subscribedToUser.forEach((subscription) => {
        const existingSubscriptions = map.get(subscription.subscriberId) || [];
        existingSubscriptions.push(user);
        map.set(subscription.subscriberId, existingSubscriptions);
      });
      return map;
    }, new Map<string, Subscription[]>());

    return ids.map((id) => subscriptionsBySubscriberId.get(id) || []);
  });
