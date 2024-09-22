import { sqliteTable, text, integer} from 'drizzle-orm/sqlite-core';

export const mcUsers = sqliteTable('mcUsers', {
    id: integer('id').primaryKey(),
    mcUsername: text('mcUsername').unique().notNull(),
    currency: integer('currency').default(0)
})