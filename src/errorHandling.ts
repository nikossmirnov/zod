import { z } from 'zod';
import { fromZodError  } from 'zod-validation-error';

const PersonCoordsSchema = z.object({
  id: z.union([z.string(), z.number()]),
  username: z.string().min(3, "MIN LENGHT MUST BE 3"),
  coords: z.tuple([z.number(), z.number(), z.number().gt(4).int()]).rest(z.number())
})

type PersonCoords = z.infer<typeof PersonCoordsSchema>;

const personCoords: PersonCoords = { 
  id: 3213,
  username: 'asd',
  coords: [3, 5, 7]
};
console.log(PersonCoordsSchema.parse(personCoords))