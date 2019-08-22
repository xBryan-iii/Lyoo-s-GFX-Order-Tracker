const Discord = require('discord.js');
const client = new Discord.Client();

const token = process.env.lyoo1;

const PREFIX = '-';

client.on('ready', () =>{
    console.log('This bot is online!');
    client.user.setActivity(`Orders`, { type: 'WATCHING'}).catch(console.error);

});

client.on('message', message => {
    
    let args = message.content.slice(PREFIX.length).split(/ +/).catch(console.error);

    switch(args[0]) {
        case 'open':
            if (!message.content.startsWith(PREFIX)) return
            if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Error occurred! You are missing permission to use this command.').catch(console.error);
            if (!args[1]) return message.reply('Error occurred! Please define the limit of the orders for this open. (1 word or number)').catch(console.error)
            message.guild.channels.find(channel => channel.id === "598145812610023439").send(`@everyone`).catch(console.error)
            const open = new Discord.RichEmbed().catch(console.error)
            .setTitle('**__:package: | Orders__**').catch(console.error)
            .addField(':page_facing_up: **Information:**', 'Orders are now open! Come to the Ordering Centre and order now!').catch(console.error)
            .addField(':exclamation: **Limit:**', `Spots are limited! Only ${args[1]} orders will be accepted until they open again!`).catch(console.error)
            .addField(':link:** Ordering Centre:**', 'https://www.roblox.com/games/3401558963/Lyoos-GFX-Order-Center').catch(console.error)
            .setColor(0x00af64).catch(console.error)
            .setFooter(`Status: Open! ● Posted by: ${message.author.tag} ● Bot creator: Bryan!#1557`).catch(console.error)
            .setThumbnail("https://cdn.discordapp.com/attachments/564091421766844428/598158027954061342/ordeiefeugf.png").catch(console.error)
            message.guild.channels.find(channel => channel.id === "598145812610023439").sendEmbed(open).catch(console.error).catch(console.error);
            break;
        case 'closed':
            if (!message.content.startsWith(PREFIX)) return
            if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Error occurred! You are missing permission to use this command.').catch(console.error);
            if (!args[1]) return message.reply('Error occurred! Please define a reason why you want to close the orders.').catch(console.error)
            const closed = new Discord.RichEmbed().catch(console.error)
            .setTitle('__**:package: | Orders**__').catch(console.error)
            .addField('**:page_facing_up: Information:**', 'Orders are now closed! I am truly sorry for those who could not make it at the time. You can always try next time!').catch(console.error)
            .addField('**:question: Reason:**', `${message.content.split(" ").slice(1).join(" ").slice()}`).catch(console.error)
            .setColor(0xe40045).catch(console.error)
            .setFooter(`Status: Closed! ● Posted by: ${message.author.tag} ● Bot creator: Bryan!#1557`).catch(console.error)
            .setThumbnail("https://cdn.discordapp.com/attachments/564091421766844428/598158027954061342/ordeiefeugf.png").catch(console.error)
            message.guild.channels.find(channel => channel.id === "598145812610023439").sendEmbed(closed).catch(console.error);
            break;
        case 'left':
            if (!message.content.startsWith(PREFIX)) return
            if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Error occurred! You are missing permission to use this command.').catch(console.error);
            if (!args[1]) return message.reply('Error occurred! Please define how much orders left to the close. (1 word)').catch(console.error)
            const left = new Discord.RichEmbed().catch(console.error)
            .setTitle('__**:package: | Orders**__').catch(console.error)
            .addField('**:page_facing_up: Information:**', `Hurry up! There are only ${args[1]} spots left to the close of the orders!`).catch(console.error)
            .addField(':link:** Ordering Centre:**', 'https://www.roblox.com/games/3401558963/Lyoos-GFX-Order-Center').catch(console.error)
            .setColor(0xDF7401).catch(console.error)
            .setFooter(`Status: Open! ● Posted by: ${message.author.tag} ● Bot creator: Bryan!#1557`).catch(console.error)
            .setThumbnail("https://cdn.discordapp.com/attachments/564091421766844428/598158027954061342/ordeiefeugf.png").catch(console.error)
            message.guild.channels.find(channel => channel.id === "598145812610023439").sendEmbed(left).catch(console.error);
            break;
        case 'suggest':
            if (!message.content.startsWith(PREFIX)) return
            if (!args[1]) return message.reply('Error occurred! Please type your suggestion.').catch(console.error)
            const suggest = new Discord.RichEmbed().catch(console.error)
            .setTitle('__**:bulb: | Suggestion**__').catch(console.error)
            .setDescription(`${message.content.split(" ").slice(1).join(" ").slice()}`).catch(console.error)
            .setColor(0x81BEF7).catch(console.error)
            .setFooter(`Posted by: ${message.author.tag} ● Bot creator: Bryan!#1557`).catch(console.error)
            .setThumbnail(message.author.avatarURL).catch(console.error)
            message.guild.channels.find(channel => channel.id === "600967664222994432").sendEmbed(suggest).catch(console.error)
                .then( async (message) => {
                    await message.react('✅').catch(console.error);
                    await message.react('🤷').catch(console.error);
                    await message.react('❌').catch(console.error);
                    messageId = message.id.catch(console.error);
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
            const question = new Discord.RichEmbed().catch(console.error)
            .setTitle('__**:question: | Question**__').catch(console.error)
            .setDescription(`${message.content.split(" ").slice(1).join(" ").slice()}`).catch(console.error)
            .setColor(0x81BEF7).catch(console.error)
            .setFooter(`Posted by: ${message.author.tag} ● Bot creator: Bryan!#1557`).catch(console.error)
            .setThumbnail(message.author.avatarURL).catch(console.error)
            message.guild.channels.find(channel => channel.id === "612298094251343892").sendEmbed(question).catch(console.error)
        break;
        case 'clear':
            if (!message.content.startsWith(PREFIX)) return
            if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Error occurred! You are missing permission to use this command.').catch(console.error);
            if (!args[1]) return message.reply('Error occurred! Please define a number of the messages which you want to delete.').catch(console.error)
            message.channel.bulkDelete(args[1]).catch(console.error);
        break;
        case 'kick':
            if (!message.content.startsWith(PREFIX)) return
            if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Error occurred! You are missing permission to use this command.').catch(console.error);
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
