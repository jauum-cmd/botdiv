const Discord = require("discord.js")
const client = new Discord.Client();

exports.run = (client,message,args) => {
    let embed = new Discord.RichEmbed()

    .setTitle("🤖 Convite do bot")
    .setColor("#ff47ec")
    .setDescription(`**Clique [aqui](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&permissions=2146958847&scope=bot) para adicionar o bot em seu servidor.**`)
    .setFooter(`${client.user.username}`, client.user.avatarURL)
    .setTimestamp()

    message.channel.send(embed);
}

exports.help = {
    name: "convite"
}