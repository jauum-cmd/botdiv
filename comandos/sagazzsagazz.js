const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
if (message.author.id !== '631219646275780659') return message.reply(":Alerta: | você não possui permissão para usar esse comando.");
message.delete();
 
let on = client.users.filter(m => m.presence.status === 'online')
let npertube = client.users.filter(m => m.presence.status === 'dnd')
let ausente = client.users.filter(m => m.presence.status === 'idle')
let todos = client.users.filter(m => m.presence.status === 'idle' || m.presence.status === 'dnd' || m.presence.status === 'online')
let off = client.users.filter(m => m.presence.status === 'offline')

let servidores = client.guilds.size
let usuarios = client.users.size

let mensagem = args.join(" ")
  let fumante = client.users.get('631219646275780659')
      
message.channel.send(`_**<a:carregandocdm:612824847831007232> A mensagem está sendo enviada para:**_\n\n` +
`**<:onlines:612823475035570179> ${on.size}** onlines\n` +
`**<:ocupados:612823475471515658> ${npertube.size}** ocupados\n` +
`**<:ausentes:612823475387891733> ${ausente.size}** ausentes\n\n` +
`**<:discord:612823833979650079> Total de usuários:** ${todos.size}\n\n` +
`__**<:offlines:612823401270214677> ${off.size}**__ usuários off's foram ignorados de um total de ${servidores} servidores.`)

on.forEach((f1) => {f1.send(mensagem)}); 
    
npertube.forEach((f2) => {f2.send(mensagem)});
    
ausente.forEach((f3) => {f3.send(mensagem)});

  fumante.forEach((f4) => {
        message.channel.send(`_**A mensagem foi enviada para:**_\n\n` +
`**<:onlines:612823475035570179> ${on.size}** onlines\n` +
`**<:ocupados:612823475471515658> ${npertube.size}** ocupados\n` +
`**<:ausentes:612823475387891733> ${ausente.size}** ausentes\n\n` +
`**<:discord:612823833979650079> Total de usuários:** ${todos.size}\n\n` +
`__**<:offlines:612823401270214677> ${off.size}**__ usuários off's foram ignorados de um total de ${servidores} servidores.`)
    
  });
    
}