const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Fetch another users avatar.')
    .addUserOption((option) => 
    option.setName('user')
    .setDescription('User of the avatar you want to get')
    .setRequired(true)
    ),

    async execute(interaction) {
        const { channel, client, options, member } = interaction;
         const user = interaction.options.getUser('user') || interaction.user;
   let jpgAvatar = user.displayAvatarURL({ size: 1024, extension: 'jpg'});
    let pngAvatar = user.displayAvatarURL({ size: 1024, extension: 'png'});

        const embed = new EmbedBuilder()
        .setColor('#1bfcbe')
         .setAuthor({ name: `${user.tag}`, iconURL: `${user.displayAvatarURL()}`})
        .setDescription(`[**PNG**](${pngAvatar}) | [**JPG**](${jpgAvatar})`)
        .setImage(`${jpgAvatar}`)
        .setImage(`${pngAvatar}`)
        .setFooter({ text: `Requested by ${member.user.tag}`, iconURL: `${user.displayAvatarURL()}`});
      
 const row = new ActionRowBuilder()
        await interaction.reply({
            embeds: [embed],
        });
    },
};

