import { SlashCommandBuilder, CommandInteraction, EmbedBuilder } from "discord.js"
import { client } from "~/plugins/1.bot"

export const Points = {
    data: new SlashCommandBuilder().setName('points').setDescription('Shows how many points you have.'),
    async execute(interaction: CommandInteraction) {
        const db = useDatabase()
        const user = await db.sql`select * from users where discord_id = ${interaction.user.id}`

        const embed = new EmbedBuilder()
            .setTitle('Currency')
            .setURL('https://tes.thesaltynewfie.ca/me/currency')
            .addFields(
                { name: 'Your Currency', value: `${user.rows[0].currency}` },
            )
            .setTimestamp()
            .setFooter({text: '*Values can be out of date by 2-3 minutes!*'})

        await interaction.reply({embeds: [embed]})
    }
}
