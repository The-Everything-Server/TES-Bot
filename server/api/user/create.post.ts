import { db } from "~/server/db/db"
import { users } from "~/server/models/user"

export default defineEventHandler(async (event) => {
    const {username, password, discord_id} = await readBody(event)

    const user = await db.insert(users).values({username: username, passwordHash: password, discordId: discord_id, role: "user"})

    return user
})