import { verifyOTP } from "~/server/utils/security/otp";
import dotenv from 'dotenv'
import { db } from "~/server/db/db"
import { users } from "~/server/models/user"
import { and, eq } from "drizzle-orm"

export default defineEventHandler(async (event) => {
    const otp = await getRouterParam(event, "otp")
    const {newPassword} = await readBody(event)

    const result = await verifyOTP(otp!)

    if(result !== null) {
        console.log(result, newPassword)
        await db.update(users).set({passwordHash: newPassword}).where(eq(users.discordId, result))

        return new Response(JSON.stringify({"message": "successful"}), { status: 200 })
    }

    return new Response(JSON.stringify({"message":'Invalid credentials'}), { status: 401 })
})