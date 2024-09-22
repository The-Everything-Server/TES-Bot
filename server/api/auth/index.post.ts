import { generateToken, Payload } from "~/server/utils/security/Jwt"
import { db } from "~/server/db/db"
import { users } from "~/server/models/user"
import { and, eq } from "drizzle-orm"

export default defineEventHandler(async (event) => {
    const {username, password} = await readBody(event)

    console.log('login', {username, password})

    const user = await db.select().from(users).where(and(eq(users.passwordHash, password), eq(users.username, username)))

    if (!user) {
        return new Response(JSON.stringify({"message":'Invalid credentials'}), { status: 401 })
    }

    const payload: Payload = {
        userId: user[0].id,
        username: user[0].username,
    }

    const token = generateToken(payload)

    return {token: token}
})