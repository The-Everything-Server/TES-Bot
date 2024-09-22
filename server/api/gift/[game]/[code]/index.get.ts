import { and, eq } from "drizzle-orm"
import { db } from "~/server/db/db"
import { gifts } from "~/server/models/gifts"
import { users } from "~/server/models/user"

export default defineEventHandler(async (event) => {
    const { game, code } = await getRouterParams(event)

    try {
        const gift = await db.select().from(gifts).where(and(eq(gifts.code, code), eq(gifts.game, game)))
        const user = await db.select().from(users).where(eq(users.id, event.context.user.userId))
        const redeemedGifts = user[0].redeemedGifts || ''

        if (!gift[0]) {
            return new Response('Gift not found', { status: 404 })
        }

        let userGifts = (redeemedGifts as String).split(',').filter(Boolean) // Split and remove any empty strings
        console.log(userGifts, code)

        if (!userGifts.includes(code)) {
            const newRedeemedGifts = userGifts.length > 0 ? `${redeemedGifts},${code}` : code
            await db.update(users).set({redeemedGifts: newRedeemedGifts}).where(eq(users.id, event.context.user.userId))
        } else {
            return new Response('This gift has already been redeemed', { status: 429 })
        }

        return gift[0].items

    } catch (e) {
        console.log(e)
        return new Response('Server Error', { status: 500 })
    }
})