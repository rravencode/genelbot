const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const welcomeSchema = require('../../Schemas.js/welcomeSchema');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('welcome-disable')
        .setDescription('Disable the welcome message system.')
        .setDMPermission(false),
    async execute(interaction) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels))
            return await interaction.reply({
                content: 'The Welcome Message system cannot be disabled because you do not have the necessary permissions to do so.',
                ephemeral: true
            });

            welcomeSchema.deleteMany({ Guild: interaction.guild.id }, async (err, data) => {
            await interaction.reply({
                content: 'The Welcome Message System has been successfully disabled.',
                ephemeral: true
            });
        });
    }
};