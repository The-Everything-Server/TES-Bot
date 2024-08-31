import { generateToken, Payload } from "~/utils/security/Jwt"

export default defineEventHandler(async (event) => {
    const db = useDatabase()
    const {username, password} = await readBody(event)

    console.log('login', {username, password})

    const user = await db.sql`SELECT * FROM users WHERE passwordHash=${password} AND username=${username}`

    if (!user.rows[0]) {
        return new Response(JSON.stringify({"message":'Invalid credentials'}), { status: 401 })
    }

    const payload: Payload = {
        userId: +user.rows[0].id,
        username: user.rows[0].username.toString(),
    }

    const token = generateToken(payload)

    return {token: token}
})