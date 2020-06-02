const Discord = require('discord.js')
const config = require("../config.json")

exports.run = (client, message, args) => {
    let av = message.author.avatarURL
    let user = message.author.username
    let botav = client.user.avatarURL
    let botuser = client.user.username
    let servidores = client.guilds.size
    let usuarios = client.users.size

    let embed = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setTitle(`<a:carregandocdm:612824847831007232> Clique no emoji parar abrir a categoria...`, `** **`)
        .setDescription(`<a:sinocdm:614407332155359244> Comandos de **Anúncio**
<a:hypecdm:614407332058890241> Comandos de **Utilidade**
<a:googlecdm:614407332780310539> Comandos de **Status**
<a:staffcdm:614759344072032268> Comandos de **Moderação**
<:18cdm:614653146689437697> Comandos de **Nsfw**
<:chatcdm:614407735043424256> **Sobre mim**
<a:voltaruog:717461934072660080> **Voltar** ao painel

:link: **[Clique aqui para me Adicionar](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&permissions=2146958847&scope=bot)**`)
        .setColor('#ff47ec')
        .setThumbnail(botav)
        .setFooter(user + ' • Painel de ajuda', av)
    
    message.channel.send(embed).then((c) => {
            c.react('614407332155359244').then(() => {
            c.react('614407332058890241').then(() => {
            c.react('614407332780310539').then(() => {
            c.react('614759344072032268').then(() => {
            c.react('614653146689437697').then(() => {
            c.react('614407735043424256').then(() => {
            c.react('717461934072660080').then(() => {
        })
        })
        })
        })
        })
        })
        })
        

        let AnúncioFilter = (reaction, user, ) => reaction.emoji.id === '614407332155359244' && user.id === message.author.id;
        let UtilidadeFilter = (reaction, user, ) => reaction.emoji.id === '614407332058890241' && user.id === message.author.id;
        let StatusFilter = (reaction, user, ) => reaction.emoji.id === '614407332780310539' && user.id === message.author.id;
        let ModeraçãoFilter = (reaction, user, ) => reaction.emoji.id === '614759344072032268' && user.id === message.author.id;
        let NsfwFilter = (reaction, user, ) => reaction.emoji.id === '614653146689437697' && user.id === message.author.id;
        let SobreFilter = (reaction, user, ) => reaction.emoji.id === '614407735043424256' && user.id === message.author.id;
        let VoltarFilter = (reaction, user, ) => reaction.emoji.id === '614540655888171038' && user.id === message.author.id;
        let Anúncio = c.createReactionCollector(AnúncioFilter, { time: 80000 });
        let Utilidade = c.createReactionCollector(UtilidadeFilter, { time: 80000 });
        let Status = c.createReactionCollector(StatusFilter, { time: 80000 });
        let Moderação = c.createReactionCollector(ModeraçãoFilter, { time: 80000 });
        let Nsfw = c.createReactionCollector(NsfwFilter, { time: 80000 });
        let Sobre = c.createReactionCollector(SobreFilter, { time: 80000 });
        let Voltar = c.createReactionCollector(VoltarFilter, { time: 80000 });


        Anúncio.on('collect', r2 => { 
           let anuncio = new Discord.RichEmbed()
                .setTitle("<a:sinocdm:614407332155359244>┆Comandos para Anúncio")
                .setDescription(`» \`${config.prefix}aviso\` (msg) - Manda um aviso a todos do seu servidor.\n\n` +
                `» \`${config.prefix}avisoembed\` | titulo | descrição | link de foto ou gif |\n` +
                `Manda um aviso em embed a todos do seu servidor.\n` +
                `\`Exemplo:\` [Clique aqui](http://prntscr.com/o8pluq)\n` +
                `Obs: não tire os separadores |\n\n` +
                `» \`${config.prefix}divbot\` - Me divulga em seu servidor.\n\n`)
                .setColor("#ff47ec")
                .setThumbnail("https://cdn.discordapp.com/emojis/614407332155359244.gif?v=1")
                .setFooter(user + " • Pág. 1/6", av)
            c.edit(anuncio);
        });

        Utilidade.on('collect', r2 => { 
            let util = new Discord.RichEmbed()
                .setTitle("<a:hypecdm:614407332058890241>┆Comandos de Utilidade")
                .setDescription(`» \`${config.prefix}responder (id/menção) (msg)\` - Manda uma mensagem no privado de um usuário com o bot.\n\n` +
                `» \`${config.prefix}say (msg)\` - Manda uma mensagem com o bot.\n\n` +
                `» \`${config.prefix}cc\` - Cria um convite permanente do servidor.\n\n` +
                `» \`${config.prefix}lock\` - Trava e o chat.\n\n` +
                `» \`${config.prefix}unlock\` - Destrava o chat.\n\n` +
                `» \`${config.prefix}clima (cidade)\` - Mostra o clima de uma cidade.\n\n` +
                `» \`${config.prefix}timer (tempo em segundos)\` - Apaga sua mensagem depois de um determinado tempo.`)
                .setColor("#ff47ec")
                .setThumbnail("https://cdn.discordapp.com/emojis/614407332058890241.gif?v=1")
                .setFooter(user + " • Pág. 2/6", av)
            c.edit(util);
        });
        
        Status.on('collect', r2 => { 
            let status = new Discord.RichEmbed()
                .setTitle("<a:googlecdm:614407332780310539>┆Comandos de Status")
                .setDescription(`» \`${config.prefix}sugestão (sugestão)\` - Me manda uma sugestão.\n\n` +
                `» \`${config.prefix}bug (bug)\` - Reporta um bug no bot.\n\n` +
                `» \`${config.prefix}ping\` - Mostra o ping do bot.\n\n` +
                `» \`${config.prefix}convite\` - Mostra o meu convite.`)
                .setColor("#ff47ec")
                .setThumbnail("https://cdn.discordapp.com/emojis/614407332780310539.gif?v=1")
                .setFooter(user + " • Pág. 3/6", av)
            c.edit(status);
        });
      
        Moderação.on('collect', r2 => { 
            let mod = new Discord.RichEmbed()
                .setTitle("<a:staffcdm:614759344072032268>┆Comandos de Moderação")
                .setDescription(`» \`${config.prefix}allunban\` - Desbane todos os usuários do seu servidor.`)
                .setColor("#ff47ec")
                .setThumbnail("https://cdn.discordapp.com/emojis/614759344072032268.gif?v=1")
                .setFooter(user + " • Pág. 4/6", av)
            c.edit(mod);
        });


        Nsfw.on('collect', r2 => { 
            let nsfw = new Discord.RichEmbed()
                .setTitle("<:18cdm:614653146689437697>┆Comandos de Nsfw")
                .setDescription(`» \`${config.prefix}nsfw\` - Manda um gif aleatório de Nsfw.\n\n` +
                                `» \`${config.prefix}4k\` - Foto em 4k aleatória.\n\n` +
                                `» \`${config.prefix}pussy\` - Foto/gif de uma buceta.\n\n` +
                                `» \`${config.prefix}ass\` - Foto/gif de uma bunda.\n\n` +
                                `» \`${config.prefix}anal\` - Foto com brinquedos anais.\n\n` +
                                `» \`${config.prefix}hentai\` - Hentai.`)
                .setColor("#ff47ec")
                .setThumbnail("https://cdn.discordapp.com/emojis/614653146689437697.png?v=1")
                .setFooter(user + " • Pág. 5/6", av)
            c.edit(nsfw);
        });

        Sobre.on('collect', r2 => { 
           let sobre = new Discord.RichEmbed()
                .setTitle("<:chatcdm:614407735043424256>┆Sobre mim")
                .setDescription(`**Olá, eu sou a  ${client.user.username}, um bot [Brasileiro](https://pt.wikipedia.org/wiki/Brasil) :flag_br: focado em anúncios DM e divulgação criado em [Javascript](https://nodejs.org/pt-br/) <:jscdm:614400268901023754>, atualmente estou hospedo em uma host free a [Glitch](https://glitch.com/) <:glitchcdm:614400605078814731>, mais estou em busca de uma VPS boa.\n\nAtualmente estou em ${client.guilds.size} servidores com um total de ${client.users.size} usuários!**`)
                .setThumbnail(client.user.avatarURL)
                .addField('<:7774:593646210187919380> Me adicione em seu servidor:', `**[Clique aqui](https://discordapp.com/oauth2/authorize?client_id=610280094799233025&permissions=2146958847&scope=bot)**`)
                .setColor("#ff47ec")
                .setThumbnail("https://cdn.discordapp.com/emojis/614407735043424256.png?v=1")
                .setFooter(user + " • Pág. 6/6", av)
            c.edit(sobre);
        });
         
        Voltar.on('collect', r2 => { 
            c.edit(embed);
        })
    });
};