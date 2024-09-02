export default defineEventHandler(async (event) => {
    const db = await useDatabase()
    const {username, password, discord_id} = await readBody(event)

    const user = await db.prepare("INSERT INTO users (username, passwordHash, discord_id) VALUES ($username, $passwordHash, $discord_id)")
    const info = user.run({username, passwordHash: password, discord_id})

    return info
})