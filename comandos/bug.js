const Discord = require('discord.js');
const client = new Discord.Client();

module.exports.run = (client, message, args) => {

   let icon = message.guild.iconURL || "https://loritta.website/assets/img/unknown.png"
    let report = args.join(" ");
    if (!report) return message.reply("insira seu bug.")

    let embed = new Discord.RichEmbed()
        .setColor("BLACK")
        .setThumbnail(icon)
        .addField("» Novo bug encontrado:", `** **`)
        .addField("» Autor(a):", `${message.author.id}`)
        .addField("» Bug:", `${report}`)
        .addField("» Servidor:", `${message.guild.name}`)
        .setTitle(`${message.author.tag} | Bug reportado`, message.author.avatarURL)        
        .setTimestamp(new Date())

    let canal = client.channels.get('635212350013702145')

    message.delete();
    canal.send(embed).then(msg => 
    msg.react("614399503780413480").then(r => 
    msg.react("613557508577165325")));
    message.reply(`Obrigado por reportar o bug, meu criador irá conferir e arrumar, quando arrumado te avisaremos!`);
}

module.exports.help = {
    name: "bug"
}