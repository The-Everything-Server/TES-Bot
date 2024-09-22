import { sqliteTable, text, integer} from 'drizzle-orm/sqlite-core';

export const gifts = sqliteTable('gifts', {
    id: integer('id').primaryKey(),
    game: text('game').notNull(),
    code: text('code').notNull().unique(),
    items: text('items').notNull()
})