const Discord = require('discord.js');
const client = new Discord.Client();

const token = process.env.lyoo1;

const PREFIX = '-';

client.on('ready', () =>{
    console.log('This bot is online!');
    client.user.setActivity(`Orders`, { type: 'WATCHING'}).catch(console.error);

});

client.on('raw', event => {
    console.log(event)
    const eventName = event.t;
    if (eventName === 'MESSAGE_REACTION_ADD')
    {
        if (event.d.message_id === '614851498731503663')
        {
            var reactionChannel = client.channels.get(event.d.channel_id);
            if (reactionChannel.messages.has(event.d.message_id))
                return;
            else {
                reactionChannel.fetchMessage(event.d.message_id)
                .then (msg => {
                    var msgReaction = msg.reactions.get(event.d.emoji.name + ":" + event.d.emoji.id);
                    var user = client.users.get(event.d.user_id)
                    client.emit('messageReactionAdd', msgReaction, user);
                })
                .catch(err => console.log(err));
            }
        }
    }
    else if (eventName === 'MESSAGE_REACTION_REMOVE')
    {
        if (event.d.message_id = '614851498731503663')
        {
            var reactionChannel = client.channels.get(event.d.channel_id);
            if (reactionChannel.messages.has(event.d.message_id))
                return;
            else {
                reactionChannel.fetchMessage(event.d.message_id)
                .then (msg => {
                    var msgReaction = msg.reactions.get(event.d.emoji.name + ":" + event.d.emoji.id);
                    var user = client.users.get(event.d.user_id)
                    client.emit('messageReactionRemove', msgReaction, user);
                })
                .catch(err => console.log(err));
            }
        }
    }
});

client.on('messageReactionAdd', (messageReaction, user) => {
    var role = '🇨🇵 Français';

    if (role)
    {
        var member = messageReaction.message.guild.members.find(member => member.id === user.id);
        if (member)
        {
            member.addRole(role.id);
            console.log("Success. Added role.");
        }
    }
});

client.on('messageReactionAdd', (messageReaction, user) => {
    var role = '🇬🇧 English';

    if (role)
    {
        var member = messageReaction.message.guild.members.find(member => member.id === user.id);
        if (member)
        {
            member.addRole(role.id);
            console.log("Success. Added role.");
        }
    }
});

client.on('messageReactionRemove', (messageReaction, user) => {
    var role = '🇬🇧 English';

    if (role)
    {
        var member = messageReaction.message.guild.members.find(member => member.id === user.id);
        if (member)
        {
            member.removeRole(role.id);
            console.log("Success. Removed role.");
        }
    }
});

client.on('messageReactionRemove', (messageReaction, user) => {
    var role = '🇨🇵 Français';

    if (role)
    {
        var member = messageReaction.message.guild.members.find(member => member.id === user.id);
        if (member)
        {
            member.removeRole(role.id);
            console.log("Success. Removed role.");
        }
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
        case 'clear':
            if (!message.content.startsWith(PREFIX)) return
            if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Error occurred! You are missing permission to use this command.');
            if (!args[1]) return message.reply('Error occurred! Please define a number of the messages which you want to delete.').catch(console.error)
            message.channel.bulkDelete(args[1]).catch(console.error);
        break;
        case 'kick':
            if (!message.content.startsWith(PREFIX)) return
            if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Error occurred! You are missing permission to use this command.');
            const user = message.mentions.users.first().catch(console.error);

            if (user){
                const member = message.guild.member(user).catch(console.error);

                if (member){
                    member.kick('Kicked by Administrator.').then(() =>{
                        message.reply(`${user.tag} was sucsessfully kicked!`).catch(console.error);
                    }).catch(err =>{
                        message.reply('Error occurred! I was unable to kick the member!')
                        console.log(err);
                    });
                } else {
                    message.reply("That user isn\'t in this guild!").catch(console.error)
                }
            } else {
                    message.reply('Error occurred! Please define a person which you want to kick.').catch(console.error)
            }

        break;
    }


});


client.login(token).catch(console.error);
