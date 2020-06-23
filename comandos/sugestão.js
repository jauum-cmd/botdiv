const Discord = require('discord.js');
const client = new Discord.Client();
module.exports.run = (client, message, args) => {
    let icon = message.guild.iconURL || "https://loritta.website/assets/img/unknown.png"
    let sugestao = args.join(" ");
    if (!sugestao) return message.reply("insira sua sugestão.")

    let embed = new Discord.RichEmbed()
        .setColor("BLACK")
        .setThumbnail(icon)
        .addField("» Nova sugestão recebida!", `** **`)
        .addField("» Autor(a):", `${message.author.id}`)
        .addField("» Sugestão:", `${sugestao}`)
        .addField("» Servidor:", `${message.guild.name}`)
        .setTitle(`${message.author.tag} | Sugestão`, message.author.avatarURL)
        .setTimestamp(new Date())

    let canal = client.channels.get('724769762416001066')

    message.delete();
    canal.send(embed).then(msg => 
    msg.react("614399503780413480").then(r => 
    msg.react("613557508577165325")));
    message.reply(`Obrigado por mandar sua sugestão, meu criador ira conferir, caso for aceita você irá ser avisado no privado!`);
}

module.exports.help = {
    name: "sugestão"
}