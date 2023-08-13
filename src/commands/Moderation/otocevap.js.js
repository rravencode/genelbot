const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
const schema = require('../../Schemas.js/autoresponder');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('autoresponse-add')
    .setDescription("Add an autoresponse")
    .addStringOption(opt => opt.setName('trigger').setDescription("What triggers the autoresponse").setRequired(true))
    .addStringOption(opt => opt.setName('response').setDescription("What the bot responds with").setRequired(true))
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

    async execute (interaction, client) {
        const trigger = interaction.options.getString('trigger');
        const response = interaction.options.getString('response');

        const data = await schema.findOne({ guildId: interaction.guild.id })
        if (!data) {
            await schema.create({
                guildId: interaction.guild.id,
                autoresponses: [{
                    trigger: trigger,
                    response: response
                }]
            })

            const embed = new EmbedBuilder()
            .setColor('Orange')
            .setTitle("Autoresponse created")
            .setDescription(`**Trigger:**\n${trigger}\n\n**Response:**\n${response}`)

            await interaction.reply({ embeds: [embed] })
        } else {
            const autoresponders = data.autoresponses
            for (const t of autoresponders) {
                if (t.trigger === trigger) return await interaction.reply({ content: "You must have unique triggers!", ephemeral: true })
            }
            const addto = {
                trigger: trigger,
                response: response
            }
            await schema.findOneAndUpdate({ guildId: interaction.guild.id}, { $push: { autoresponses: addto } })

            const embed = new EmbedBuilder()
            .setColor('Orange')
            .setTitle("Autoresponse created")
            .setDescription(`**Trigger:**\n${trigger}\n\n**Response:**\n${response}`)

            await interaction.reply({ embeds: [embed] })
        }
    }
}