const Discord = require('discord.js');
const client = new Discord.Client();

const token = process.env.lyoo1;

const PREFIX = '-';

client.on('ready', () =>{
    console.log('This bot is online!');
    client.user.setActivity(`Orders`, { type: 'WATCHING'}).catch(console.error);
    let myGuild = client.guilds.get('573082577288822805');
    let memberCount = myGuild.memberCount;
    let memberCountChannel = myGuild.channels.get('615073428977745930');
    memberCountChannel.setName('Total Members: ' + memberCount)
    .then(result => console.log(result))
    .catch(error => console.log(error));
});

client.on('guildMemberAdd', member => {
    let myGuild = client.guilds.get('573082577288822805');
    let memberCount = myGuild.memberCount;
    let memberCountChannel = myGuild.channels.get('615073428977745930');
    memberCountChannel.setName('Total Members: ' + memberCount)
    .then(result => console.log(result))
    .catch(error => console.log(error));
});

client.on('guildMemberRemove', member => {
    let myGuild = client.guilds.get('573082577288822805');
    let memberCount = myGuild.memberCount;
    let memberCountChannel = myGuild.channels.get('615073428977745930');
    memberCountChannel.setName('Total Members: ' + memberCount)
    .then(result => console.log(result))
    .catch(error => console.log(error));
});

client.on('messageReactionAdd', (reaction, user) => {
    if(user.bot)
        return;

    var roleName = reaction.emoji.name
    var role = reaction.message.guild.roles.find(role => role.name.toLowerCase() === roleName.toLowerCase());
    var member = reaction.message.guild.members.find(member => member.id === user.id);

    if(member.roles.has(role.id))
    {
        member.removeRole(role.id).then(member => {
            console.log("Removed " + member.user.username + " from the " + role.name + " role.");
        }).catch(err => console.error);
    }
    else {
        member.addRole(role.id).then(member => {
            console.log("Added " + member.user.username + " to the " + role.name + " role.");
        }).catch(err => console.error);
    }

});

