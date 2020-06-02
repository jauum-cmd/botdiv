const Discord = require("discord.js");
const config = require("../config.json")

module.exports.run = async (client, message, args) => {

  const a = client.emojis.find(emoji => emoji.name === "errorbot");
  const b = client.emojis.find(emoji => emoji.name === "1amora");
  const c = client.emojis.find(emoji => emoji.name === "2amora");
  const d = client.emojis.find(emoji => emoji.name === "3amora");
  const e = client.emojis.find(emoji => emoji.name === "4amora");
  const f = client.emojis.find(emoji => emoji.name === "loadbot");
  const g = client.emojis.find(emoji => emoji.name === "vefbot");
  const h = client.emojis.find(emoji => emoji.name === "v1");
  const i = client.emojis.find(emoji => emoji.name === "certoamora");

  if (message.author.id !== config.dono && message.author.id !== '643499869612277782') return message.reply(a + ' | você não possui permissão para usar esse comando.')

  let users = client.users.filter(m => !m.bot && m.presence.status !== 'offline').array().sort((a, b) => a.username.localeCompare(b.username))
  
  let emojis = [b,c,d,e]

  let embed = new Discord.RichEmbed()
  .setTitle(`${h} **Delete Messages**`)
  .setAuthor(client.user.tag, client.user.displayAvatarURL)
  .setDescription(`${emojis[0]} **Onlines (DM)**\n` +
                  `${emojis[1]} **Todos (DM)**\n` +
                  `${emojis[2]} **Servidores**\n` + 
                  `${emojis[3]} **Tudo (Servidores e DM)**`)
  .setThumbnail(client.user.displayAvatarURL)
  .setColor(client.cor)
  .setTimestamp()

  let msg = await message.channel.send(embed)
  await msg.react(emojis[0].id)
  await msg.react(emojis[1].id)
  await msg.react(emojis[2].id)
  await msg.react(emojis[3].id)
  
  const collector = msg.createReactionCollector((r, u) => 
  (r.emoji.id === emojis[0].id, emojis[1].id, emojis[2].id, emojis[3].id) &&
  (u.id !== client.user.id && u.id === message.author.id),
  { time: 1000 * 60 * 10 }, { max: 4})
        
  collector.on("collect", async r => {
  r.remove(message.author)

  switch (r.emoji.id) {        
  case emojis[0].id:                        
  
  embed.setDescription(`${f} **Apagando minhas mensagens...**`)    
  msg.edit(embed)
      
  for (let i = 0; i < users.length; i += 1){
  let usuário = await users[i].createDM() 
  
   usuário.fetchMessages().then(async mensagens => {  
   if(mensagens.size <= 0) return;
     
  let arrayMensagens = mensagens.filter(u => u.author.id === client.user.id).array().sort()
  
  for (let i = 0; i < arrayMensagens.length; i += 1){
   
  await arrayMensagens[i].delete().then(() => console.log(`${arrayMensagens[i].content}`))    
  
  }
  })
  }
  
  embed.setDescription(`${i} **Todas minhas mensagens foram deletadas com sucesso.**`)
  msg.edit(embed)
     
          break         
 
    case emojis[1].id:
      break
      
   case emojis[2].id:

  embed.setDescription(`${g} **Apagando minhas mensagens...**`)    
  msg.edit(embed)
      
  client.channels.filter(c => c.type == 'text' && c.name.includes('chat-pra-blabla')).forEach(async channel => {
  if(channel.guild.id == '676584377244844053') return

  channel.fetchMessages().then(msgs => {
  if (msgs.size <= 0) return
  msgs.filter(u => u.author.id == client.user.id).forEach(async msg => {
await console.log(msg.content)
 await msg.delete().catch(() => {})
   })
  }).catch(() => {})  
})

      embed.setDescription(`${g} **Todas minhas mensagens foram deletadas com sucesso.**`)
 msg.edit(embed)
      
      break
      
       case emojis[3].id:
      break  
  }   
  })
};