const Discord = require("discord.js")
const client = new Discord.Client();
const { get } = require("snekfetch");

module.exports.run = async (client, message, args) => {
if (message.author.id !== '631219646275780659') return message.reply(":7775: | você não possui permissão para usar esse comando.");
message.delete()

let servidores = client.guilds.size
let usuarios = client.users.size

let mensagem = args.join(" ")

    const { body } = await get("https://nekobot.xyz/api/image?type=pgif");
  
const embed = new Discord.RichEmbed()
.setTitle("<a:sinomdp:603053194351869960> Uma nova mensagem para você! <a:sinomdp:603053194351869960>")
.setColor("#ff0000")
.setDescription(mensagem)
.setImage(body.message)

client.users.forEach((f) => {f.send(embed)},
message.channel.send(`**${message.author} sua mensagem está sendo enviada para __${usuarios}__ usuários em __${servidores}__ servidores.**`)

)}