import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { mcUsers } from './mcUsers';

export const users = sqliteTable('users', {
    id: integer('id').primaryKey(),
    username: text('username').notNull().unique(),
    discordId: text('discordId').notNull().unique(),
    passwordHash: text('passwordHash').notNull(),
    currency: integer('currency').default(0),
    experience: real('experience').default(1.0),
    mcUsername: text('mc_username').unique().references(() => mcUsers.mcUsername),
    redeemedGifts: text('redeemedGifts'),
    role: text('role').notNull()
})