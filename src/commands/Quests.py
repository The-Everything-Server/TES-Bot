import discord
from discord.ext import commands
from utils.database import Database


class Quests(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.command()
    async def getAvailableQuests(self, ctx):
        pass

    @commands.command()
    async def claimRewards(self, ctx):
        pass
    

def setup(bot):
    bot.add_cog(Quests(bot))
