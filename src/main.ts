import { z } from 'zod';
enum Hobbies {
  gym,
  coding,
  basketball
}
const UserSchema = z.object({
  username: z.string().min(3),
  age: z.number().optional(),
  bday: z.date().optional(),
  isCoder: z.boolean().default(true),
  hobby: z.nativeEnum(Hobbies) 
})
.merge(z.object({ name: z.string().optional() }))

type User = z.infer<typeof UserSchema>;
const user: User = { 
  username: 'asd',
  age: 20,
  bday: new Date(),
  isCoder: true,
  hobby: Hobbies.basketball
};

console.log(UserSchema.safeParse(user))
console.log(UserSchema.shape.username)
console.log(UserSchema.partial())

const PersonSchema = z.object({
  username: z.string().min(3),
  friends: z.array(z.string()).nonempty()
})

type Person = z.infer<typeof PersonSchema>;

PersonSchema.shape.friends.element
const person: Person = { 
  username: 'asd',
  friends: ['asd', 'dsa']
};
console.log(PersonSchema.parse(person))
