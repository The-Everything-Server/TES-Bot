import discord
from discord.ext import commands
from utils.database import *

class Debug(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.command()
    async def rundbcommand(self, ctx, db, query):
        selectedDB = Database(db)
        result = selectedDB.execute(query)
        await ctx.reply(result)
    

def setup(bot):
    bot.add_cog(Debug(bot))
