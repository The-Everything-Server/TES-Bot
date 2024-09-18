import { client } from "~/server/plugins/1.bot"
import { TextChannel } from 'discord.js'

export default defineEventHandler(async (event) => {
    const { channel_id, message } = await readBody<{ channel_id: string; message: string }>(event)

    console.log(`Message: ${message} Channel_ID: ${channel_id}`)

    const channel = client.channels.cache.get(channel_id) as TextChannel
    await channel.send(message)

    return { success: true }
})