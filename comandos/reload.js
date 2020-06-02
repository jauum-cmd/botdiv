const Discord = require('discord.js')

exports.run = (client, message, args) => {
  if (message.author.id !== '623545526561931274') message.reply("<:7775:593645935280783431> | você não possui permissão para usar esse comando.");
    let cu = args.slice(0).join(' ');
    if (cu.length < 1) return message.reply(`Coloque o nome do comando.`);
    try {
        delete require.cache[require.resolve(`./${args[0]}.js`)];
    } catch (e) {
        return message.channel.send(`Comando **${args[0]}** não encontrado`);
    }
    message.channel.send(`Comando **${args[0]}** reiniciado.`);
}

module.exports.help = {
    name: "reload"
}