import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';
import { Member } from './type.js';

export const createMemberLoader = (prisma: PrismaClient) =>
  new DataLoader(async (userIds) => {
    const ids = userIds as string[];

    const members: Member[] = await prisma.memberType.findMany({
      where: { id: { in: ids } },
    });

    const membersMap = new Map<string, Member>(members.map((m) => [m.id, m]));

    return ids.map((id) => membersMap.get(id) ?? null);
  });
