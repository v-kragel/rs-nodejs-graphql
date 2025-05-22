import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';
import { Post } from './type.js';

export const createPostLoader = (prisma: PrismaClient) =>
  new DataLoader(async (userIds) => {
    const ids = userIds as string[];

    const posts: Post[] = await prisma.post.findMany({
      where: { authorId: { in: ids } },
    });

    const postsMap = new Map<string, Post[]>();

    posts.forEach((post) => {
      const postsAuthor = postsMap.get(post.authorId) || [];
      postsAuthor.push(post);
      postsMap.set(post.authorId, postsAuthor);
    });

    return ids.map((id) => postsMap.get(id) || []);
  });
