export default defineEventHandler(async (event) => {
    const db = await useDatabase()
    const { game, code } = await getRouterParams(event)

    try {
        const gift = await db.sql`SELECT * FROM gifts WHERE code=${code} AND game=${game}`
        const user = await db.sql`SELECT * FROM users WHERE id=${event.context.user.userId}`
        const redeemedGifts = user.rows[0].redeemed_gifts || ''

        if (!gift.rows[0]) {
            return new Response('Gift not found', { status: 404 })
        }

        let userGifts = (redeemedGifts as String).split(',').filter(Boolean) // Split and remove any empty strings
        console.log(userGifts, code)

        if (!userGifts.includes(code)) {
            const newRedeemedGifts = userGifts.length > 0 ? `${redeemedGifts},${code}` : code
            await db.sql`UPDATE users SET redeemed_gifts = ${newRedeemedGifts} WHERE id=${event.context.user.userId}`
        } else {
            return new Response('This gift has already been redeemed', { status: 429 })
        }

        return gift.rows[0].items

    } catch (e) {
        console.log(e)
        return new Response('Server Error', { status: 500 })
    }
})