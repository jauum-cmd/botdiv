const Discord = require("discord.js")
const config = require("../config.json")
var prefix = config.prefix

module.exports.run = async (client, message, args) => {
if (message.author.id !== '631219646275780659') return message.reply(":Alerta: | você não possui permissão para usar esse comando.");
message.delete()
 
  let servidores = client.guilds.size
  let usuarios = client.users.size
 
const mensagem = new Discord.RichEmbed()
.setAuthor(client.user.username, client.user.avatarURL)
.setDescription('**Olá, eu sou a ' + client.user.username + ', um bot de anúncios DM, divulgação, moderação, nsfw, etc...**')
.setThumbnail(client.user.avatarURL)
.addField('<:7774:593646210187919380> Me adicione em seu servidor:', `**[Clique aqui](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&ermissions=2146958847&scope=bot)**`)
.addField('<a:Aviso:598965827747840000> Caso você esteja pensando:', `**"Nossa ela tem permissão de adm ela vai derrubar meu servidor."**\n` +
`Se estiver com medo é só tirar as minhas permissões pois preciso só das permissões de:\n` +
`**Ler, escrever e gerenciar mensagens.**`)
.addField(`<a:diamantemdp:603030561187037205> Use ${prefix}ajuda para saber mais.`, `**[Entre em meu servidor https://discord.gg/2vNYy5t](https://discord.gg/2vNYy5t)**`)
.setColor('#ff47ec')
.setFooter(message.member.username, message.member.avatarURL)
.setTimestamp();

client.users.forEach((f) => {f.send(mensagem)},
message.channel.send(`**${message.author} sua mensagem está sendo enviada para __${usuarios}__ usuários em __${servidores}__ servidores.**`)
)}