const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('../config.json')

module.exports.run = async (client, message, args) => {
  
    const perm = new Discord.RichEmbed()
        .setColor("#ff3636")
        .setThumbnail("https://i.pinimg.com/originals/bd/df/d6/bddfd6e4434f42662b009295c9bab86e.gif")
        .addField(`<a:naocdm:613557508577165325>┆${message.author.username}`, `Você não tem permissão para usar este comando!`)
        .addField(`❓┆Como consigo a permissão?`, `Você tem que o adicionar o cargo: "Perm da ${client.user.username}" que ja foi criado na minha entrada no servidor, caso não tenha crie!`)


    if (!message.member.roles.some(r=>[`Perm da ${client.user.username}`].includes(r.name)) )
            return message.reply(perm);

  
        let dmGuild = message.guild;
        var separador = message.content.split("|")
        const msg = new Discord.RichEmbed()
        .setTitle(separador[1])
        .setColor("BLACK")
        .setDescription(separador[2])
        .setImage(separador[3])

  
        if(!msg || msg.length <= 0) return message.author.send("Nenhuma mensagem especificada");
  

        dmGuild.members.forEach(member => {
                member.send(msg);
        });

    const membros = message.guild.memberCount;

    message.channel.send("*\`Mensagem enviada para\`\* ***`" + membros + "`*** *\`membros\`\*").then(msg => msg.delete(15000))
    message.channel.send("**`Mensagem a ser enviada:`\n**" + msg).then(msg => msg.delete(15000))

}