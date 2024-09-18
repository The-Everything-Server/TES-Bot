export default defineEventHandler(async (event) => {
    const db = await useDatabase()
    const { game, code, items } = await readBody(event)

    const itemsString = JSON.stringify(items)

    const gift = await db.prepare('INSERT INTO gifts (game, code, items) VALUES ($game, $code, $items)')
    const info = gift.run({ game, code, items: itemsString })

    return info
})