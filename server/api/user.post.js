// /api/user POST 
// /server/utils/prisma.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import validator from 'validator';


const prisma = new PrismaClient()

export default defineEventHandler(async (event) =>  {
    try {
        const body = await readBody(event)

        if(!validator.isEmail(body.email)){
            throw createError({
                statusCode: 400,
                message: 'Email tidak valid!'
            })
        }

        if(!validator.isStrongPassword(body.password, {
            minLength: 8,
            minLowercase: 0,
            minUppercase: 0,
            minNumbers: 0,
            minSymbols: 0,
        })){
            throw createError({
                statusCode: 400,
                message: 'Password tidak memenuhi 8 karakter, harap diubah!'
            })
        }



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