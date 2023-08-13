const { EmbedBuilder } = require('discord.js');
const welcomeSchema = require('../Schemas.js/welcomeSchema');

const welcomeMessages = [
    `Sunucumuza Katıldı`,
]

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        const guildId = member.guild.id;

        welcomeSchema.findOne({ Guild: guildId }, (err, data) => {
            if (data) {
                const channelId = data.Channel;
                const channel = member.guild.channels.cache.get(channelId);

                if (channel) {
                    const memberUsername = member.user.username;
                    const memberThumbnail = member.user.displayAvatarURL({ size: 128 });

                    const randomMessageIndex = Math.floor(Math.random() * welcomeMessages.length);
                    const randomMessage = welcomeMessages[randomMessageIndex];

                    const userEmbed = new EmbedBuilder()
                        .setTitle(`${memberUsername}`)
                        .setDescription(`${randomMessage    }\n\n  `)
                        .setImage(memberThumbnail)
                        .setTimestamp()
                        .setFooter({ text: `Hoşgeldin `})

                    channel.send({
                        embeds: [userEmbed]
                    });
                }
            }
        });
    },
};