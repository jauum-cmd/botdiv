var Discord = require('discord.js')
const client = new Discord.Client();

exports.run = (client, message, args) => {
  
    if (args.length < 1) {
        message.reply("Mencione alguém ou use o ID\n\n" +
                      "`Exemplo: c!responder (id/menção) (msg)`").then(msg => msg.delete(15000));
        return 0;
    }
 
let ser = args[0];
 let user = client.users.get(ser) || message.mentions.members.first();
  let mensagem = args.slice(1).join(" ") 

user.send(mensagem).catch(err => "Não foi possível enviar mensagem ao usuário, erro:\n" + `\`\`\`diff\n- ${err}\`\`\``)
  
  message.reply("Mensagem enviada com sucesso").then(msg => msg.delete(15000))

}