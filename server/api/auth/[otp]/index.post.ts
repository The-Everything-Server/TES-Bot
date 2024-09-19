import { verifyTOTP } from "~/server/utils/security/otp";
import dotenv from 'dotenv'

export default defineEventHandler(async (event) => {
    const otp = await getRouterParam(event, "otp")
    const challenge_phrase = await readBody(event)
    const kv = useStorage('data')

    const key = await kv.getItem(otp!)

    console.log(key, otp, challenge_phrase.challenge_phrase)

    if(key == challenge_phrase.challenge_phrase) {
        return verifyTOTP(otp, dotenv.config().parsed?.OTP_SECRET!)
    }

    return new Response(JSON.stringify({"message":'Invalid credentials'}), { status: 401 })
})