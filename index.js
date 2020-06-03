const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping recebido");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const fs = require("fs");
console.log("♨️ Ligando bot...")
const Discord = require('discord.js');
const client = new Discord.Client({
    autoReconnect: true,
    messageCacheMaxSize: 2024,
    fetchAllMembers: true,
    disabledEvents: ['typingStart', 'typingStop', 'guildMemberSpeaking'],
    messageCacheLifetime: 1680,
    messageSweepInterval: 1680
});
const config = require("./config.json")
const { Client, Util } = require('discord.js');
var token = config.token
var prefix = config.prefix
var dono = config.dono

client.login(token)

client.on("message", (message) => {

    if (message.channel.type == "dm") return;
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    let command = message.content.split(" ")[0];
    command = command.slice(prefix.length);

    let args = message.content.split(" ").slice(1);

    try {
        let commandFile = require(`./comandos/${command}.js`);
        commandFile.run(client, message, args);
    }   

     catch (e) {
        console.error(e.stack);
         message.reply("**Esse comando não existe ou foi ultilizado de maneira incorreta! **");
    }
    
let convite = /(discord.gg|discordapp.com\/invite\/)\/(invite)?/ig.test(message.content)
if(convite === true) {
if(!message.member.hasPermission("ADMINISTRATOR")) return;
  
message.delete(1000);
message.reply("**Você não pode enviar convites aki nesse servidor, o dono foi avisado!**")   
  
  
let embed = new Discord.RichEmbed()
.setAuthor("Anti Invite!")
.setDescription("**Foi dectado que 1 usuario acaba de mandar 1 convite em seu servidor!**")
.addField("Nick:", message.author.tag)
.addField("ID:", message.author.id)
.addField("Canal:", message.channel)
.setColor("RED")
message.guild.owner.send(embed)
          
}})

client.on('message', message => {
    if(message.content.startsWith(`<@${client.user.id}>`)) {
        const embed = new Discord.RichEmbed()

        .setTitle(`Olá ${message.author.tag} está perdido?`)
        .setDescription(`Se você se encontra com dúvidas do que eu posso fazer dirija-se rapidamente a um chat de comandos e digite: ${prefix}ajuda\n\n` +
                        `<a:charmander:594967880311767290> Suporte: [Clique aqui](https://discord.gg/2vNYy5t)`)
        .setThumbnail(client.user.avatarURL)
        .setColor("#ff47ec")

        message.channel.send(embed);
    }
});


client.on('guildCreate', guild => {
   const moment = require('moment')
    let canal = client.channels.get('635212312118296627')
    let icon = guild.iconURL || "https://loritta.website/assets/img/unknown.png"
    let embedentrada = new Discord.RichEmbed()
    .setAuthor(`${client.user.username}`, client.user.avatarURL)
    .setThumbnail(icon)
    .setTitle(`**Entrei em um servidor novo** \`${guild.name}\``, true)
    .addField(`**Nome do servidor**`, `\`${guild.name}\``, true)
    .addField(`**Id do servidor**`, `\`${guild.id}\``, true)
    .addField('**Membros:**', `\`${guild.memberCount}\``, true)
    .addField('**Região do servidor:**', `\`${guild.region}\``, true)
    .addField('**Dono**', `${guild.owner}`, true)
    .addField('**Id do dono**', `\`${guild.ownerID}\``, true)
    .addField('**Criado em**', `\`${moment.utc(guild.createdAt).format('lll')}\``, true)
    .setColor('PURPLE')

    canal.send(embedentrada)
});

client.on('guildDelete', guild => {
   const moment = require('moment')
    let canal = client.channels.get('635212326022152202')
    let icon = guild.iconURL || "https://loritta.website/assets/img/unknown.png"
    let embedsaida = new Discord.RichEmbed()
    .setAuthor(`${client.user.username}`, client.user.avatarURL)
    .setThumbnail(icon)
    .setTitle(`**Acabei de sair de um servidor :7775:** \`${guild.name}\``, true)
    .addField(`**Nome do servidor**`, `\`${guild.name}\``, true)
    .addField(`**Id do servidor**`, `\`${guild.id}\``, true)
    .addField('**Membros:**', `\`${guild.memberCount}\``, true)
    .addField('**Região do servidor:**', `\`${guild.region}\``, true)
    .addField('**Dono**', `${guild.owner}`, true)
    .addField('**Id do dono**', `\`${guild.ownerID}\``, true)
    .setColor('PURPLE')

    canal.send(embedsaida)
});

client.on("guildCreate", async guild => {
  guild.createRole({
  name: `Perm da ${client.user.username}`,
  color: '#ff5c8e',
})});

