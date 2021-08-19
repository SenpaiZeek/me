const Discord = require('discord.js');
const emoji = require('../../Utils/emoji.json');
const config = require('../../config.json');

module.exports = {
    name: 'ban',
    category: 'Moderation',
    description: 'Bans the mentioned user or the user which you provided ID from the server lol',
    example: `${config.Prefix}ban @Dinav Being Rude`,

    run: async (client, message, args) => {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const perms = ["BAN_MEMBERS" || "ADMINSTRATOR"];
        const doggo = message.guild.members.cache.get(client.user.id);

        if(!message.member.hasPermission(perms)) 
        return message.reply(`${emoji.Error} You do not have the permission to do that lol try asking a staff to give you the permission **\`BAN_MEMBERS\`** or **\`ADMINISTRATOR\`**`)
        .then(msg => {
            msg.delete({ timeout: 20000 })
        });

        if(!doggo.hasPermission(perms))
        return message.reply(`${emoji.Error} I do not have permission to ban users pls enable permission **\`BAN_MEMBERS\`** for me`)

        if (!user)
        return message.reply(`${emoji.Error} Please specify someone you want to ban. **\`${config.Prefix}ban <user> [reason]\`**`)
        
        if(user.id === message.author.id) 
        return message.reply(`${emoji.Error} You cannot ban yourself idot`)

        if(user.id === client.user.id)
        return message.reply(`${emoji.Error} Wait What !!?? I cannot ban myslef !!`)        

        if (user.roles.highest.position > message.member.roles.highest.position)
        return message.reply(`${emoji.Error} You cannot ban someone with an equal or higher role to you !!! or if you are owner pls be yourself in a higher position`)
        

        if (!user.bannable)
        return message.reply(`${emoji.Error} Provided user is not bannable cuz he / she has higher role than me or equal to my position :(`);


        const reason = args.slice(1).join(" ");
        message.guild.members.cache.get(user.id).ban({reason: reason});
 
        const embed = new Discord.MessageEmbed()
        .setColor("#00aaaa")
        .setTitle('Ban !!')
        .setDescription(`${emoji.Approved} <@${user.id}> (**\`${user.user.tag}\`**) has been banned from **${message.guild.name}**`)
        .addField('Reason', `**\`${reason != "" ? reason : "-"}\`**`, true)
        .addField('Banned By', `<@${message.member.id}> (**\`${message.member.user.tag}\`**)`, true)
        .setTimestamp()

        await message.channel.send(embed);
    }
}
