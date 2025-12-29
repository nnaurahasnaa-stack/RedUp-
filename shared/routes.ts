import { z } from 'zod';
import { insertUserSchema, users, questions, articles } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  unauthorized: z.object({
    message: z.string(),
  })
};

export const api = {
  auth: {
    register: {
      method: 'POST' as const,
      path: '/api/register',
      input: insertUserSchema,
      responses: {
        201: z.custom<typeof users.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    login: {
      method: 'POST' as const,
      path: '/api/login',
      input: z.object({
        username: z.string(),
        password: z.string(),
      }),
      responses: {
        200: z.custom<typeof users.$inferSelect>(),
        401: errorSchemas.unauthorized,
      },
    },
    logout: {
      method: 'POST' as const,
      path: '/api/logout',
      responses: {
        200: z.object({ message: z.string() }),
      },
    },
    me: {
      method: 'GET' as const,
      path: '/api/user',
      responses: {
        200: z.custom<typeof users.$inferSelect>(),
        401: errorSchemas.unauthorized,
      },
    },
  },
  questions: {
    list: {
      method: 'GET' as const,
      path: '/api/questions',
      responses: {
        200: z.array(z.custom<typeof questions.$inferSelect>()),
      },
    },
  },
  articles: {
    list: {
      method: 'GET' as const,
      path: '/api/articles',
      responses: {
        200: z.array(z.custom<typeof articles.$inferSelect>()),
      },
    },
  },
};

export type RegisterInput = z.infer<typeof api.auth.register.input>;
export type LoginInput = z.infer<typeof api.auth.login.input>;
