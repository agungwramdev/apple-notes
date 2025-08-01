// /api/user POST 
// /server/utils/prisma.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) =>  {
    const body = await readBody(event)

    // bcrypt
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(body.password, salt)

    await prisma.user.create({
        data: {
            email: body.email,
            password: hashedPassword,
            salt: salt,
        }
    })
    return {data: 'Successfully created user'} 
})