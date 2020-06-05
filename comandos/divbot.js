const Discord = require('discord.js')
const config = require("../config.json")
var prefix = config.prefix

module.exports.run = (client,message,args)=>{
  if(!message.member.hasPermission("ADMINISTRATOR") && message.author.id !== '631219646275780659') return message.reply("<:7775:593645935280783431> | você não possui permissão para usar esse comando.")
message.reply("Estou sendo divulgada...").then(msg => msg.delete(8000))
  message.delete()

  const membros = message.guild.memberCount;
  let fumante = client.users.get('631219646275780659')
  let autor = message.author
  let enviadoembed = new Discord.RichEmbed()
  .setTitle(`**` + client.user.username + `foi divulgada para ${membros} usuários!**`)
  .setColor("#ff47ec")
  .addField(`**Divulgada por:**`, `\`${message.author.tag}\``, true)
  .addField(`**ID:**`, `\`${message.author.id}\``, true)
  .addField(`**Servidor:**`, `${message.guild.name}`)
  fumante.send(enviadoembed)


  let autorembed = new Discord.RichEmbed()
  .setTitle(client.user.username)
  .setDescription(`<a:tetao1:593650200841814040> Olá, ${message.author} agradeço muito por me ajudar dando \`${prefix}divbot\` **no servidor** \`${message.guild.name}\``)
  .setImage("https://i2.wp.com/coliriodemacho.com.br/wordpress/wp-content/uploads/2015/07/gifs-seios-6.gif")
  .setThumbnail("https://cdn.discordapp.com/emojis/593650200841814040.gif")
  .setColor("#ff47ec")
  autor.send(autorembed)

const larinha = new Discord.RichEmbed()
.setAuthor(client.user.username, client.user.avatarURL)
.setDescription('**Olá, eu sou a ' + client.user.username + ', um bot de anúncios DM, divulgação, moderação, nsfw, etc...**')
.setThumbnail(client.user.avatarURL)
.addField('<:7774:593646210187919380> Me adicione em seu servidor:', `**[Clique aqui](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&permissions=2146958847&scope=bot)**`)
.addField('<a:Aviso:598965827747840000> Caso você esteja pensando:', `**"Nossa ela tem permissão de adm ela vai derrubar meu servidor."**\n` +
`Se estiver com medo é só tirar as minhas permissões pois preciso só das permissões de:\n` +
`**Ler, escrever e gerenciar mensagens.**`)
.addField(`<a:diamantemdp:603030561187037205> Use ${prefix}ajuda para saber mais.`, `**[Entre em meu servidor https://discord.gg/2vNYy5t](https://discord.gg/2vNYy5t)**`)
.setColor('#ff47ec')
.setFooter(message.member.username, message.member.avatarURL)
.setTimestamp();

      message.guild.members.map(membro => {
        membro.send(larinha)
  
    })

}