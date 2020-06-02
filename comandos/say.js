var Discord = require('discord.js')
const client = new Discord.Client();

exports.run = (client, message, args) => {

  if(!message.member.hasPermission("ADMINISTRATOR") && message.author.id !== '614963305307570201' && message.author.id !== '595103385150160897') return message.reply("<:7775:593645935280783431> | você não possui permissão para usar esse comando.")

  message.delete();
  
let mensagem = args.join(" ")

message.channel.send(mensagem)

}