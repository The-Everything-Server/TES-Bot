import { SlashCommandBuilder, CommandInteraction, EmbedBuilder, Options } from "discord.js"
import { client } from "~/plugins/1.bot"

export const Link = {
    data: new SlashCommandBuilder()
        .setName('link')
        .setDescription('Links minecraft accounts.')
        .addStringOption( option => {
            return option
                .setName("username")
                .setDescription("Your in-game username (IMPORTANT!!)")
                .setRequired(true)
        })
        .addStringOption( option => {
            return option
                .setName("game")
                .setDescription("The game you want to link to your account")
                .setRequired(false)
        }),
    async execute(interaction: CommandInteraction) {
        const db = useDatabase()
        const user = await db.sql`select * from users where discord_id = ${interaction.user.id}`
        
        const username = interaction.options.getString('username')

        await db.sql`INSERT INTO mc_users (mc_username, currency) VALUES (${username}, 100)`
        await db.sql`UPDATE users SET mc_username = ${username} WHERE id = ${user.rows[0].id}`

        const embed = new EmbedBuilder()
            .setTitle('Account Link')
            .setDescription(`Your account has been successfully linked!\n${interaction.user.displayName} -> ${username}`)
            .setColor("#57e389")
            .setTimestamp()

        await interaction.reply({embeds: [embed]})
    }
}