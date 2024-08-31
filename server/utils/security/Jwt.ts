import jwt from 'jsonwebtoken'

const secretKey = 'Change_this_before_running_lmao'

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