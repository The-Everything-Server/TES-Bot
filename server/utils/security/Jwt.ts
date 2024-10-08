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

// TODO: Rework this function, namely better returning
export const verifyToken = (token: string | undefined): Payload | boolean => {
    if(token === undefined) {
        return false
    }

    try {
        const payload = jwt.verify(token, secretKey) as Payload
        return payload
    } catch (error) {
        console.log('Error in verifying token', error)
        return false
    }
}