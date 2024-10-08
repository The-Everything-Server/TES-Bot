import { db } from "~/server/db/db"
import { users } from "~/server/models/user"
import { eq } from "drizzle-orm"
import { clerkClient, getAuth } from '#clerk'

export default defineEventHandler(async (event) => {
    const {userId, orgRole} = getAuth(event)

    if(!userId) {
        setResponseStatus(event, 403)
        return JSON.stringify({"message": "Auth Failed"})
    }

    return clerkClient(event).users.getUser(userId)

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