import { z } from 'zod'

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3000)
})

const { data: env, error } = EnvSchema.safeParse(process.env)

if (error) {
  console.error('Invalid env:')
  console.error(JSON.stringify(error.flatten().fieldErrors, null, 4))
  process.exit(1)
}

export default env!
