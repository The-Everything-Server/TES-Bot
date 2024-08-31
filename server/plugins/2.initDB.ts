export default defineNitroPlugin(async (nitro) => {
    const db = useDatabase()
    let addDummyAccounts = true

    await db.sql`create table if not exists mc_users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        mc_username TEXT NOT NULL UNIQUE,
        currency INTEGER DEFAULT 0
    )`

    await db.sql`create table if not exists users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE, 
        discord_id TEXT NOT NULL UNIQUE,
        passwordHash TEXT NOT NULL, 
        currency INTEGER DEFAULT 0,
        experience FLOAT DEFAULT 1,
        mc_username TEXT,
        foreign key (mc_username) references mc_users(mc_username)
    )`

    if (addDummyAccounts) {
        await db.sql`
            insert or ignore into users (username, discord_id, passwordHash, currency, experience) 
            values ('Toby', '237340379437858817', 'test', 100, 100.0)
        `
    }
})