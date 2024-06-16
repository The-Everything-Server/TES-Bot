import discord
from discord.ext import commands
from discord.utils import get
from utils.database import Database

ADMIN = 237340379437858817

class EconomyDebug(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.command()
    async def addPoints(self, ctx, points):
        db = Database("economy.db")
        db.execute("UPDATE economy SET balance = balance + ? WHERE user_id = ?", int(points), ctx.author.id)
        await ctx.reply(f"Added {points} points to account!")
            

    @commands.command()
    async def removePoints(self, ctx, points):
        db = Database("economy.db")
        db.execute("UPDATE economy SET balance = balance - ? WHERE user_id = ?", int(points), ctx.author.id)
        await ctx.reply(f"Removed {points} points from account!")

    @commands.command()
    async def generateDB(self, ctx):
        Database("economy.db").execute("CREATE TABLE IF NOT EXISTS economy (user_id INTEGER, balance INTEGER)")
        Database("store.db").execute("CREATE TABLE IF NOT EXISTS shop (mc_id INTEGER, name TEXT, cost INTEGER)")

    @commands.command()
    async def createItem(self, ctx, *args):
        shop = Database("store.db")
        shop.execute("INSERT INTO shop (mc_id, name, cost) VALUES (?,?,?)", args[0], args[1], args[2])
        await ctx.reply("Added item to store!")


class Economy(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.command(aliases=["econ", "bal", "balance"])
    async def myBalance(self, ctx):
        db = Database("economy.db")
        result = db.execute("SELECT balance FROM economy WHERE user_id = ?", ctx.author.id)

        embed=discord.Embed(title=f"{ctx.author.name}'s Balance", color=0x00ff00)
        embed.add_field(name="Points", value=result[0][0], inline=False)

        await ctx.reply(embed=embed)

    @commands.command()
    async def createAccount(self, ctx):
        db = Database("economy.db")
        db.execute("INSERT INTO economy (user_id, balance) VALUES (?, ?)", ctx.author.id, 0)
        await ctx.reply("Account created!")

    @commands.command(aliases=["shop", "store"])
    async def viewShop(self, ctx):
        db = Database("store.db")
        result = db.execute("SELECT * FROM shop")
        
        embed=discord.Embed(title="Shop", description="List of items", color=0x00ff00)

        for row in result:
            mc_id = row[0]
            name = row[1]
            cost = row[2]
            embed.add_field(name=f"{name} | {mc_id}", value=f"Cost: {cost}", inline=False)
        
        await ctx.reply(embed=embed)

    @commands.command(aliases=["buy", "purchase"])
    async def purchaseItem(self, ctx, itemID, amnt):
        econ = Database("economy.db")
        store = Database("store.db")

        item = store.execute("SELECT * FROM shop WHERE mc_id = ?", int(itemID))
        playerMoney = econ.execute("SELECT balance FROM economy WHERE user_id = ?", ctx.author.id)
        checkCost = int(playerMoney[0][0]) - (int(item[0][2]) * int(amnt))
        print(checkCost)

        if int(amnt) <= 0:
            with open("isawthatshit.jpg", "rb") as f:
                meme = discord.File(f)
                await ctx.reply("I saw that shit.", file=meme)
                return

        if checkCost >= 0:
            econ.execute("UPDATE economy SET balance = balance - ? WHERE user_id = ?", (int(item[0][2]) * int(amnt)), ctx.author.id)
            await ctx.reply(f"You purchased {amnt} {item[0][1]}s for {(int(item[0][2]) * int(amnt))} points!")
        else:
            await ctx.reply("You do not have enough money!")

    @commands.command(aliases=["send", "give"])
    async def transferFunds(self, ctx, toUser, amnt):
        econ = Database("economy.db")
        playerOneMoney = econ.execute("SELECT balance FROM economy WHERE user_id = ?", ctx.author.id)
        toUserMoney = econ.execute("SELECT balance FROM economy WHERE user_id = ?", toUser)
        checkCost = int(playerOneMoney[0][0]) - int(amnt)
        
        if int(amnt) <= 0:
            with open("isawthatshit.jpg", "rb") as f:
                meme = discord.File(f)
                await ctx.reply("I saw that shit.", file=meme)
                return

        if checkCost >= 0:
            print("PAST IF STATEMENT")
            econ.execute("UPDATE economy SET balance = balance - ? WHERE user_id = ?", int(amnt), ctx.author.id)
            econ.execute("UPDATE economy SET balance = balance + ? WHERE user_id = ?", int(amnt), int(toUser))

            embed = discord.Embed(title=f"Points Transfer")
            embed.add_field(name="Total", value=amnt, inline=False)
            embed.add_field(name="Your Points", value=playerOneMoney[0][0], inline=True)
            embed.add_field(name="Their Points", value=toUserMoney[0][0], inline=True)

            await ctx.reply(embed=embed)
        else:
            embed = discord.Embed(title=f"Points Transfer")
            embed.add_field(name="Error", value="You do not have enough points!")
            await ctx.reply(embed=embed)

def setup(bot):
    bot.add_cog(Economy(bot))
