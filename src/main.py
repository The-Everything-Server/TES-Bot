import discord
from discord.ext import commands
import json
import os
from dotenv import load_dotenv
from commands.Economy import Economy, EconomyDebug
from commands.Ping import Ping
from commands.Debug import Debug
from commands.Music import Music
import asyncio
import services.databaseServer
import threading

def startDB():
    server_thread = threading.Thread(target=services.databaseServer.app.run)
    server_thread.daemon = True
    server_thread.start()

load_dotenv()

intents = discord.Intents.default()
intents.message_content = True
bot = commands.Bot(command_prefix=">", intents=intents)

@bot.event
async def on_ready():
    print(f'Logged in as {bot.user.name} ({bot.user.id})')
    print('------')

async def main():
    async with bot:
        await bot.add_cog(Ping(bot))
        await bot.add_cog(Economy(bot))
        await bot.add_cog(EconomyDebug(bot))
        await bot.add_cog(Debug(bot))
        await bot.add_cog(Music(bot))
        startDB()
        await bot.start(os.getenv("DISCORD_TOKEN"))

asyncio.run(main())