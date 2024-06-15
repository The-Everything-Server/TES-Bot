import discord
from discord.ext import commands
import yt_dlp
import nacl
import os


class Music(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.command(aliases=["play", "music"])
    async def join(self, ctx, url):
        ydl_opts = {
            'format': 'bestaudio/best',
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3'
            }]
        }


        channel = ctx.author.voice.channel
        voice = discord.utils.get(self.bot.voice)

        if not voice is None:
            if voice.is_connected():
                print("Connected!")
                if discord.VoiceClient.is_playing() == False:
                    try:
                        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                            infodict = ydl.extract_info(url, download=False)
                            song_name = infodict.get("title")
                            artist_name = infodict.get("uploader")

                            ydl.download(url)

                        for file in os.listdir("./"):
                            if file.endswith(".mp3"):
                                os.rename(file, "song.mp3")

                        embed=discord.Embed(title="Youtube", color=0x00ff00)
                        embed.add_field(name=song_name, value=artist_name, inline=False)
                        embed.set_footer(text=url)
                        await ctx.send(embed=embed)

                        await channel.play(discord.FFmpegPCMAudio(source="./song.mp3"))

                    except Exception as e:
                        print(f"Error when downloading: {e}")
                        await ctx.send(e)

            else:
                print("Connected first!")
                vc = await channel.connect()
                try:
                    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                        infodict = ydl.extract_info(url, download=False)
                        song_name = infodict.get("title")
                        artist_name = infodict.get("uploader")

                        ydl.download(url)

                    for file in os.listdir("./"):
                        if file.endswith(".mp3"):
                            os.rename(file, "song.mp3")

                    embed=discord.Embed(title="Youtube", color=0x00ff00)
                    embed.add_field(name=song_name, value=artist_name, inline=False)
                    embed.set_footer(text=url)
                    await ctx.send(embed=embed)

                    vc.play(discord.FFmpegPCMAudio(source="./song.mp3"))

                except Exception as e:
                    print(f"Error when downloading: {e}")
                    await ctx.send(e)

    @commands.command()
    async def stop(self, ctx):
        await ctx.voice_client.disconnect()


def setup(bot):
    bot.add_cog(Music(bot))
