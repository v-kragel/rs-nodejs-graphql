import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';
import { Profile } from './type.js';

export const createProfilesLoader = (prisma: PrismaClient) =>
  new DataLoader(async (userIds) => {
    const ids = userIds as string[];

    const profiles: Profile[] = await prisma.profile.findMany({
      where: { userId: { in: ids } },
    });

    const profilesMap = new Map<string, Profile>(profiles.map((p) => [p.userId, p]));

    return ids.map((id) => profilesMap.get(id) ?? null);
  });
