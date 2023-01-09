import { z } from 'zod';

const brandEmail = z
    .string()
    .email()
    .refine(val => val.endsWith("@gmail.com"), {
        message: "input your email, please"
    })

const email = "test@gmail.com"
console.log(brandEmail.parse(email))