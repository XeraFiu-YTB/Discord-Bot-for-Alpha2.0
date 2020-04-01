const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
        message.channel.bulkDelete(1)
            .then(messages => console.log(`Bulk deleted ${messages.size} messages`))
            .catch(console.error);

        const noPermEmbed = new Discord.MessageEmbed()
            .setColor('#F3831F')
            .setDescription("Vous n'avez pas la permission.")

        return message.channel.send(noPermEmbed).then(msg => msg.delete({timeout:5000}));

    } else {
        let userID = message.mentions.members.first().id
        userID = message.guild.members.cache.find(m => m.id == `${userID}`)
        userID.kick()
        message.channel.send(`<@userID.id> kick avec succès`)
    }


}
module.exports.help = {
    name: "kick"
}