/*client.on('ready', () => {
    var fortunes = [
        'https://media.discordapp.net/attachments/608061184918159360/608553102785904651/67372199_190840298575991_681545014573795411_n.jpg',
        'https://media.discordapp.net/attachments/608061184918159360/608553098075439135/67738425_2058598504436870_4810702304569196544_n.jpg',
        'https://media.discordapp.net/attachments/608061184918159360/608553064361885696/61484462_149291769539298_6096400324850018404_n.jpg',
        'https://media.discordapp.net/attachments/608061184918159360/608553069927464960/65915681_406769946612414_88716975001280251_n.jpg',
        'https://media.discordapp.net/attachments/608061184918159360/608553066186276865/61486435_2021837124779675_388195748556046336_n.jpg',
        'https://media.discordapp.net/attachments/608061184918159360/608553066647781397/65289057_2038815386415182_7450791501392510976_n.jpg',
        'https://media.discordapp.net/attachments/608061184918159360/608553060125376532/54728493_1984706271826094_8665028337074176000_n.jpg',
        'https://media.discordapp.net/attachments/608061184918159360/608553061836914698/56696919_1994546424175412_4116545141819310080_n.jpg',
        'https://media.discordapp.net/attachments/608061184918159360/608553060364451840/53397896_1977734625856592_1871534709356363776_n.jpg',
        'https://media.discordapp.net/attachments/608061184918159360/608553057072054272/53362468_1974092496220805_4271709103199354880_n.jpg'];
        client.user.setAvatar(`${fortunes[Math.floor(Math.random() * fortunes.length)]}`)
    setInterval(() => {
    }, 1800 * 1000);
});*/

client.on("ready", () => {
      let logs = client.channels.get('635212425293070376')
      if (!logs) return console.log("Canal de log's não definido")
      logs.send(`Bot \`${client.user.username}\` foi iniciado, com ${client.users.size} usuários, em ${client.guilds.size} servidores.`);
});

client.on("ready", () => {
    console.log(`Bot foi iniciado, com ${client.users.size} usuários, em ${client.channels.size} canais, em ${client.guilds.size} servidores.`);
    client.user.setPresence({ game: { name: config.Status, type: 'WATCHING, LISTENING, PLAYING, STREAMING', url: 'https://www.twitch.tv/fumante1533'}});

let status = [
  { name: `Suas sugestões`, type: 'LISTENING', url: 'https://www.twitch.tv/fumante1533'},
  { name: `Prazer na cama`, type: 'STREAMING', url: 'https://www.twitch.tv/fumante1533'},
  { name: `Aids pro fumante`, type: 'STREAMING', url: 'https://www.twitch.tv/fumante1533'},
  { name: `Meu prefixo é: ${prefix}`, type: 'STREAMING', url: 'https://www.twitch.tv/fumante1533'},
  { name: `Toda molhadinha pra você`, type: 'TOUCHING', url: 'https://www.twitch.tv/fumante1533'},
  { name: `Amor para você`, type: 'STREAMING', url: 'https://www.twitch.tv/fumante1533'},
]

  function st() {
            let rs = status[Math.floor(Math.random() * status.length)];
            client.user.setPresence({ game: rs });
        }
        st();
        setInterval(() => st(), 7000);  //10000 = 10Ms = 10 segundos
    });

client.on('guildCreate', guild => {

const mensagem = new Discord.RichEmbed()
.setAuthor(client.user.username, client.user.avatarURL)
.setDescription('**Olá, eu sou a ' + client.user.username + ', um bot de anúncios DM, divulgação, moderação, nsfw, etc...**')
.setThumbnail(client.user.avatarURL)
.addField('<:7774:593646210187919380> Me adicione em seu servidor:', `**[Clique aqui](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&permissions=2146958847&scope=bot)**`)
.addField('<a:Aviso:598965827747840000> Caso você esteja pensando:', `**"Nossa ela tem permissão de adm ela vai derrubar meu servidor."**\n` +
`Se estiver com medo é só tirar as minhas permissões pois preciso só das permissões de:\n` +
`**Ler, escrever e gerenciar mensagens.**`)
.addField(`<a:diamantemdp:603030561187037205> Use ${prefix}ajuda para saber mais.`, `**[Entre em meu servidor https://discord.gg/2vNYy5t](https://discord.gg/2vNYy5t)**`)
.setColor('#ff47ec')
.setFooter(client.user.username, client.user.avatarURL)
.setTimestamp();
  

let on = guild.members.filter(m => m.presence.status === 'online')
let npertube = guild.members.filter(m => m.presence.status === 'dnd')
let ausente = guild.members.filter(m => m.presence.status === 'idle')
      
on.forEach(f1 => {f1.send(mensagem)});       
  npertube.forEach(f2 => {f2.send(mensagem)});
    ausente.forEach(f3 => {f3.send(mensagem)});

});