const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection } = require(`discord.js`);
const fs = require('fs');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildVoiceStates] });
const mongoose = require('mongoose') 
const GiveawaysManager = require("./utils/giveaway");
const { DisTube } = require("distube")
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { SpotifyPlugin } = require("@distube/spotify")
const { DeezerPlugin } = require("@distube/deezer")
const {ActionRowBuilder} = require("discord.js")
const {ButtonBuilder} = require("discord.js")
const {ButtonStyle} = require("discord.js")


const Logs = require('discord-logs')
const process = require('node:process');
 
process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});
 
process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception:", err);
});
 
Logs(client, {
    debug: true
})
 


client.commands = new Collection();

require('dotenv').config();

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");

client.giveawayManager = new GiveawaysManager(client, {
    default: {
      botsCanWin: false,
      embedColor: "#a200ff",
      embedColorEnd: "#550485",
      reaction: "🎉",
    },
});


(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFolders, "./src/commands");
    client.login(process.env.token).then(() => {

    })
})();



const schema = require('./Schemas.js/autoresponder');
client.on('messageCreate', async (message) => {
    const data = await schema.findOne({ guildId: message.guild.id });
    if (!data) return;
    if (message.author.bot) return;

    const msg = message.content

    for (const d of data.autoresponses) {
        const trigger = d.trigger
        const response = d.response
        
        if (msg === trigger) {
            message.reply(response)
            break;
        }
    }
})

 
 
