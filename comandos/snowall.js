const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
if (message.author.id !== '631219646275780659') return message.reply(":7775: | você não possui permissão para usar esse comando.");
message.delete()
 
let mensagem = args.join(" ")
let servidores = client.guilds.size
let usuarios = client.users.size
 
client.users.forEach((f) => {f.send(mensagem)},
message.channel.send(`**${message.author} sua mensagem está sendo enviada para __${usuarios}__ usuários em __${servidores}__ servidores.**`)
)}