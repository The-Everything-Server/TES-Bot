import discord
from discord.ext import commands


class Ping(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.command()
    async def ping(self, ctx):
        await ctx.reply("Hello!")

def setup(bot):
    bot.add_cog(Ping(bot))
