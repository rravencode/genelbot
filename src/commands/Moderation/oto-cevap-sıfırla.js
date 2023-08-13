const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
const schema = require('../../Schemas.js/autoresponder');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('autoresponse-remove')
    .setDescription("Remove an autoresponse")
    .addStringOption(opt => opt.setName('trigger').setDescription("Remove the autoresponse by its trigger").setRequired(true))
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

    async execute (interaction) {
        const data = await schema.findOne({ 'guildId': interaction.guild.id, 'autoresponses.trigger': interaction.options.getString('trigger') });
        if (!data) {
            const embed = new EmbedBuilder()
            .setColor('Orange')
            .setDescription("I couldn't find an autoresponse with that trigger")
            await interaction.reply({ embeds: [embed] })
        } else {
            await schema.findOneAndDelete({ 'guildId': interaction.guild.id })
            const embed = new EmbedBuilder()
            .setColor('Orange')
            .setDescription(`Deleted that autoresponse!\n\n**Trigger:**\n${interaction.options.getString('trigger')}`)
            await interaction.reply({ embeds: [embed] })
        }
    }
}