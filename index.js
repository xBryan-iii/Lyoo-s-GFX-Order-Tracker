const Discord = require('discord.js');
const client = new Discord.Client();

const token = process.env.lyoo1;

const PREFIX = '-';

client.on('ready', () =>{
    console.log('This bot is online!');
    client.user.setActivity(`Orders`, { type: 'WATCHING'}).catch(console.error);

});

client.on('message', message => {
    
    let args = message.content.slice(PREFIX.length).split(/ +/);

    switch(args[0]) {
        case 'open':
            if (!message.content.startsWith(PREFIX)) return
            if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Error occurred! You are missing permission to use this command.');
            if (!args[1]) return message.reply('Error occurred! Please define the limit of the orders for this open. (1 word)')
            message.guild.channels.find(channel => channel.id === "598145812610023439").send(`@everyone`)
            const open = new Discord.RichEmbed()
            .setTitle('**__:package: | Orders__**')
            .addField(':page_facing_up: **Information:**', 'Orders are now open! Come to the Ordering Centre and order now!')
            .addField(':exclamation: **Limit:**', `Spots are limited! Only ${args[1]} orders will be accepted until they open again!`)
            .addField(':link:** Ordering Centre:**', 'https://www.roblox.com/games/3401558963/Lyoos-GFX-Order-Center')
            .setColor(0x00af64)
            .setFooter(`Status: Open! ● Posted by: ${message.author.tag} ● Bot creator: Bryan!#1557`)
            .setThumbnail("https://cdn.discordapp.com/attachments/564091421766844428/598158027954061342/ordeiefeugf.png")
            message.guild.channels.find(channel => channel.id === "598145812610023439").sendEmbed(open);
            break;
        case 'closed':
            if (!message.content.startsWith(PREFIX)) return
            if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Error occurred! You are missing permission to use this command.');
            if (!args[1]) return message.reply('Error occurred! Please define a reason why you want to close the orders.')
            const closed = new Discord.RichEmbed()
            .setTitle('__**:package: | Orders**__')
            .addField('**:page_facing_up: Information:**', 'Orders are now closed! I am truly sorry for those who could not make it at the time. You can always try next time!')
            .addField('**:question: Reason:**', `${message.content.split(" ").slice(1).join(" ").slice()}`)
            .setColor(0xe40045)
            .setFooter(`Status: Closed! ● Posted by: ${message.author.tag} ● Bot creator: Bryan!#1557`)
            .setThumbnail("https://cdn.discordapp.com/attachments/564091421766844428/598158027954061342/ordeiefeugf.png")
            message.guild.channels.find(channel => channel.id === "598145812610023439").sendEmbed(closed);
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
            message.guild.channels.find(channel => channel.id === "598145812610023439").sendEmbed(left);
            break;
        case 'suggest':
            if (!message.content.startsWith(PREFIX)) return
            if (!args[1]) return message.reply('Error occurred! Please type your suggestion.')
            const suggest = new Discord.RichEmbed()
            .setTitle('__**:bulb: | Suggestion**__')
            .setDescription(`${message.content.split(" ").slice(1).join(" ").slice()}`)
            .setColor(0x81BEF7)
            .setFooter(`Posted by: ${message.author.tag} ● Bot creator: Bryan!#1557`)
            .setThumbnail(message.author.avatarURL)
            message.guild.channels.find(channel => channel.id === "600967664222994432").sendEmbed(suggest)
                .then( async (message) => {
                    await message.react('✅');
                    await message.react('🤷');
                    await message.react('❌');
                    messageId = message.id;
                });
            break;
        case 'help':
            if (!message.content.startsWith(PREFIX)) return
            const help = new Discord.RichEmbed()
            .setTitle()
            .setThumbnail(message.author.avatarURL)
            message.channel.sendEmbed(help);
            break;
        case 'clear':
            if (!message.content.startsWith(PREFIX)) return
            if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Error occurred! You are missing permission to use this command.');
            if (!args[1]) return message.reply('Error occurred! Please define a number of the messages which you want to delete.')
            message.channel.bulkDelete(args[1]);
        break;
        case 'kick':
            if (!message.content.startsWith(PREFIX)) return
            if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Error occurred! You are missing permission to use this command.');
            const user = message.mentions.users.first();

            if (user){
                const member = message.guild.member(user);

                if (member){
                    member.kick('Kicked by Administrator.').then(() =>{
                        message.reply(`${user.tag} was sucsessfully kicked!`);
                    }).catch(err =>{
                        message.reply('Error occurred! I was unable to kick the member!')
                        console.log(err);
                    });
                } else {
                    message.reply("That user isn\'t in this guild!")
                }
            } else {
                    message.reply('Error occurred! Please define a person which you want to kick.')
            }

        break;
    }


});


client.login(token);
