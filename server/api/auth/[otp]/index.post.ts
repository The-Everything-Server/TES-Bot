import { verifyOTP } from "~/server/utils/security/otp";
import dotenv from 'dotenv'

export default defineEventHandler(async (event) => {
    const db = useDatabase()
    const otp = await getRouterParam(event, "otp")
    const {newPassword} = await readBody(event)

    const result = await verifyOTP(otp!)

    if(result !== null) {
        console.log(result, newPassword)

        await db.sql`UPDATE users SET passwordHash=${newPassword} WHERE discord_id=${result}`

        return new Response(JSON.stringify({"message": "successful"}), { status: 200 })
    }

    return new Response(JSON.stringify({"message":'Invalid credentials'}), { status: 401 })
})