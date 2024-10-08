import { SlashCommandBuilder, CommandInteraction, EmbedBuilder, Options } from "discord.js"
import { client } from "~/plugins/1.bot"
import { generateHex, generateTOTP } from "~/utils/security/otp"
import dotenv from 'dotenv'

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
        const kv = useStorage('data')
		const username = interaction.options.getString('username')
        const db = useDatabase()

        await db.sql`
            INSERT INTO users (username, discord_id, passwordHash, currency, experience)
            VALUES (${username ? username : interaction.user.globalName}, ${interaction.user.id}, ${generateHex()}, 100, 0)
        `
w
        const otp = generateTOTP(generateHex())

		const embed = new EmbedBuilder()
			.setTitle('Attention!')
            .setDescription(`Please finish your account setup with this OTP!`)
            .addFields({name: "OTP", value: otp})
            .setURL(`${dotenv.config().parsed?.BACKEND_URL}/otp`)
			.setColor("#FFFF00")
			.setTimestamp()

        client.users.cache.get(interaction.user.id).send({embeds: [embed]})

        await interaction.reply("Please check your DMs!")
	}
}