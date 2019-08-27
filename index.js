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
            if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Error occurred! You are missing permission to use this command.');
            if (!args[1]) return message.reply('Error occurred! Please define the limit of the orders for this open. (1 word or number)').catch(console.error)
            message.guild.channels.find(channel => channel.id === "598145812610023439").send(`@everyone`).catch(console.error)
            const open = new Discord.RichEmbed()
            .setTitle('**__:package: | Orders__**')
            .addField(':page_facing_up: **Information:**', 'Orders are now open! Come to the Ordering Centre and order now!')
            .addField(':exclamation: **Limit:**', `Spots are limited! Only ${args[1]} orders will be accepted until they open again!`)
            .addField(':link:** Ordering Centre:**', 'https://www.roblox.com/games/3401558963/Lyoos-GFX-Order-Center')
            .setColor(0x00af64)
            .setFooter(`Status: Open! ● Posted by: ${message.author.tag} ● Bot creator: Bryan!#1557`)
            .setThumbnail("https://cdn.discordapp.com/attachments/564091421766844428/598158027954061342/ordeiefeugf.png")
            message.guild.channels.find(channel => channel.id === "598145812610023439").sendEmbed(open).catch(console.error);
        break;
        case 'closed':
            if (!message.content.startsWith(PREFIX)) return
            if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Error occurred! You are missing permission to use this command.');
            if (!args[1]) return message.reply('Error occurred! Please define a reason why you want to close the orders.').catch(console.error)
            const closed = new Discord.RichEmbed()
            .setTitle('__**:package: | Orders**__')
            .addField('**:page_facing_up: Information:**', 'Orders are now closed! I am truly sorry for those who could not make it at the time. You can always try next time!').catch(console.error)
            .addField('**:question: Reason:**', `${message.content.split(" ").slice(1).join(" ").slice()}`)
            .setColor(0xe40045)
            .setFooter(`Status: Closed! ● Posted by: ${message.author.tag} ● Bot creator: Bryan!#1557`)
            .setThumbnail("https://cdn.discordapp.com/attachments/564091421766844428/598158027954061342/ordeiefeugf.png")
            message.guild.channels.find(channel => channel.id === "598145812610023439").sendEmbed(closed).catch(console.error);
        break;
        case 'left':
            if (!message.content.startsWith(PREFIX)) return
            if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Error occurred! You are missing permission to use this command.');
            if (!args[1]) return message.reply('Error occurred! Please define how much orders left to the close. (1 word)')
            const left = new Discord.RichEmbed()
            .setTitle('__**:package: | Orders**__')
            .addField('**:page_facing_up: Information:**', `Hurry up! There are only ${args[1]} spots left to the close of the orders!`)
            .addField(':link:** Ordering Centre:**', 'https://www.roblox.com/games/3401558963/Lyoos-GFX-Order-Center')
            .setColor(0xDF7401)
            .setFooter(`Status: Open! ● Posted by: ${message.author.tag} ● Bot creator: Bryan!#1557`)
            .setThumbnail("https://cdn.discordapp.com/attachments/564091421766844428/598158027954061342/ordeiefeugf.png")
            message.guild.channels.find(channel => channel.id === "598145812610023439").sendEmbed(left).catch(console.error);
        break;
        case 'suggest':
            if (!message.content.startsWith(PREFIX)) return
            if (!args[1]) return message.reply('Error occurred! Please type your suggestion.').catch(console.error)
            const suggest = new Discord.RichEmbed()
            .setTitle('__**:bulb: | Suggestion**__')
            .setDescription(`${message.content.split(" ").slice(1).join(" ").slice()}`)
            .setColor(0x81BEF7)
            .setFooter(`Posted by: ${message.author.tag} ● Bot creator: Bryan!#1557`)
            .setThumbnail(message.author.avatarURL)
            message.guild.channels.find(channel => channel.id === "600967664222994432").sendEmbed(suggest).catch(console.error)
                .then( async (message) => {
                    await message.react('✅');
                    await message.react('🤷');
                    await message.react('❌');
                    messageId = message.id;
                });
        break;
        case 'send':
            if (!message.content.startsWith(PREFIX)) return
            if (!args[1]) return message.reply('Error occurred! Please type your message.').catch(console.error)
            message.guild.channels.find(channel => channel.id === args[1]).send(message.content.split(" ").slice(2).join(" ").slice()).catch(console.error)
        break;
        case 'question':
            if (!message.content.startsWith(PREFIX)) return
            if (!args[1]) return message.reply('Error occurred! Please type your question.').catch(console.error)
            const question = new Discord.RichEmbed()
            .setTitle('__**:question: | Question**__')
            .setDescription(`${message.content.split(" ").slice(1).join(" ").slice()}`)
            .setColor(0x81BEF7)
            .setFooter(`Posted by: ${message.author.tag} ● Bot creator: Bryan!#1557`)
            .setThumbnail(message.author.avatarURL)
            message.guild.channels.find(channel => channel.id === "612298094251343892").sendEmbed(question)
        break;
        case 'help':
            if (!message.content.startsWith(PREFIX)) return
            const help = new Discord.RichEmbed()
            .setTitle('Under construction')
            .setDescription('Under construction')
            .setThumbnail(client.avatarURL)
            message.channel.sendEmbed(help)
        break;
        case 'en_fr':
            if (!message.content.startsWith(PREFIX)) return
            if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Error occurred! You are missing permission to use this command.');
            const en_fr = new Discord.RichEmbed()
            .setTitle('__**:flag_fr: :flag_gb: | Get Roles**__')
            .addField('**FR:**', 'Pour commencer, sélectionnez votre langage et vous aurez accès complètement au Discord! Vous pourrez bien sûre changer le langage dans le future. Si vous sélectionnez les deux, vous serez automatiquement parlé en Français.')
            .addField('**ENG:**', 'To start, select your language to have complete access to the Discord! You can, of course, change the language in the future. If you choose both languages, you will be automatically talked in French.')
            .addField(':flag_fr:', '**FRANÇAIS**', true)
            .addField(':flag_gb:', '**ENGLISH**', true)
            .setFooter(`Posted by: ${message.author.tag} ● Bot creator: Bryan!#1557`)
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
            if (!args[1]) return message.reply('Error occurred! Please define a number of the messages which you want to delete.').catch(console.error)
            message.channel.bulkDelete(args[1]).catch(console.error);
            message.channel.send(`Successfully deleted ${args[1]} messages.`).catch(console.error)
        break;
        case 'kick':
            if (!message.content.startsWith(PREFIX)) return
            if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('Error occurred! You are missing permission to use this command.');
            if(!args[1]) return message.channel.send("Please type the person you want to kick and the reason of it.")
            let kUser = message.guild.member(message.mentions.users.first());
            if(!kUser) return message.channel.send("Error occurred! Can't find the user in this server.");
            let kReason = message.content.split(" ").slice(2).join(" ").slice()
            if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("Error occurred! That user is a mod/admin.");
            if(!args[2]) return message.channel.send("Please type the reason of the kick.")

            let kickEmbed = new Discord.RichEmbed()
            .setTitle("**__Kicked Member__**")
            .setColor(0xFF0000)
            .addField("Kicked user:", `${kUser} with ID ${kUser.id}`)
            .addField("Kicked by:", `<@${message.author.id}> with ID ${message.author.id}`)
            .addField("Kicked in:", `${message.channel} with ID ${message.channel.id}`)
            .addField("Kicked at:", message.createdAt)
            .addField("Kick reason:", kReason)
            .setThumbnail(message.mentions.users.first().avatarURL)
            .setFooter("Bot creator: Bryan!#1557")

            let kickChannel = message.guild.channels.find(channel => channel.id === "597149222999162891");
            if(!kickChannel) return message.channel.send("Can't find logs channel.");

            message.guild.member(kUser).kick(`${kReason} Kicked by: ${message.author.username} with ID ${message.author.id}`);
            kickChannel.send(kickEmbed);
            message.guild.member(kUser).createDM(`> You were kicked from ${client.guilds.get('573082577288822805').name} with reason: ${kReason} Kicked by: ${message.author.username} with ID ${message.author.id}`)
        break;
        case 'ban':
            if (!message.content.startsWith(PREFIX)) return
            if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('Error occurred! You are missing permission to use this command.');
            if(!args[1]) return message.channel.send("Please type the person you want to ban and the reason of it.")
            let bUser = message.guild.member(message.mentions.users.first());
            if(!bUser) return message.channel.send("Error occurred! Can't find the user in this server.");
            let bReason = message.content.split(" ").slice(2).join(" ").slice()
            if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("Error occurred! That user is a mod/admin.");
            if(!args[2]) return message.channel.send("Please type the reason of the ban.")

            let banEmbed = new Discord.RichEmbed()
            .setTitle("**__Banned Member__**")
            .setColor(0xFF0000)
            .addField("Banned user:", `${bUser} with ID ${bUser.id}`)
            .addField("Banned by:", `<@${message.author.id}> with ID ${message.author.id}`)
            .addField("Banned in:", `${message.channel} with ID ${message.channel.id}`)
            .addField("Banned at:", message.createdAt)
            .addField("Ban reason:", bReason)
            .setThumbnail(message.mentions.users.first().avatarURL)
            .setFooter("Bot creator: Bryan!#1557")

            let banChannel = message.guild.channels.find(channel => channel.id === "597149222999162891");
            if(!banChannel) return message.channel.send("Can't find logs channel.");

            message.guild.member(bUser).ban(`${bReason} Banned by: ${message.author.username} with ID ${message.author.id}`);
            banChannel.send(banEmbed);
            message.guild.member(bUser).createDM(`> You were banned from ${client.guilds.get('573082577288822805').name} with reason: ${bReason} Banned by: ${message.author.username} with ID ${message.author.id}`)
        break;
        case 'warn':
            if (!message.content.startsWith(PREFIX)) return
            if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('Error occurred! You are missing permission to use this command.');
            if(!args[1]) return message.channel.send("Please type the person you want to warn and the reason of it.")
            let wUser = message.guild.member(message.mentions.users.first());
            if(!wUser) return message.channel.send("Error occurred! Can't find the user in this server.");
            let wReason = message.content.split(" ").slice(2).join(" ").slice()
            if(wUser.hasPermission("BAN_MEMBERS")) return message.channel.send("Error occurred! That user is a mod/admin.");
            if(!args[2]) return message.channel.send("Please type the reason of the warning.")

            let warnEmbed = new Discord.RichEmbed()
            .setTitle("**__Warned Member__**")
            .setColor(0xFF0000)
            .addField("Warned user:", `${wUser} with ID ${wUser.id}`)
            .addField("Warned by:", `<@${message.author.id}> with ID ${message.author.id}`)
            .addField("Warned in:", `${message.channel} with ID ${message.channel.id}`)
            .addField("Warned at:", message.createdAt)
            .addField("Warn reason:", wReason)
            .setThumbnail(message.mentions.users.first().avatarURL)
            .setFooter("Bot creator: Bryan!#1557")

            let warnChannel = message.guild.channels.find(channel => channel.id === "597149222999162891");
            if(!warnChannel) return message.channel.send("Can't find logs channel.");

            warnChannel.send(warnEmbed);
            message.guild.member(wUser).createDM(`> You were warned from ${client.guilds.get('573082577288822805').name} with reason: ${wReason} Warned by: ${message.author.username} with ID ${message.author.id}`)
    }


});


client.login(token).catch(console.error);
