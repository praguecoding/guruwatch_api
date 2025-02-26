import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import {
  Product,
  ProductAdd,
  ProductEdit,
  ProductHistory,
  Projects,
  ProductUpdateCompetitivenessUrl
} from './types.js';

/**
 * Definice AppRouter pro klienta
 * Obsahuje pouze procedury a jejich vstupy/výstupy, nikoliv implementaci
 */

// Vytvoříme minimální tRPC instanci pro definici typů
const t = initTRPC.create();

// Definice routeru podobným způsobem jako na serveru
export const appRouter = t.router({
  // Projekty
  isLoggedIn: t.procedure
    .query(() => true),

  getProjects: t.procedure
    .query((): Projects[] => []),

  // Produkty
  getProducts: t.procedure
    .input(z.object({ projectId: z.string() }))
    .query((): Product[] => []),

  checkProductEan: t.procedure
    .input(z.object({ ean: z.string(), projectId: z.string() }))
    .query(() => ({ exists: false })),

  setProduct: t.procedure
    .input(z.custom<ProductEdit>())
    .mutation(() => ({ success: true })),

  addProduct: t.procedure
    .input(z.custom<ProductAdd>())
    .mutation(() => ({ success: true, _id: '' })),

  deleteProduct: t.procedure
    .input(z.object({ productId: z.string() }))
    .mutation(() => ({ success: true })),

  getProductHistory: t.procedure
    .input(z.object({ productId: z.string() }))
    .query((): ProductHistory[] => []),

  updateProductCompetitivenessUrl: t.procedure
    .input(z.custom<ProductUpdateCompetitivenessUrl>())
    .mutation(() => ({ success: true })),

  exportProductCompetitors: t.procedure
    .input(z.object({ projectId: z.string() }))
    .mutation(() => ({ success: true, data: '' }))
});

// Exportujeme typ routeru pro použití v klientovi
export type AppRouter = typeof appRouter; 