import { PrismaClient } from '@prisma/client';
import { Loaders } from './loader.js';

export type Context = {
  prisma: PrismaClient;
  loaders: Loaders;
};
