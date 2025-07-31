// /api/user POST 
// /server/utils/prisma.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) =>  {
    const body = await readBody(event)
    await prisma.user.create({
        data: {
            email: body.email,
            password: body.password
        }
    })
    return {data: 'Successfully created user'} 
})