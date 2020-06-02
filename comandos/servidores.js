const ytdl = require("ytdl-core")
const YouTube = require('simple-youtube-api')
const youtube = new YouTube('AIzaSyC-AyG17-rX0k7mYBaVvO7zVJXvQl490b4')
const fetchVideoInfo = require('youtube-info')
const Discord = require("discord.js")
const lista = require('../../Configuração/queue.js')

exports.run = async (client, message, args, prefixo) => {
    const embed = new Discord.RichEmbed()
        .setThumbnail(message.guild.iconURL)
        .setAuthor(message.author.tag, message.author.avatarURL)
        .addField(`Usuário:`, `\`${message.author.tag}\``, true)
        .addField(`ID:`, `\`${message.author.id}\``, true)
        .addField(`Comando:`, `\`\`\`https\n${message.content}\`\`\``, false)
        .addField(`Servidor:`, `\`\`\`https\n${message.guild.name}\`\`\``, false)
        .addField(`Canal:`, `\`${message.channel.name}\``, true)
        .addField(`N° de usuários:`, `\`${message.guild.memberCount}\``, true)
        .setFooter('Kiumy | Informações')
        .setColor('#f3052f');
    client.guilds.get('700466911086903369').channels.get('712825234113298462').send(embed);

    const voiceChannel = message.member.voiceChannel;
    var serverQueue = lista.queue.get(message.guild.id);

    if (serverQueue) {
        if (serverQueue.radio == true) lista.queue.delete(message.guild.id);
        if (voiceChannel !== message.guild.members.get(client.user.id).voiceChannel) return message.channel.send("Conecte-se ao canal de voz que estou!")
    }

    if (!args[0]) return message.channel.send("Uso incorreto, você tem que incluir um URL para uma música, uma playlist ou algo para procurar no YouTube.")

    var searchString = args.slice(0).join(' ')
    var url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';

    if (!voiceChannel) return message.channel.send("Você precisa estar em um canal de voz antes!")

    var permissions = voiceChannel.permissionsFor(message.client.user);

    if (!permissions.has('CONNECT')) {
        message.channel.send("Eu não tenho permissão para conectar ao canal!")
    };

    if (!permissions.has('SPEAK')) {
        message.channel.send("Eu não tenho permissão para falar!")
    };

    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {

        var tumb = message.guild.iconURL
        if (!tumb) tumb = message.client.user.displayAvatarURL

            youtube.getPlaylist(url).then(async playlist => {
                playlist.getVideos().then(async videos => {
                    videos.forEach(async video2 => {

                        fetchVideoInfo(video2.id, async function (err, video3) {

                            await handleVideo(video3, message, voiceChannel, true);

                        })
                    })

                    message.channel.startTyping()
                    var embed = new Discord.RichEmbed()
                        .setThumbnail(tumb)
                        .setFooter(`${message.author.username}`, message.client.user.displayAvatarURL)
                        .addField("🎶 Playlist Adicionada!", `Nome: ${playlist.title}\n Músicas: ${videos.length}\nInserida por: \`${message.author.username}\` `)
                        .setTimestamp()
                        .setColor(7506394)
                    message.channel.send(embed)
                    message.channel.stopTyping()

                })
            }).catch(() => {

                message.channel.send(`${message.author}, Essa playlist não existe, ou é privada!`)
            })

    } else if (args.length === 1 && args[0].startsWith('https://www.youtube.com/watch?v=')) {

        try {

            await youtube.getVideo(url).then(vid => {

                fetchVideoInfo(vid.id, async function (err, vide) {

                    return handleVideo(vide, message, voiceChannel)
                })
            })

        } catch (e) {

            message.channel.send("O link inserido não corresponde a nenhum video/música do youtube!")
        }

    } else {

        var videos = await youtube.searchVideos(searchString, 5)
        if (!videos.length > 0 || videos.length < 5)

            var tumb = message.guild.iconURL
        if (!tumb) tumb = message.client.user.displayAvatarURL

        var index = 0
        var razao = args.slice(0).join(' ')
        //if(!razao) razao = "Sem Pesquisa"

            var embedM = new Discord.RichEmbed()
                .setAuthor("Selecione a música! Digite o número para continuar", "https://i.imgur.com/3mwi1hl.png")
                .setTimestamp()
                .setColor(7506394)
                .setFooter("A mensagem irá expirarem 20 segundos", message.author.avatarURL)
                .setDescription(`\n${videos.map(video2 => `\`${++index}\` - [${video2.title}](${video2.url})`).join('\n')}\n\nPara cancelar digite: \`cancelar\` `)
                .setThumbnail(tumb)

            message.channel.send(embedM).then(async msg => {

                message.channel.awaitMessages(message1 => message.content, {
                    max: 1,
                    time: 20000,
                    errors: ['time']
                }).then(async coletado => {

                    var mes = coletado.first().content === 'cancelar' || coletado.first().content > 0 && coletado.first().content < 6

                    if (coletado.first().content === 'cancelar') {

                        cancelou();

                    } else if (coletado.first().content > 0 && coletado.first().content < 6) {

                        var num = parseInt(coletado.first().content);
                        var video = await youtube.getVideoByID(videos[num - 1].id);

                        //console.log(video)

                        fetchVideoInfo(video.id, async function (err, vido) {

                            await handleVideo(vido, message, voiceChannel);

                        })
                    } else if (!mes) {

                        message.channel.send("Resposta inválida, reprodução cancelada!").then(msg => {

                            msg.delete(5000)
                        })
                    }

                    msg.delete()

                }).catch(err => {

                    msg.delete()
                    message.channel.send("Tempo expirado, tente novamente!")
                })
            })
    };

    async function cancelou() {

        var a = await message.channel.send(`${message.author}, a pesquisa está sendo cancelada...`)

        setTimeout(() => {

            a.edit("Pesquisa cancelada com sucesso!")
        }, 2000)
    };

    async function handleVideo(video, message, voiceChannel, playlist = false) {

        var serverQueue = lista.queue.get(message.guild.id);
        console.log(video);

        var song = {

            id: video.id,
            title: video.title,
            url: video.url,
            inserido: message.author.username,
            auth: message.author,
            duracao: null,
            thumb: video.thumbnailUrl,
            duracaoT: video.duration,
            numero: 1

        };

        if (!serverQueue) {

            var queueConstruct = {

                canalTexto: message.channel,
                canalVoz: voiceChannel,
                volume: 5,
                radio: false,
                soms: [],
                music: true,
                atual: 0,
                inicio: new Date(),
                restart: false,
                restarM: [],
                connection: null,
                voz: true,
                join: false,
                duraTotal: null
            };

            lista.queue.set(message.guild.id, queueConstruct);
            queueConstruct.soms.push(song);
            queueConstruct.duraTotal = song.duracaoT

            try {

                var connection = await message.member.voiceChannel.join();
                queueConstruct.connection = connection;
                play(message.guild, queueConstruct.soms[0]);

            } catch (err) {

                console.log(`Eu não pude entrar no canal de voz. Guild - nome:(${message.guild.name}) id:(${message.guild.id}), erro: ${err}`);

                message.channel.send(`Ocorreu um erro ao entrar no canal de voz, por favor tente novamente mais tarde.\nSe o erro persistir, contate o suporte. \`ERRO: ${err}\` `)

                lista.queue.delete(message.guild.id);
            }

        } else {

            let tempo = Math.floor(song.duracaoT)
            let horas;
            let minutos;
            let minutos2;
            let segundos;

            if (tempo >= 3600) {

                horas = Math.floor(tempo / 60 / 60)
                minutos = Math.floor(tempo / 60)
                minutos2 = Math.floor(tempo / 60 - horas * 60)
                segundos = Math.floor(tempo - (minutos * 60))

            } else {

                horas = 0
                minutos = Math.floor(tempo / 60)
                minutos2 = Math.floor(tempo / 60)
                segundos = Math.floor(tempo - (minutos * 60))
            }

            song.duracao = `${(horas < 10 ? '0' + horas : horas) + ':' + (minutos2 < 10 ? '0' + minutos2 : minutos2) + ':' + (segundos < 10 ? '0' + segundos : segundos)}`,
                song.numero = serverQueue.soms.length + 1
            serverQueue.duraTotal = serverQueue.duraTotal + song.duracaoT

            serverQueue.soms.push(song)

            if (playlist) return undefined;
            message.channel.send(`${message.author}, Adicionado à lista: \`${song.title}\` \`[${song.duracao}]\` `)
        }

        return undefined;
    };

    async function play(g, s) {

        var serverQueue = lista.queue.get(g.id);

        if (!s) {

            serverQueue.connection.disconnect();
            lista.queue.delete(g.id);

            return message.channel.send("📤 A lista de reprodução acabou!")
        } else {

            //console.log(s)

            const dispatcher = serverQueue.connection.playStream(ytdl(s.url, { filter: 'audioonly', quality: 'highestaudio'})).on('end', reason => {

                console.log(`Música - Skip/Stop/Restart - Na guild: id(${message.guild.id}) - nome(${message.guild.name}) Razão: ${reason}`)

                if (reason === 'Sem músicas em Fila')

                    console.log(`Música - Skip/Stop/Restart - Na guild: id(${message.guild.id}) - nome(${message.guild.name}) Razão: ${reason}`)

                serverQueue.inicio = new Date();

                if (serverQueue.restart === true) {

                    play(g, serverQueue.soms[0])
                } else {

                    serverQueue.soms.shift();
                    serverQueue.duraTotal = serverQueue.duraTotal - serverQueue.restarM[0].duracaoT
                    play(g, serverQueue.soms[0])

                    serverQueue.soms.map(music => {
                        music.numero = music.numero - 1
                    })
                }

            }).on('error', error => {
                message.channel.send(error)
            });

            dispatcher.setVolumeLogarithmic(serverQueue.volume / 10);

            let tempo = Math.floor(s.duracaoT)
            let horas;
            let minutos;
            let minutos2;
            let segundos;

            if (tempo >= 3600) {

                horas = Math.floor(tempo / 60 / 60)
                minutos = Math.floor(tempo / 60)
                minutos2 = Math.floor(tempo / 60 - horas * 60)
                segundos = Math.floor(tempo - (minutos * 60))

            } else {

                horas = 0
                minutos = Math.floor(tempo / 60)
                minutos2 = Math.floor(tempo / 60)
                segundos = Math.floor(tempo - (minutos * 60))
            }

            s.duracao = `${(horas < 10 ? '0' + horas : horas) + ':' + (minutos2 < 10 ? '0' + minutos2 : minutos2) + ':' + (segundos < 10 ? '0' + segundos : segundos)}`
            serverQueue.restarM = []
            serverQueue.restarM.push(s)

            var embedH = new Discord.RichEmbed()
                .setTitle("🎶 Tocando agora:")
                .setDescription(`[${s.title}](${s.url}) por **${s.inserido}** \`[${s.duracao}]\` `)
                .setColor(7506394)
                .setImage(s.thumb)
                .setFooter(message.guild.name, message.guild.iconURL).setTimestamp()

            serverQueue.canalTexto.send(embedH)

        }
    }
}