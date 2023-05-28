import { AnyZodObject, z } from 'zod'

export const signUpSchema: AnyZodObject = z.object({
  body: z.object({
    email: z.string().email().toLowerCase().trim(),
    username: z
      .string()
      .trim()
      .min(3)
      .max(25)
      .toLowerCase()
      .regex(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{1,}$/, 'invalid'),
  }),
})

export const signInSchema: AnyZodObject = z.object({
  body: z.object({
    email: z.string().toLowerCase().trim(),
  }),
})

export const signInGoogleSchema: AnyZodObject = z.object({
  query: z.object({
    scope: z.string(),
    authuser: z.string(),
    prompt: z.string(),
    code: z.string(),
  }),
})

export const signInGithubSchema: AnyZodObject = z.object({
  query: z.object({
    path: z.string(),
    code: z.string(),
  }),
})

export const verifyIdentitySchema: AnyZodObject = z.object({
  query: z.object({
    code: z.string(),
  }),
})
