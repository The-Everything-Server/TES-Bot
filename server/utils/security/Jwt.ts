import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

const secretKey = dotenv.config().parsed?.OTP_SECRET!

export interface Payload {
    userId: number
    username: string
}

export const generateToken = (payload: Payload) => {
    const token = jwt.sign(payload, secretKey)

    return token
}

export const verifyToken = (token: string): Payload => {
    try {
        const payload = jwt.verify(token, secretKey) as Payload

        return payload
    } catch (error) {
        console.log('Error in verifying token', error)
    }
}