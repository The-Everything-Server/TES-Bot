import { Client, GatewayIntentBits, Collection, Events, REST, Routes } from 'discord.js'
import dotenv from 'dotenv'
import path from 'path'

import { Points } from '~/server/utils/commands/Economy/Points' 
import { Stats } from '~/server/utils/commands/User/Stats'
import { Link } from '~/server/utils/commands/Minecraft/Link'
import { Create } from '~/server/utils/commands/Account/Create'

let client: Client
let commands = []

const clientId = dotenv.config().parsed?.DEV_CLIENT_ID
const guildId = dotenv.config().parsed?.DEV_GUILD_ID

export default defineNitroPlugin((nitro) => {
    const rest = new REST().setToken(dotenv.config().parsed?.DEV_DISCORD_TOKEN)

    client = new Client({
        intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
    })

    client.commands = new Collection()

    commands.push(Points.data.toJSON())
    client.commands.set(Points.data.name, Points)

    commands.push(Stats.data.toJSON())
    client.commands.set(Stats.data.name, Stats)

    commands.push(Link.data.toJSON())
    client.commands.set(Link.data.name, Link)

    commands.push(Create.data.toJSON())
    client.commands.set(Create.data.name, Create)

    client.once('ready', () => {
        console.log(`Logged in as ${client.user?.tag}!`)
    })

    client.on(Events.InteractionCreate, async interaction => {
        if (!interaction.isChatInputCommand()) return;
    
        const command = interaction.client.commands.get(interaction.commandName);
    
        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }
    
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    })

    const test = async() => {
        try {
            console.log(`Started refreshing ${commands.length} application (/) commands.`);
    
            // The put method is used to fully refresh all commands in the guild with the current set
            const data = await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                { body: commands },
            );
    
            console.log(`Successfully reloaded ${data.length} application (/) commands.`);
        } catch (error) {
            console.error(error);
        } 
    }

    test()
    
    client.login(dotenv.config().parsed?.DEV_DISCORD_TOKEN)
})

export { client }