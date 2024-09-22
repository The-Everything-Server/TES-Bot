import { and, eq } from "drizzle-orm"
import { db } from "~/server/db/db"
import { gifts } from "~/server/models/gifts"
import { users } from "~/server/models/user"

export default defineEventHandler(async (event) => {
    const { game, code, items } = await readBody(event)

    const itemsString = JSON.stringify(items)
    await db.insert(gifts).values({game: game, code: code, items: itemsString})

    return new Response(JSON.stringify({message: "Successful!"}), {status: 200})
})