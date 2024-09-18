import { SlashCommandBuilder, CommandInteraction, EmbedBuilder } from "discord.js"
import { client } from "~/server/plugins/1.bot"

export const Stats = {
    data: new SlashCommandBuilder().setName('stats').setDescription('Returns stats.'),
    async execute(interaction: CommandInteraction) {
        const db = useDatabase()
        const user = await db.sql`select * from users where discord_id = ${interaction.user.id}`

        const embed = new EmbedBuilder()
            .setTitle('Currency')
            .setURL('https://tes.thesaltynewfie.ca/me')
            .addFields(
                    {name: 'Username', value: `${user.rows[0].username}`},
                    {name: 'Experience', value: `${user.rows[0].experience}`},
                    {name: 'Minecraft Username', value: `${user.rows[0].mc_username ? user.rows[0].mc_username : "Account isnt linked"}`},
                    {name: 'Your Currency', value: `${user.rows[0].currency}`},
            )
            .setTimestamp()
            .setFooter({text: '*Values can be out of date by 2-3 minutes!*'})

        await interaction.reply({embeds: [embed]})
    }
}