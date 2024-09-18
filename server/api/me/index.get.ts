export default defineEventHandler(async (event) => {
    const db = useDatabase()

    const user = await db.sql`SELECT id, username, discord_id, currency, experience, mc_username FROM users WHERE id=${event.context.user.userId}`

    return user.rows[0]
})