import * as crypto from 'crypto'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

const secret = dotenv.config().parsed?.OTP_SECRET!

export async function generateOTP(discordId: string, challengePhrase: string) {
    const kv = await useStorage("data")

    await kv.setItem(challengePhrase, discordId)

    return challengePhrase
}

export async function verifyOTP(challengePhrase: string): Promise<string | null> {
    const kv = await useStorage("data")
    const result = await kv.getItem(challengePhrase)

    if(result !== null) {
        await kv.removeItem(challengePhrase)

        return result.toString()
    }
    
    return null
}

export function generateHex() {
    return crypto.randomBytes(32).toString("hex")
}