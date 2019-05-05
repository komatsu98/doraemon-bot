const Discord = require('discord.js');

const client = new Discord.Client();

 

client.on('ready', () => {

    console.log('I am ready!');

    client.user.setActivity("meo meo", {type: "LISTENING"});
    
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
    let userId = arguments[0];
    let channelId = arguments[1];
    let channel = client.get(channelId);
    channel.replacePermissionOverwrites({
    overwrites: [
      {
         id: userId,
         allow: ['READ_MESSAGES'],
      },
    ],
      reason: 'Grant permission.'
    });

}

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);



