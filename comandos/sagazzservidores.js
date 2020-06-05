const Discord = require('discord.js');

exports.run = async (client, message, args) => {

    if (message.author.id !== '631219646275780659') return message.reply("<a:Alerta:716558497776402504> | você não possui permissão para usar esse comando.")

message.delete();
        
            var servers = client.guilds.sort((a, b) => b.memberCount - a.memberCount)
            var num = 0;
            var pagina = 1;
            var totalPages = parseInt(servers.size/10+1);
            
            var embed = new Discord.RichEmbed()
            .setDescription(`${servers.map(se=> `Nome: \`${se.name}\` - ID: \`${se.id}\` - Usuários: \`${se.memberCount}\``).slice(0,10).join('\n')}`)
            .setFooter(`Página ${pagina} de ${totalPages}`, message.author.displayAvatarURL)
            .setAuthor('Servidores em que Estou', client.user.displayAvatarURL)
            .setColor('#010000')
            .setThumbnail(client.user.displayAvatarURL)
            message.channel.send(embed).then(async ser => {

                if(servers.size > 10) {

                    await ser.react("⬅");
                    await ser.react("➡");
                    
                    const voltar = ser.createReactionCollector((r, u) => r.emoji.name === "⬅" && u.id === message.author.id, { time: 100000 });
                    const proximo = ser.createReactionCollector((r, u) => r.emoji.name === "➡" && u.id === message.author.id, { time: 100000 });
                
                                voltar.on("collect", async r => {
                                    if(pagina !== 1) {
                                        num = num-10
                                        num = num.toString().length > 1 ? num-parseInt(num.toString().slice(num.toString().length-1)) : 0
                                        pagina -= 1

                                     var embed = new Discord.RichEmbed()
                                    .addField(`Servidores:`, `${servers.map(se=> `Nome: \`${se.name}\` - ID: \`${se.id}\` - Usuários: \`${se.memberCount}\``).slice(pagina*10-10,pagina*10).join('\n')}`)
                                    .setFooter(`Página ${pagina} de ${totalPages}`, message.author.displayAvatarURL)
                                    .setColor('#010000')
                                    .setAuthor('Servidores em que Estou', client.user.displayAvatarURL)
                                    .setThumbnail(client.user.displayAvatarURL)
                                    ser.edit(embed)
                                        r.remove(r.users.last().id)
                                    } else {
                                        pagina = totalPages
                                        num = totalPages*10-20

                                        var embedb = new Discord.RichEmbed()
                                        .setDescription(`${servers.map(se=> `Nome: \`${se.name}\` - ID: \`${se.id}\` - Usuários: \`${se.memberCount}\``).slice(totalPages*10-10,pagina*10).join('\n')}`)
                                        .setFooter(`Página ${pagina} de ${totalPages}`, message.author.displayAvatarURL)
                                        .setThumbnail(client.user.displayAvatarURL)
                                        .setAuthor('Servidores em que Estou', client.user.displayAvatarURL)
                                        .setColor('#010000')
                                    ser.edit(embedb)

                                        r.remove(r.users.last().id)
                                    }
                                })
                
                                proximo.on("collect", async r => {
                                    if(pagina !== totalPages) {
                                        num = num.toString().length > 1 ? num-parseInt(num.toString().slice(num.toString().length-1)) : 0
                                        num = num+10
                                        pagina += 1

                                        var embedc = new Discord.RichEmbed()
                                        .setDescription(`${servers.map(se=> `Nome: \`${se.name}\` - ID: \`${se.id}\` - Usuários: \`${se.memberCount}\``).slice(pagina*10-10,pagina*10).join('\n')}`)
                                        .setFooter(`Página ${pagina} de ${totalPages}`, message.author.displayAvatarURL)
                                        .setThumbnail(client.user.displayAvatarURL)
                                        .setAuthor('Servidores em que Estou', client.user.displayAvatarURL)
                                        .setColor('#010000')
                                    ser.edit(embedc)

                                        r.remove(r.users.last().id)
                                    } else {
                                        pagina = 1
                                        num = 0

                                        var embedd = new Discord.RichEmbed()
                                        .setDescription(`${servers.map(se=> `Nome: \`${se.name}\` - ID: \`${se.id}\` - Usuários: \`${se.memberCount}\``).slice(0,pagina*10).join('\n')}`)
                                        .setFooter(`Página ${pagina} de ${totalPages}`, message.author.displayAvatarURL)
                                        .setThumbnail(client.user.displayAvatarURL)
                                        .setAuthor('Servidores em que Estou', client.user.displayAvatarURL)
                                        .setColor('#010000')
                                        ser.edit(embedd)

                                        r.remove(r.users.last().id)
                        }
                    })
                }
            })
}