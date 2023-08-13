const { SlashCommandBuilder, ChannelType, EmbedBuilder, PermissionsBitField } = require("discord.js");
const notifySchema = require("../../Schemas.js/notifySchema");
const Parser = require("rss-parser");
const { author } = require("canvacord");
const parser = new Parser();
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName("youtube-notifier")
    .setDescription("Configure your youtube notif system")
    .addSubcommand(command => command.setName("add").setDescription("Set up the yt notif system").addStringOption(option => option.setName("channel-id").setDescription("The ID of your YouTube Channel").setRequired(true)).addChannelOption(option => option.setName("channel").setDescription("The channel to send the notif in").setRequired(true).addChannelTypes(ChannelType.GuildAnnouncement, ChannelType.GuildText)).addStringOption(option => option.setName("message").setDescription("A custom message for your notification. Use {author}, {link}, and {title}").setRequired(false)).addRoleOption(option => option.setName("role").setDescription("The role you want to be pinged").setRequired(false)))
    .addSubcommand(command => command.setName("remove").setDescription("Remove a channel from the YT Notif System").addStringOption(option => option.setName("channel-id").setDescription("The ID of the youtube channel you want t remove").setRequired(true))),
    async execute (interaction) {
 
        const {options} = interaction;
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: "You cant setup the YT Notify system!", ephemeral: true});
 
        const sub = options.getSubcommand();
        const data = await notifySchema.find({ Guild: interaction.guild.id});
 
        switch (sub) {
            case 'add':
 
            if (data.length) {
                if (data.length >= 5) {
                    return await interaction.reply({ content: "You can only have 5 notification setups at once!", ephemeral: true});
                }
            }
 
            const ID = options.getString("channel-id");
            const channel = options.getChannel("channel");
            const pingrole = options.getRole("role");
            const message = options.getString("message");
 
            let role = 'non';
 
            if (pingrole) {
                role = pingrole.id;
            }
 
            let checkdata = await notifySchema.findOne({ Guild: interaction.guild.id, ID: ID});
            if (checkdata) {
                await interaction.deferReply({ ephemeral: true});
 
                let author = ' ';
 
                const videodata = await parser.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${ID}`);
                if (videodata) {
                    author = videodata.items[0].author;
                } else {
                    author = "Unknown";
                }
 
                return await interaction.editReply({ content: `You already have a YT notif setup for **${author}**`, ephemeral: true});
            } else {
                await interaction.deferReply({ ephemeral: true });
            }
 
            try {
 
                const videodata = await parser.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${ID}`);
 
                let author = '';
 
                if (videodata) {
                    author = videodata.items[0].author;
                } else {
                    author = "Unknown";
                }
 
                const embed = new EmbedBuilder()
                .setTitle("YouTube Notifications Enabled!")
                .setColor("Green")
                .addFields(
                    {name: "Channel:", value: `**${author}**`},
                    {name: "Notify Channel:", value: `**${channel}**`}
                )
                .setDescription(`From now on, when a video is uploaded on that YT Channel, it will be sent in <#${channel.id}>`)
 
                if (pingrole) {
                    embed.addFields({ name: "Ping Role", value: `${pingrole}`});
                }
 
                if (message) {
                    embed.addFields(
                        {name: "Message", value: `${message.replace('{author}', author).replace('{link}', 'youtube.com').replace('{title}', "your title")}`});
                }
 
                await interaction.editReply({ embeds: [embed], ephemeral: true });
            } catch {
                return await interaction.reply({ content: `The channel with the ID of ${ID} does not exist!`, ephemeral: true});
            }
 
            await notifySchema.create({
                Guild: interaction.guild.id,
                Channel: interaction.channel.id,
                ID: ID,
                Latest: 'none',
                Message: message || ' ',
                PingRole: role || ' ',
            });
 
            break;
            case 'remove':
 
            if (!data) return await interaction.reply({ content: "I cant find an existing setup here yet!", ephemeral: true});
            else {
 
                const ID = options.getString("channel-id");
                if (!checkdata) return await interaction.reply({ content: 'That YouTube Notifier does not exist here!', ephemeral: true});
 
                const embed = new EmbedBuilder()
                .setColor("Red")
                .setDescription(`⚠️ Your YT notif system has been removed for the creator ${ID}!`)
 
                await interaction.reply({ embeds: [embed], ephemeral: true });
                await notifySchema.deleteMany({ Guild: interaction.guild.id, ID: ID});
            }
        }
    }
}