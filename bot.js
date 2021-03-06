const Discord = require('discord.js');

const client = new Discord.Client();
const channel = new Discord.Channel();
const user = new Discord.User();

client.on('ready', () => {

    console.log('I am ready!');

    client.user.setActivity("Cat", {type: "LISTENING"});
    
});

 

client.on('message', receivedMessage => {

    if (receivedMessage.author == client.user) { // Prevent bot from responding to its own messages
        return
    }

    if (receivedMessage.content.startsWith(",")) {
        processCommand(receivedMessage)
    }

    if (receivedMessage.content.startsWith("meo")) {
        receivedMessage.reply("meo meo :3")
    }

});

function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments) // There may not be any arguments

    switch (primaryCommand) {
        case "help":
            helpCommand(arguments, receivedMessage);
            break;
        case "multiply":
            multiplyCommand(arguments, receivedMessage);
            break;
        case "masoi":
            werewolfCommand(arguments, receivedMessage);
            break;
        case "masoisetup":
            werewolfSetupCommand(arguments, receivedMessage);
        break;
        default:
            receivedMessage.channel.send("Lệnh không hợp lệ. Thử `,help` để xem chi tiết các lệnh!")
    }
}

function helpCommand(arguments, receivedMessage) {
    if (arguments.length > 0) {
        receivedMessage.channel.send("It looks like you might need help with " + arguments)
    } else {
        receivedMessage.channel.send("I'm not sure what you need help with. Try `,help [topic]`")
    }
}

function multiplyCommand(arguments, receivedMessage) {
    if (arguments.length < 2) {
        receivedMessage.channel.send("Not enough values to multiply. Try `,multiply 2 4 10` or `,multiply 5.2 7`")
        return
    }
    let product = 1 
    arguments.forEach((value) => {
        product = product * parseFloat(value)
    })
    receivedMessage.channel.send("The product of " + arguments + " multiplied together is: " + product.toString())
}

function werewolfSetupCommand(arguments, receivedMessage) {
    userId = arguments[0];
    user = client.users.get(userId);
    let roleMutedId = 550268015350906891;
    let roleQuanTroMaSoiId = 556208263042039808;
    channelId = arguments[1];
    channelRole = client.channels.get(channelId);
    /*channelRole.replacePermissionOverwrites({
    overwrites: [
    //deny everyone to read messages
      {
         id: guild.id,
         deny: ['READ_MESSAGES'],
      },
    //deny muted to send messages
      {
         id: roleMutedId,
         deny: ['SEND_MESSAGES'],
         deny: ['ADD_REACTIONS'],
      },
    //allow role to read messages
      {
         id: roleQuanTroMaSoiId,
         allow: ['MANAGE_MESSAGES'],
         allow: ['READ_MESSAGES'],
         allow: ['READ_MESSAGES'],
      },
    //allow role to read messages
      {
         id: userId,
         allow: ['READ_MESSAGES'],
      },
    ],
      reason: 'Grant permission.'
    });*/
    // Overwrite permissions for a message author
    channelRole.overwritePermissions(user, {
      READ_MESSAGES: true
    })
      .then(updated => console.log(updated.permissionOverwrites.get(userId)))
      .catch(console.error);

    receivedMessage.send(`User: ${user.username}, Channel: ${channelRole.name}`);
}

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);



