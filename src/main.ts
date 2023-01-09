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

const PersonCoordsSchema = z.object({
  id: z.union([z.string(), z.number()]),
  username: z.string().min(3),
  coords: z.tuple([z.number(), z.number(), z.number().gt(4).int()]).rest(z.number())
})

type PersonCoords = z.infer<typeof PersonCoordsSchema>;

const personCoords: PersonCoords = { 
  id: 3213,
  username: 'asd',
  coords: [3, 5, 7]
};
console.log(PersonSchema.parse(personCoords))



const PersonStatusSchema = z.object({
  id: z.discriminatedUnion("status", [
    z.object({status: z.literal("success"), data: z.string() }),
    z.object({status: z.literal("failed"), error: z.instanceof(Error) }),
  ])
})

type PersonStatus = z.infer<typeof PersonStatusSchema>;

const personStatus: PersonStatus = { 
  id: {
    status: 'success',
    data: 'asd'
  }
};
console.log(PersonStatusSchema.safeParse(personStatus))



const UserMap = z.record(z.string(), z.object({ name: z.string() }))

const personRecord = new Map([
  ["id-mark", { name: "mark" }],
  ["id-kyle", { name: "kyle" }]
]);
console.log(UserMap.safeParse(personRecord))



const PromiseSchema = z.promise(z.string())
const p = Promise.resolve('dasd')

console.log(PromiseSchema.parse(p))