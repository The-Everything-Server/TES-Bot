import { db } from "~/server/db/db"
import { users } from "~/server/models/user"
import { eq } from "drizzle-orm"

export default defineEventHandler(async (event) => {
    const result = await db.select().from(users).all()

    return result
})