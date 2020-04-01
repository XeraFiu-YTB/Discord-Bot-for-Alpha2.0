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

    }
    if(!args[0]) {
        message.channel.bulkDelete(1)
            .then(messages => console.log(`Bulk deleted ${messages.size} messages`))
            .catch(console.error);

        const noNbEmbed = new Discord.MessageEmbed()
            .setColor('#F3831F')
            .setDescription('Veuillez spécifier un nombre de messages à supprimer.')

        return message.channel.send(noNbEmbed).then(msg => msg.delete({timeout:5000}));
    }

    if(args[0] > 100) {
        message.channel.bulkDelete(1)
            .then(messages => console.log(`Bulk deleted ${messages.size} messages`))
            .catch(console.error);

        const maxEmbed = new Discord.MessageEmbed()
            .setColor('#F3831F')
            .setDescription('Je ne peux pas supprimer plus de 100 messages.')

        return message.channel.send(maxEmbed).then(msg => msg.delete({timeout:5000}));
    }

    if(args[0] == 1) {
        message.channel.bulkDelete(2)
            .then(messages => console.log(`Bulk deleted ${messages.size} messages`))
            .catch(console.error);

        const oneEmbed = new Discord.MessageEmbed()
            .setColor('#F3831F')
            .setDescription('Je viens de supprimer 1 message pour vous ' + message.author + ' !')

        return message.channel.send(oneEmbed).then(msg => msg.delete({timeout:5000}));
    }

    if(args[0] > 1) {
        message.channel.bulkDelete(1)
            .then(messages => console.log(`Bulk deleted ${messages.size} messages`))
            .catch(console.error);
        setTimeout(function() {message.channel.bulkDelete(args[0])}, 500)

        const moreEmbed = new Discord.MessageEmbed()
            .setColor('#F3831F')
            .setDescription('Je viens de supprimer ' + args[0] + ' messages pour vous ' + message.author + ' !')

        setTimeout(function() {return message.channel.send(moreEmbed).then(msg => msg.delete({timeout:5000}));}, 2000)
    }

}
module.exports.help = {
    name: "clear"
}