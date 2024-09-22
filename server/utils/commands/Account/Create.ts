import { SlashCommandBuilder, CommandInteraction, EmbedBuilder, Options } from "discord.js"
import { client } from "~/server/plugins/1.bot"
import { generateHex, generateOTP } from "~/server/utils/security/otp"
import dotenv from 'dotenv'

import { db } from "~/server/db/db"
import { users } from "~/server/models/user"

export const Create = {

	data: new SlashCommandBuilder()
		.setName('create_account')
		.setDescription('Creates your universal account for all TES Game Servers (If supported)')
        .addStringOption(option => {
            return option
                .setName('username')
                .setDescription('Leave empty if you wish to use your discord name')
                .setRequired(false)
        }),

	async execute(interaction: CommandInteraction) {
		const username = interaction.user.globalName?.toString()

        console.log(username)
        await db.insert(users).values({username: username, discordId: interaction.user.id, passwordHash: generateHex()})
        
        //TODO: Redo this section
        const challengePhrase = generateHex()
        const otp = await generateOTP(interaction.user.id, challengePhrase)

		const embed = new EmbedBuilder()
			.setTitle('Attention!')
            .setDescription(`Please finish your account setup with this OTP!`)
            .addFields({name: "Challenge Phrase", value: otp})
            .setURL(`${dotenv.config().parsed?.BACKEND_URL}/otp/${challengePhrase}`)
			.setColor("#FFFF00")
			.setTimestamp()

        client.users.cache.get(interaction.user.id).send({embeds: [embed]})

        await interaction.reply("Please check your DMs!")
	}
}