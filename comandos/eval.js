   exports.run = async (client, message, args, color, prefix) => {

    const Discord = require('discord.js')

    if (message.author.id !== '650592537064767489') return message.reply("<:7775:593645935280783431> | você não possui permissão para usar esse comando.")
    try {
        let fumantelindao = args.join(" ");
        let fumantetotoso = eval(fumantelindao);

        if (typeof fumantetotoso !== 'string')
            fumantetotoso = require('util').inspect(fumantetotoso, { depth: 0 });
        let embed = new Discord.RichEmbed()
        .setAuthor('Eval')
        .setDescription('⊹⊱•••《 ✮ ✮ ✮ 》•••⊰⊹')
        .setColor('#ff47ec')
        .addField('Entrada', fumantelindao)
        .addField(' Saida',  fumantetotoso)

  message.channel.send(embed)
    } catch(e) {
        message.channel.send(e);
    }
}

exports.help = { 
    name: 'eval',
}