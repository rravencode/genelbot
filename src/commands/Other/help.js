const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
 
module.exports = {
data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('this is the help command'),
async execute(interaction, client) {
 
    const embed = new EmbedBuilder()
    .setColor('Green')
    .setTitle('Help Center')
    .setDescription('Help Command Guide')
    .addFields({ name: "Ana sayfa", value: "Ana sayfa"})
    .addFields({ name: "Kullanıcı", value: "Kullanıcı Komutları"})
    .addFields({ name: "Moderasyon", value: "Moderation Komutları"})
    .addFields({ name: "Diğer", value: "Diğer komutlar"})
 
    const embed2 = new EmbedBuilder()
    .setColor('Green')
    .setTitle('Community Commands')
    .addFields({ name: "/avatar", value: "Kullanıcının avatarını gösterir"})
    .addFields({ name: "/sever-info", value: "Sunucu bilgilerine bakarsınız"})
    .addFields({ name: "/translate", value: "Mesaj çevirirsiniz"})
    .addFields({ name: "/user-info", value: "Kullanıcı bilgi görüntülersiniz"})
    .addFields({ name: "/ytmp3", value: "Youtube videoyu mp3'e çevirir"})

    .setFooter({ text: "Community Commands"})
    .setTimestamp()
 
    const embed3 = new EmbedBuilder()
    .setColor('Green')
    .setTitle('Moderasyon Komutları')
    .addFields({ name: "/ban", value: "Bir kullanıcıyı banlarsınız"})
    .addFields({ name: "/blacklist", value: "Bir kullanıcıyı blackliste alırsınız"})
    .addFields({ name: "/giveaway", value: "Çekiliş yaparsınız"})
    .addFields({ name: "/role all", value: "Herkese belirttiğiniz bir rolü verir"})
    .addFields({ name: "/auto-response", value: "İstediğiniz mesaja istediğiniz cevabı verdirirsiniz"})
    .addFields({ name: "/unban", value: "Bir kullanıcının banını açarsınız"})
    .addFields({ name: "/welcome-setup", value: "Hoşgeldin mesajı kurarsınız"})
    .addFields({ name: "/welcome-remove", value: "Hoşgeldin mesajını kapatırsınız"})

    .setFooter({ text: "Community Commands"})
    .setTimestamp()

    const embed4 = new EmbedBuilder()
    .setColor('Green')
    .setTitle('Diğer Komutlar')
    .addFields({ name: "/help", value: "Yardım menüsüne bakarsınız"})
    .addFields({ name: "/image", value: "Yapay zeka ile fotoğraf oluşturursunuz"})

    .setFooter({ text: "Community Commands"})
    .setTimestamp()


 
    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
        .setCustomId('page1')
        .setLabel('Ana Sayfa')
        .setStyle(ButtonStyle.Success),
 
        new ButtonBuilder()
        .setCustomId('page2')
        .setLabel('Moderasyon')
        .setStyle(ButtonStyle.Success),
 
        new ButtonBuilder()
        .setCustomId('page3')
        .setLabel('Kullanıcı')
        .setStyle(ButtonStyle.Success),

        new ButtonBuilder()
        .setCustomId('page4')
        .setLabel('Diğer')
        .setStyle(ButtonStyle.Success),
    )
 
        const message = await interaction.reply({ embeds: [embed], components: [button] })
        const collector = await message.createMessageComponentCollector();
 
        collector.on("collect", async i => {
 
            if (i.customId === "page1") {
 
                if (i.user.id !== interaction.member.id) {
                    return interaction.reply({ content: `only ${interaction.user.tag} can use these buttons`, ephemeral: true})
                }
                await i.update({ embeds: [embed], components: [button] })
            }
            if (i.customId === "page2") {
 
                if (i.user.id !== interaction.member.id) {
                    return interaction.reply({ content: `only ${interaction.user.tag} can use these buttons`, ephemeral: true})
                }
                await i.update({ embeds: [embed2], components: [button] })
            }
            if (i.customId === "page3") {
 
                if (i.user.id !== interaction.member.id) {
                    return interaction.reply({ content: `only ${interaction.user.tag} can use these buttons`, ephemeral: true})
                }
                await i.update({ embeds: [embed3], components: [button] })

                if (i.customId === "page4") {
 
                    if (i.user.id !== interaction.member.id) {
                        return interaction.reply({ content: `only ${interaction.user.tag} can use these buttons`, ephemeral: true})
                    }
                    await i.update({ embeds: [embed4], components: [button] })
                }
            }
        })
 
    }
};
