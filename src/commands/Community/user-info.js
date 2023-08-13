const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user-info')   
        .setDescription(`Find information about a user in the guild`)
        .setDMPermission(false)
        .addUserOption(option => option 
            .setName('user')
            .setDescription(`The user you want to get information about`)
            .setRequired(false)
        ),
        async execute(interaction) {
            try {

                const badges = {
                    BugHunterLevel1: 'Bug Hunter Level1',
                    BugHunterLevel2: 'Bug Hunter Level2',
                    Partner: 'Partner',
                    PremiumEarlySupporter: 'Erken Destekçi',
                    Staff: 'Moderatör',
                    VerifiedDeveloper: 'Onaylanmış Geliştirici',
                    ActiveDeveloper: 'Aktif Geliştirici',
                };
    
                const user = interaction.options.getUser('user') || interaction.user;
                const member = await interaction.guild.members.fetch(user.id);
                const userAvatar = user.displayAvatarURL({ size: 32 });
                const userBadges = user.flags.toArray().map(badge => badges[badge]).join(' ') || 'None';
                const nick = member.displayName || 'None';
                const botStatus = user.bot ? 'Evet' : 'Hayır';
    
                const embed = new EmbedBuilder()
                    .setTitle(`${user.username}'s Information`) 
                    .setColor('Red')
                    .setThumbnail(userAvatar)
                    .setTimestamp()
                    .setFooter({ text: `User ID: ${user.id}` })
                    .addFields({
                        name: '📥 Discorda Katıldığı Zaman',
                        value: `<t:${Math.floor(user.createdAt.getTime() / 1000)}:R>`,
                        inline: true,
                    })
                    .addFields({
                        name: '📥 Sunucuya Katıldığı Zaman',
                        value: `<t:${Math.floor(member.joinedAt.getTime() / 1000)}:R>`,
                        inline: true,
                    })
                    .addFields({
                        name: 'Kullanıcı Adı:',
                        value: nick,
                        inline: false,
                    })
                    .addFields({
                        name: 'Boost Bastığı Server Var mı?',
                        value: member.premiumSince ? 'Evet' : 'Hayır',
                        inline: false,
                    })
                    .addFields({ 
                        name: 'Bot mu?',
                        value: botStatus,
                        inline: false,
                    })
                    .addFields({ 
                        name: 'Rozetler',
                        value: userBadges,
                        inline: false,
                    })
    
                await interaction.reply({ embeds: [embed], ephemeral: false });
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'An error occurred while executing the command.', ephemeral: true });
            }
        },
};