client.on('message', message => {
    
    let args = message.content.slice(PREFIX.length).split(/ +/);

    switch(args[0]) {
        case 'open':
            if (!message.content.startsWith(PREFIX)) return
            if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('> Error occurred! You are missing permission to use this command.');
            message.guild.channels.find(channel => channel.id === "622442099995836416").send(`@everyone`)
            const open = new Discord.RichEmbed()
            .setTitle('**:mailbox: ORDERS OPEN**')
            .setDescription(`Orders are now open! Buy the corresponding T-Shirt in ${message.guild.channels.find(channel => channel.id === "622442195919568926")}, find the format in ${message.guild.channels.find(channel => channel.id === "622442048586514467")}, and paste and fill everything here!`)
            .setColor(0x00af64)
            .setFooter(`Status: Open! ● Posted by: ${message.author.tag} ● Bot creator: ${client.guilds.get('573082577288822805').members.find(member => member.id === "254989511640088576").user.tag}`)
            .setThumbnail(client.guilds.get('573082577288822805').iconURL)
            message.guild.channels.find(channel => channel.id === "622442099995836416").sendEmbed(open);
        break;
        case 'close':
            if (!message.content.startsWith(PREFIX)) return
            if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('> Error occurred! You are missing permission to use this command.');
            if (!args[1]) return message.reply('> Error occurred! Please define a reason why you want to close the orders.')
            const close = new Discord.RichEmbed()
            .setTitle('**:mailbox: ORDERS CLOSED**')
            .addField('**:page_facing_up: Information:**', 'Orders are now closed!')
            .addField('**:question: REASON**', `${message.content.split(" ").slice(1).join(" ").slice()}`)
            .setColor(0xe40045)
            .setFooter(`Status: Closed! ● Posted by: ${message.author.tag} ● Bot creator: ${client.guilds.get('573082577288822805').members.find(member => member.id === "254989511640088576").user.tag}`)
            .setThumbnail(client.guilds.get('573082577288822805').iconURL)
            message.guild.channels.find(channel => channel.id === "622442099995836416").sendEmbed(close);
        break;
        case 'suggest':
            if (!message.content.startsWith(PREFIX)) return
            if (!args[1]) return message.reply('> Error occurred! Please type your suggestion.')
            const suggest = new Discord.RichEmbed()
            .setTitle('**:bulb: | Suggestion**')
            .setDescription(`${message.content.split(" ").slice(1).join(" ").slice()}`)
            .setColor(0x81BEF7)
            .setFooter(`Posted by: ${message.author.tag} ● Bot creator: ${client.guilds.get('573082577288822805').members.find(member => member.id === "254989511640088576").user.tag}`)
            .setThumbnail(message.author.avatarURL)
            message.guild.channels.find(channel => channel.id === "600967664222994432").sendEmbed(suggest)
                .then( async (message) => {
                    await message.react('✅');
                    await message.react('🤷');
                    await message.react('❌');
                    messageId = message.id;
                });
        break;
        case 'send':
            if (!message.content.startsWith(PREFIX)) return
            if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('> Error occurred! You are missing permission to use this command.');
            if (!args[1]) return message.reply('> Error occurred! Please type the channel id or the tag the channel where you want the message to be send.')
            if (!args[2]) return message.reply('> Error occurred! Please type the title of the message which you want to be send.')
            if (!args[3]) return message.reply('> Error occurred! Please type the message which you want to be send.')
            const send = new Discord.RichEmbed()
            .setTitle(`${message.content.split(" ").slice(2).join(" ").slice()}`)
            .setDescription(`${message.content.split(" ").slice(3).join(" ").slice()}`)
            .setColor(0x9FF781)
            .setFooter(`Bot creator: ${client.guilds.get('573082577288822805').members.find(member => member.id === "254989511640088576").user.tag}`)
            message.guild.channels.find((channel => channel.id === "622442195919568926") || message.mentions.channels.first()).sendEmbed(send)
        break;
        case 'graphic_links':
            if (!message.content.startsWith(PREFIX)) return
            if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('> Error occurred! You are missing permission to use this command.');
            if (!args[1]) return message.channel.send('> Error occurred! Please type the channel id or the tag the channel where you want the message to be send.')
            const graphic_links = new Discord.RichEmbed()
            .setTitle(`${client.guilds.get('573082577288822805').emojis.find(emoji => emoji.name === "logo")} | Graphic Links`)
            .setDescription(`${message.content.split(" ").slice(2).join(" ").slice()}`)
            .setColor(0x9FF781)
            .setThumbnail(client.guilds.get('573082577288822805').members.find(member => member.id === "598149741548929024").user.avatarURL)
            .setFooter(`Bot creator: ${client.guilds.get('573082577288822805').members.find(member => member.id === "254989511640088576").user.tag}`)
            message.guild.channels.find(channel => channel.id === args[1]).sendEmbed(graphic_links)
        break;
        case 'how_to_order_1':
            if (!message.content.startsWith(PREFIX)) return
            if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('> Error occurred! You are missing permission to use this command.');
            if (!args[1]) return message.channel.send('> Error occurred! Please type the channel id or the tag the channel where you want the message to be send.')
            const how_to_order_1 = new Discord.RichEmbed()
            .setTitle(`${client.guilds.get('573082577288822805').emojis.find(emoji => emoji.name === "logo")} | Order Formats`)
            .setDescription(`${message.content.split(" ").slice(2).join(" ").slice()}`)
            .setColor(0x9FF781)
            .setThumbnail(client.guilds.get('573082577288822805').members.find(member => member.id === "598149741548929024").user.avatarURL)
            .setFooter(`Bot creator: ${client.guilds.get('573082577288822805').members.find(member => member.id === "254989511640088576").user.tag}`)
            message.guild.channels.find(channel => channel.id === args[1]).sendEmbed(how_to_order_1)
        break;
        case 'how_to_order_2':
            if (!message.content.startsWith(PREFIX)) return
            if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('> Error occurred! You are missing permission to use this command.');
            if (!args[1]) return message.channel.send('> Error occurred! Please type the channel id or the tag the channel where you want the message to be send.')
            const how_to_order_2 = new Discord.RichEmbed()
            .setTitle(`${client.guilds.get('573082577288822805').emojis.find(emoji => emoji.name === "logo")} | Order Rules`)
            .setDescription(`**:one: Payment**
            Please be sure to pay before your order is being made. Find the T-Shirt corresponding to your order in ${message.guild.channels.find(channel => channel.id === "622442195919568926")}. If you don't buy the T-Shirt, your order will get deleted within 2 days.
            **:two: Refund Policy**
            I do **NOT** give refunds if you cancel your order. I only give refunds if I am the one who's cancelling. When buying the T-Shirt, make sure you're buying the right one for your need. If you bought the wrong T-Shirt, you will not be given a refund as it is your own fault. 
            **:three: Outfit**
            Be sure to already have your outfit ready as soon as you're ordering. Also, even if you're using a package, you will still be in 1.0. Trust me, 1.0 looks way better on GFXs than other packages.
            **:four: Reaction Info**
            If I react to your order with ${client.guilds.get('573082577288822805').emojis.find(emoji => emoji.name === "check")} it means that your order has been accepted and will be worked on soon. If I react with ${client.guilds.get('573082577288822805').emojis.find(emoji => emoji.name === "cross")}, it means that your order is invalid. If I react with ${client.guilds.get('573082577288822805').emojis.find(emoji => emoji.name === "up")}, it means that your order is done. If I react with ${client.guilds.get('573082577288822805').emojis.find(emoji => emoji.name === "down")}, it means that you need to pay.
            **:five: Order Boost**
            If you purchase the "Order Boost" shirt, your order will be completed before everyone else who ordered! If many people use the order boost, the order that will get completed first is the one who was ordered the earliest.
            **:six: Due Date**
            Please do NOT order a graphic if you need it within a week. Please keep in mind that I have a social life, I'm not sitting on my computer 24/7. There are also people waiting.`)
            .setColor(0x9FF781)
            .setThumbnail(client.guilds.get('573082577288822805').members.find(member => member.id === "598149741548929024").user.avatarURL)
            .setFooter(`Bot creator: ${client.guilds.get('573082577288822805').members.find(member => member.id === "254989511640088576").user.tag}`)
            message.guild.channels.find(channel => channel.id === args[1]).sendEmbed(how_to_order_2)
        break;
        case 'help':
            if (!message.content.startsWith(PREFIX)) return
            const help = new Discord.RichEmbed()
            .setTitle('Under Construction!')
            .addField('Under Construction!', 'Under Construction!')
            .setThumbnail(client.guilds.get('573082577288822805').members.find(member => member.id === "598149741548929024").user.avatarURL)
            .setFooter(`Bot creator: ${client.guilds.get('573082577288822805').members.find(member => member.id === "254989511640088576").user.tag}`)
            message.channel.sendEmbed(help)
        break;
        case 'en_fr':
            if (!message.content.startsWith(PREFIX)) return
            if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('> Error occurred! You are missing permission to use this command.');
            const en_fr = new Discord.RichEmbed()
            .setTitle('**:flag_fr: :flag_gb: | Get Roles**')
            .addField('**FR:**', 'Pour commencer, sélectionnez votre langage et vous aurez accès complètement au Discord! Vous pourrez bien sûre changer le langage dans le future. Si vous sélectionnez les deux, vous serez automatiquement parlé en Français.')
            .addField('**ENG:**', 'To start, select your language to have complete access to the Discord! You can, of course, change the language in the future. If you choose both languages, you will be automatically talked in French.')
            .addField(':flag_fr:', '**FRANÇAIS**', true)
            .addField(':flag_gb:', '**ENGLISH**', true)
            .setFooter(`Posted by: ${message.author.tag} ● Bot creator: ${client.guilds.get('573082577288822805').members.find(member => member.id === "254989511640088576").user.tag}`)
            .setColor(0xF7FE2E)
            message.channel.sendEmbed(en_fr)
            .then( async (message) => {
                await message.react('🇫🇷');
                await message.react('🇬🇧');
                messageId = message.id;
            });
        break;
        case 'clear':
            if (!message.content.startsWith(PREFIX)) return
            if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Error occurred! You are missing permission to use this command.');
            if (!args[1]) return message.reply('Error occurred! Please define a number of the message/s which you want to delete.')
            message.channel.bulkDelete(args[1])
            message.channel.send(`Successfully deleted ${args[1]} message/s.`);
        break;
        case 'kick':
            if (!message.content.startsWith(PREFIX)) return
            if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('> Error occurred! You are missing permission to use this command.');
            if(!args[1]) return message.channel.send("> Please type the person you want to kick and the reason of it.")
            let kUser = message.guild.member(message.mentions.users.first());
            if(!kUser) return message.channel.send("> Error occurred! Can't find the user in this server.");
            let kReason = message.content.split(" ").slice(2).join(" ").slice()
            if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("> Error occurred! That user is a mod/admin.");
            if(!args[2]) return message.channel.send("> Please type the reason of the kick.")

            let kickEmbed = new Discord.RichEmbed()
            .setTitle("**Kicked Member**")
            .setColor(0xFF0000)
            .addField("Kicked user:", `${kUser} with ID ${kUser.id}`)
            .addField("Kicked by:", `<@${message.author.id}> with ID ${message.author.id}`)
            .addField("Kicked in:", `${message.channel} with ID ${message.channel.id}`)
            .addField("Kicked at:", message.createdAt)
            .addField("Kick reason:", kReason)
            .setThumbnail()
            .setFooter(`Bot creator: ${client.guilds.get('573082577288822805').members.find(member => member.id === "254989511640088576").user.tag}`)

            let kickChannel = message.guild.channels.find(channel => channel.id === "597149222999162891");
            if(!kickChannel) return message.channel.send("> Error occurred! I can't find logs channel.");

            message.guild.member(kUser).kick(`${kReason} | Kicked by: ${message.author.username} with ID ${message.author.id}`);
            kickChannel.send(kickEmbed);
            kUser.send(`> You were kicked from ${client.guilds.get('573082577288822805').name}. | Kick reason: ${kReason} | Kicked by: ${message.author.username} with ID ${message.author.id}`)
            message.channel.send(`> ${kUser} was successfully kicked.`)
        break;
        case 'ban':
            if (!message.content.startsWith(PREFIX)) return
            if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('> Error occurred! You are missing permission to use this command.');
            if(!args[1]) return message.channel.send("> Please type the person you want to ban and the reason of it.")
            let bUser = message.guild.member(message.mentions.users.first());
            if(!bUser) return message.channel.send("> Error occurred! Can't find the user in this server.");
            let bReason = message.content.split(" ").slice(2).join(" ").slice()
            if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("> Error occurred! That user is a mod/admin.");
            if(!args[2]) return message.channel.send("> Please type the reason of the ban.")

            let banEmbed = new Discord.RichEmbed()
            .setTitle("**Banned Member**")
            .setColor(0xFF0000)
            .addField("Banned user:", `${bUser} with ID ${bUser.id}`)
            .addField("Banned by:", `<@${message.author.id}> with ID ${message.author.id}`)
            .addField("Banned in:", `${message.channel} with ID ${message.channel.id}`)
            .addField("Banned at:", message.createdAt)
            .addField("Ban reason:", bReason)
            .setThumbnail(message.mentions.users.first().avatarURL)
            .setFooter(`Bot creator: ${client.guilds.get('573082577288822805').members.find(member => member.id === "254989511640088576").user.tag}`)

            let banChannel = message.guild.channels.find(channel => channel.id === "597149222999162891");
            if(!banChannel) return message.channel.send("> Error occurred! I can't find logs channel.");

            message.guild.member(bUser).ban(`${bReason} | Banned by: ${message.author.username} with ID ${message.author.id}`);
            banChannel.send(banEmbed);
            bUser.send(`> You were banned from ${client.guilds.get('573082577288822805').name}. | Ban reason: ${bReason} | Banned by: ${message.author.username} with ID ${message.author.id}`)
            message.channel.send(`> ${bUser} was successfully banned.`)
        break;
        case 'warn':
            if (!message.content.startsWith(PREFIX)) return
            if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('> Error occurred! You are missing permission to use this command.');
            if(!args[1]) return message.channel.send("> Please type the person you want to warn and the reason of it.")
            let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
            if(!wUser) return message.channel.send("> Error occurred! Can't find the user in this server.");
            let wReason = message.content.split(" ").slice(2).join(" ").slice()
            if(wUser.hasPermission("KICK_MEMBERS")) return message.channel.send("> Error occurred! That user is a mod/admin.");
            if(!args[2]) return message.channel.send("> Please type the reason of the warning.")

            let warnEmbed = new Discord.RichEmbed()
            .setTitle("**Warned Member**")
            .setColor(0xFF0000)
            .addField("Warned user:", `${wUser} with ID ${wUser.id}`)
            .addField("Warned by:", `<@${message.author.id}> with ID ${message.author.id}`)
            .addField("Warned in:", `${message.channel} with ID ${message.channel.id}`)
            .addField("Warned at:", message.createdAt)
            .addField("Warn reason:", wReason)
            .setThumbnail(message.mentions.users.first().avatarURL)
            .setFooter(`Bot creator: ${client.guilds.get('573082577288822805').members.find(member => member.id === "254989511640088576").user.tag}`)

            let warnChannel = message.guild.channels.find(channel => channel.id === "597149222999162891");
            if(!warnChannel) return message.channel.send("> Error occurred! I can't find logs channel.");

            warnChannel.send(warnEmbed);
            wUser.send(`> You were warned in ${client.guilds.get('573082577288822805').name}. | Warn reason: ${wReason} | Warned by: ${message.author.username} with ID ${message.author.id}`)
            message.channel.send(`> ${wUser} was successfully warned.`)
        break;
        case 'warnings':
            if (!message.content.startsWith(PREFIX)) return
            if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('> Error occurred! You are missing permission to use this command.');
    }


});


client.login(token);
