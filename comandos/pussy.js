const Discord = require('discord.js')
const { get } = require("snekfetch");

exports.run =  async (client, message, args) => {

    let av = message.author.avatarURL
    let user = message.author.username
    let botav = client.user.avatarURL
    let botuser = client.user.username

const canal = new Discord.RichEmbed()
.setAuthor(client.user.username, client.user.avatarURL)
.setTitle(`O Comando só é permitido em canais NSFW!`)
.setImage(`https://images-ext-1.discordapp.net/external/8MfjnzwRfOG4Ywm1Kvep6lb8em7ym9cKUZL6QoTC_6c/https/b1nzy-banned.me/g/V6Aeh.gif?width=400&height=57`)
.setFooter(user, av)
.setTimestamp();

    const { body } = await get("https://nekobot.xyz/api/image?type=pussy");
    if (!message.channel.nsfw) return message.reply(canal);
const embed = new Discord.RichEmbed()
.setDescription(`<:18cdm:614653146689437697> **[Sem imagem? Clique aqui!](${body.message})**`)
.setImage(body.message)
.setColor("RANDOM")
.setFooter(user, av)
.setTimestamp();
message.channel.send(embed)

}