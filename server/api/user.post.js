// /api/user POST 
// /server/utils/prisma.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) =>  {
    try {
        const body = await readBody(event)

        // bcrypt Hashing
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(body.password, salt)

        // Send data to DB
        await prisma.user.create({
            data: {
                email: body.email,
                password: hashedPassword,
                salt: salt,
            }
        })
        return {data: 'Successfully created user'} 

    } catch (error) {
        console.log(error.code);

        if (error.code === 'P2002') {
            throw createError({
                statusCode: 409,
                message: 'User Dengan Email ini Sudah Terdaftar!'
            })
        }
        
        throw error
    }
    
})