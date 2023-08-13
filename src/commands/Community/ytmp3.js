const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const axios = require('axios')
module.exports = {
    data: new SlashCommandBuilder()
    .setName('ytmp3')
    .setDescription('Download MP3 versions of YT videos')
    .addStringOption(option => option.setName('video-id').setDescription('The ID of your video').setRequired(true)),
 
    async execute (interaction) {
        await interaction.deferReply({ ephemeral: true });
        
        const { options } = interaction;
        const vidId = options.getString('video-id');
 
        const input = {
            method: 'GET',
            url: 'https://youtube-mp3-download1.p.rapidapi.com/dl',
            params: {id: vidId},
            headers: {
                'X-RapidAPI-Key': 'APİ KEYİNİZ',
                'X-RapidAPI-Host': 'youtube-mp3-download1.p.rapidapi.com'
            }
        };
 
        try {
            const response = await axios.request(input);
            const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setLabel('📬 Download MP3')
                .setStyle(ButtonStyle.Link)
                .setURL(response.data.link)
            )
            const embed = new EmbedBuilder()
            .setColor('Blurple')
            .setDescription(`👉 Click below to get your MP3 version of \`${response.data.title}\``)
 
            await interaction.editReply({ embeds: [embed], components: [button] })
        } catch (err) {
            console.log(err)
            await interaction.editReply({ content: '👉 That video ID does not exist! Go to the youtube link, and copy the ID after the = sign or the /' })
        }
    }
    
}