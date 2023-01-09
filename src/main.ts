import { z } from 'zod';

const UserSchema = z.object({
  username: z.string(),
  age: z.number().optional(),
  bday: z.date().optional(),
  isCoder: z.boolean().optional(),
})

type User = z.infer<typeof UserSchema>;
const user: User = { username: 'asd'};

console.log(UserSchema.safeParse(user))