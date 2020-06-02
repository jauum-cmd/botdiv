const express = require('express');
const app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT); // Recebe solicitações que o deixa online

console.log("♨️ Ligando bot...")
const Discord = require('discord.js');
const client = new Discord.Client({autoReconnect: true});
const config = require("./config.json")
const { Client, Util } = require('discord.js');
let prefix = config.prefix

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
} catch (err) {
  console.error(err.stack);
}
});

client.on("message", async message => {
  const regex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li|club)|discordapp\.com\/invite|discord\.com\/invite)\/.+[a-z]/gi;
//RegEx com as expressões que normalmente tem na maioria dos links de convites e suas variantes.
  if (regex.exec(message.content)) {
    await message.delete({timeout: 1000});
//Se o conteúdo da mensagem for um convite, o bot apagará a mensagem após um segundo.
      await message.channel.send(
        `${message.author} **você não pode postar link de outros servidores aqui!**`
      );
//Envia um aviso que ele não pode postar convites naquele chat.
  }
});





client.on("ready", () => {
  let activities = [
      `Utilize ${config.prefix}help para obter ajuda`,
      `${client.guilds.cache.size} servidores!`,
      `${client.channels.cache.size} canais!`,
      `${client.users.cache.size} usuários!`
    ],
    i = 0;
  setInterval( () => client.user.setActivity(`${activities[i++ % activities.length]}`, {
        type: "WATCHING"
      }), 1000 * 60);  // WATCHING, LISTENING, PLAYING, STREAMING

  client.user.setStatus("dnd").catch(e => console.error(e.stack));
console.log("Estou Online!")
});

client.login(process.env.TOKEN); //Ligando o Bot caso ele consiga acessar o token