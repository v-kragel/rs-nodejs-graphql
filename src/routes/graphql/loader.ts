import { PrismaClient } from '@prisma/client';
import { createMemberLoader } from './modules/member-types/loader.js';
import DataLoader from 'dataloader';
import { Member } from './modules/member-types/type.js';
import { createPostLoader } from './modules/posts/loader.js';
import { Post } from './modules/posts/type.js';
import { createProfilesLoader } from './modules/profiles/loader.js';
import { Profile } from './modules/profiles/type.js';
import {
  createSubscribedToUserLoader,
  createUserToSubscribeLoader,
} from './modules/users/loader.js';
import { Author, Subscription } from './modules/users/type.js';

export const createLoaders = (prisma: PrismaClient) => ({
  memberTypeLoader: createMemberLoader(prisma),
  postsLoader: createPostLoader(prisma),
  profilesLoader: createProfilesLoader(prisma),
  subscribedToUserLoader: createSubscribedToUserLoader(prisma),
  userToSubscribeLoader: createUserToSubscribeLoader(prisma),
});

export type Loaders = {
  memberTypeLoader: DataLoader<string, Member>;
  postsLoader: DataLoader<string, Post[]>;
  profilesLoader: DataLoader<string, Profile>;
  subscribedToUserLoader: DataLoader<string, Subscription[]>;
  userToSubscribeLoader: DataLoader<string, Author[]>;
};
