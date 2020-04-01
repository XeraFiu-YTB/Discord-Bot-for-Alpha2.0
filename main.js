//https://discordapp.com/oauth2/authorize?client_id=694651162254639174&scope=bot&permissions=8
const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'], disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir('./commands/', (err, files) => {
    if(err) console.log(err);

    let jsFile = files.filter(f => f.split('.').pop() === 'js');
    if (jsFile.length <= 0) {
        console.log('Je ne trouve pas la commande');
        return;
    }

    jsFile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        bot.commands.set(props.help.name, props);
    });
});



bot.on('ready', async () => {
    console.log(`${bot.user.username} est en ligne ! `);
    bot.user.setActivity("aider des gens", { type: 'PLAYING' });
});

bot.on('message', async message => {
    if (message.author.bot) return;
    let prefix = "*";
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    let commandFile = bot.commands.get(command.slice(prefix.length));
    if(commandFile) commandFile.run(bot, message, args);
});

bot.on('messageReactionAdd', async (reaction, user) => {
    //Rules -> Role Membre
    if(reaction.emoji.id == "690129812257505306" && reaction.message.channel.id == "688696327596802081" && user.id != bot.user.id) {
        let userID = reaction.message.guild.members.cache.find(m => m.id == user.id)
        let roleMembre = reaction.message.guild.roles.cache.find(r => r.id == "688689703196819479");
        userID.roles.add(roleMembre)
    }
    //Ticket System
    if(reaction.emoji.name == "⚠️" && reaction.message.channel.id == "688725764564451363" && user.id != bot.user.id) {
        let userID = reaction.message.guild.members.cache.find(m => m.id == user.id)
        let staffRole = reaction.message.guild.roles.cache.find(r => r.id == "688757117292773417")
        let everyone = reaction.message.guild.roles.cache.find(r => r.name == '@everyone')
        let categoryTicket = reaction.message.guild.channels.cache.find(c => c.id == "688725737234104349" && c.type == 'category')
        if(reaction.message.guild.channels.cache.some(c => c.name == `${userID.id}`)) {
            reaction.message.channel.send(`${userID} tu as déjà un ticket d'ouvert : <#${userID.id}>`).then(msg => msg.delete({timeout: 10000}))
        }  else {
            reaction.message.guild.channels.create(`${userID.id}`, { type: 'text', parent: categoryTicket, permissionOverwrites: [ { id: everyone, deny: ['SEND_MESSAGES', 'VIEW_CHANNEL'] }, { id: userID, allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'] }, { id: staffRole, allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'] } ]})
            userID.send(`> Salut, tu viens d'ouvrir un ticket dans **__Design'Support__** !\n Tu peux exposer ton problème dans le salon <#${userID.id}>`)
        }
    }
    //Auto-role reaction
    /*
        Artiste : 🎨  693935424070221886
        VFX : 💻  693935514088243201
        2D : 📄  693935589703024771
        3D : 🎲  693935632376004659
        Photographie : 📸  693935666043682826
        Monteur Vidéo : 🖥️  693935740635316236
        Développeur : 🕹️  694826380956794961
        Dessinateur : ✏️  694532244290928701
    */
    if(reaction.message.channel.id == "689481472544866398" && user.id != bot.user.id) {
        let roleChoosen = ""
        let userID = reaction.message.guild.members.cache.find(m => m.id == user.id)
        let reactionID = reaction.emoji.name
        switch(reactionID) {
            //Artiste
            case '🎨':
                roleChoosen = reaction.message.guild.roles.cache.find(r => r.id == "693935424070221886");
            break;
            //VFX
            case '💻':
                roleChoosen = reaction.message.guild.roles.cache.find(r => r.id == "693935514088243201");
            break;
            //2D
            case '📄':
                roleChoosen = reaction.message.guild.roles.cache.find(r => r.id == "693935589703024771");
            break;
            //3D
            case '🎲':
                roleChoosen = reaction.message.guild.roles.cache.find(r => r.id == "693935632376004659");
            break;
            //Photographie
            case '📸':
                roleChoosen = reaction.message.guild.roles.cache.find(r => r.id == "693935666043682826");
            break;
            //Monteur vidéo
            case '🖥️':
                roleChoosen = reaction.message.guild.roles.cache.find(r => r.id == "693935740635316236");
            break;
            //Développeur
            case '🕹️':
                roleChoosen = reaction.message.guild.roles.cache.find(r => r.id == "694826380956794961");
            break;
            //Dessinateur
            case '✏️':
                roleChoosen = reaction.message.guild.roles.cache.find(r => r.id == "694532244290928701");
            break;
        }
        userID.roles.add(roleChoosen)
    }
})
bot.on('messageReactionRemove', async (reaction, user) => {
    if(reaction.message.channel.id == "689481472544866398" && user.id != bot.user.id) {
        let roleChoosen = ""
        let userID = reaction.message.guild.members.cache.find(m => m.id == user.id)
        let reactionID = reaction.emoji.name
        switch(reactionID) {
            //Artiste
            case '🎨':
                roleChoosen = reaction.message.guild.roles.cache.find(r => r.id == "693935424070221886");
            break;
            //VFX
            case '💻':
                roleChoosen = reaction.message.guild.roles.cache.find(r => r.id == "693935514088243201");
            break;
            //2D
            case '📄':
                roleChoosen = reaction.message.guild.roles.cache.find(r => r.id == "693935589703024771");
            break;
            //3D
            case '🎲':
                roleChoosen = reaction.message.guild.roles.cache.find(r => r.id == "693935632376004659");
            break;
            //Photographie
            case '📸':
                roleChoosen = reaction.message.guild.roles.cache.find(r => r.id == "693935666043682826");
            break;
            //Monteur vidéo
            case '🖥️':
                roleChoosen = reaction.message.guild.roles.cache.find(r => r.id == "693935740635316236");
            break;
            //Développeur
            case '🕹️':
                roleChoosen = reaction.message.guild.roles.cache.find(r => r.id == "694826380956794961");
            break;
            //Dessinateur
            case '✏️':
                roleChoosen = reaction.message.guild.roles.cache.find(r => r.id == "694532244290928701");
            break;
        }
        userID.roles.remove(roleChoosen)
    }
})



//process.env.TOKEN
//Njk0NjUxMTYyMjU0NjM5MTc0.XoOxUw.QsQvB0sZ7B2_bdFdK7VlbXhbQ7w
bot.login(process.env.TOKEN);
