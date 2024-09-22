import { db } from "~/server/db/db"
import { users } from "~/server/models/user"
import { eq } from "drizzle-orm"

export default defineEventHandler(async (event) => {
    const user = await db.select({
        id: users.id, 
        username: users.username,
        discordId: users.discordId,
        currency: users.currency,
        experience: users.experience,
        mcUsername: users.mcUsername
    }).from(users).where(eq(users.id, event.context.user.userId))

    return user[0]
})