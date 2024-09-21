import {client} from "~/server/plugins/1.bot"
import { generateOTP, generateHex } from "~/server/utils/security/otp"
import { SlashCommandBuilder, CommandInteraction, EmbedBuilder, Options } from "discord.js"
import dotenv from 'dotenv'

export default defineEventHandler(async (event) => {
    const {discordId} = await readBody(event)
    const db = useDatabase()

    const user = await db.sql`SELECT username FROM users WHERE discord_id=${discordId}`
    
    if(user) {
        const hash = generateHex()
        const otp = generateOTP(discordId, hash)

        const embed = new EmbedBuilder()
			.setTitle('Urgent!')
            .setDescription(`Did you request a password change? Please click the link to continue, if this wasnt you, please contact any TES Admin`)
            .setURL(`${dotenv.config().parsed?.BACKEND_URL}/otp/${hash}`)
			.setColor("#ff0000")
			.setTimestamp()

        await client.users.send(discordId, {embeds: [embed]})

        return new Response(JSON.stringify({"message": "request recieved"}), {status: 200})
    }
})