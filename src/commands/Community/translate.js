const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const translate = require('@iamtraction/google-translate');
 
module.exports = {
    data: new SlashCommandBuilder()
        .setName('translate')
        .setDescription('Translate your messages to a different languages')
        .addStringOption(
            option => option
                .setName('text')
                .setDescription('message input')
                .setRequired(true)
        )
        .addStringOption(
            option => option
                .setName('from')
                .setDescription('choose a language to translate from')
                .setRequired(true)
                // .setAutocomplete(true)
                .setChoices(
                    { name: 'Automatic', value: 'auto' },
                    { name: 'Arabic', value: 'ar' },
                    { name: 'Chinese Simplified', value: 'zh-cn' },
                    { name: 'Danish', value: 'da' },
                    { name: 'Dutch', value: 'nl' },
                    { name: 'English', value: 'en' },
                    { name: 'Filipino', value: 'tl' },
                    { name: 'French', value: 'fr' },
                    { name: 'German', value: 'de' },
                    { name: 'Greek', value: 'el' },
                    { name: 'Italian', value: 'it' },
                    { name: 'Japanese', value: 'ja' },
                    { name: 'Polish', value: 'pl' },
                    { name: 'Russian', value: 'ru' },
                    { name: 'Spanish', value: 'es' },
                    { name: 'Swedish', value: 'sv' },
                )
        )
        .addStringOption(
            option => option
                .setName('to')
                .setDescription('choose a language to translate too')
                .setRequired(true)
                // .setAutocomplete(true)
                .setChoices(
                    { name: 'Automatic', value: 'auto' },
                    { name: 'Arabic', value: 'ar' },
                    { name: 'Chinese Simplified', value: 'zh-cn' },
                    { name: 'Danish', value: 'da' },
                    { name: 'Dutch', value: 'nl' },
                    { name: 'English', value: 'en' },
                    { name: 'Filipino', value: 'tl' },
                    { name: 'French', value: 'fr' },
                    { name: 'German', value: 'de' },
                    { name: 'Greek', value: 'el' },
                    { name: 'Italian', value: 'it' },
                    { name: 'Japanese', value: 'ja' },
                    { name: 'Polish', value: 'pl' },
                    { name: 'Russian', value: 'ru' },
                    { name: 'Spanish', value: 'es' },
                    { name: 'Swedish', value: 'sv' },
                    { name: 'Turkish', value: 'tr' },
                )
        ),
    category: 'Text',
    cooldown: 5000,
    // async autocomplete(interaction) {
    //     async function lang() {
    //         [
    //             { name: 'Automatic', value: 'auto' },
    //             { name: 'Afrikaans', value: 'af' },
    //             { name: 'Albanian', value: 'sq' },
    //             { name: 'Amharic', value: 'am' },
    //             { name: 'Arabic', value: 'ar' },
    //             { name: 'Armenian', value: 'hy' },
    //             { name: 'Azerbaijani', value: 'az' },
    //             { name: 'Basque', value: 'eu' },
    //             { name: 'Belarusian', value: 'be' },
    //             { name: 'Bengali', value: 'bn' },
    //             { name: 'Bosnian', value: 'bs' },
    //             { name: 'Bulgarian', value: 'bg' },
    //             { name: 'Catalan', value: 'ca' },
    //             { name: 'Cebuano', value: 'ceb' },
    //             { name: 'Chichewa', value: 'ny' },
    //             { name: 'Chinese Simplified', value: 'zh-cn' },
    //             { name: 'Chinese Traditional', value: 'zh-tw' },
    //             { name: 'Corsican', value: 'co' },
    //             { name: 'Croatian', value: 'hr' },
    //             { name: 'Czech', value: 'cs' },
    //             { name: 'Danish', value: 'da' },
    //             { name: 'Dutch', value: 'nl' },
    //             { name: 'English', value: 'en' },
    //             { name: 'Esperanto', value: 'eo' },
    //             { name: 'Estonian', value: 'et' },
    //             { name: 'Filipino', value: 'tl' },
    //             { name: 'Finnish', value: 'fi' },
    //             { name: 'French', value: 'fr' },
    //             { name: 'Frisian', value: 'fy' },
    //             { name: 'Galician', value: 'gl' },
    //             { name: 'Georgian', value: 'ka' },
    //             { name: 'German', value: 'de' },
    //             { name: 'Greek', value: 'el' },
    //             { name: 'Gujarati', value: 'gu' },
    //             { name: 'Haitian', value: 'ht' },
    //             { name: 'Hausa', value: 'he' },
    //             { name: 'Hawaiian', value: 'haw' },
    //             { name: 'Hebrew', value: 'iw' },
    //             { name: 'Hindi', value: 'hi' },
    //             { name: 'Hmong', value: 'hmn' },
    //             { name: 'Hungarian', value: 'hu' },
    //             { name: 'Icelandic', value: 'is' },
    //             { name: 'Igbo', value: 'ig' },
    //             { name: 'Indonesian', value: 'id' },
    //             { name: 'Irish', value: 'ga' },
    //             { name: 'Italian', value: 'it' },
    //             { name: 'Japanese', value: 'ja' },
    //             { name: 'Javanese', value: 'jw' },
    //             { name: 'Kannada', value: 'kn' },
    //             { name: 'Kazakh', value: 'kk' },
    //             { name: 'Khmer', value: 'km' },
    //             { name: 'Korean', value: 'ko' },
    //             { name: 'Kurdish (Kurmanji)', value: 'ku' },
    //             { name: 'Kyrgyz', value: 'ky' },
    //             { name: 'Lao', value: 'lo' },
    //             { name: 'Latin', value: 'la' },
    //             { name: 'Latvian', value: 'lv' },
    //             { name: 'Lithuanian', value: 'lt' },
    //             { name: 'Luxembourgish', value: 'lb' },
    //             { name: 'Macedonian', value: 'mk' },
    //             { name: 'Malagasy', value: 'mg' },
    //             { name: 'Malay', value: 'ms' },
    //             { name: 'Malayalam', value: 'ml' },
    //             { name: 'Maltese', value: 'mt' },
    //             { name: 'Maori', value: 'mi' },
    //             { name: 'Marathi', value: 'mr' },
    //             { name: 'Mongolian', value: 'mn' },
    //             { name: 'Myanmar (Burmese)', value: 'my' },
    //             { name: 'Nepali', value: 'ne' },
    //             { name: 'Norwegian', value: 'no' },
    //             { name: 'Pashto', value: 'ps' },
    //             { name: 'Persian', value: 'fa' },
    //             { name: 'Polish', value: 'pl' },
    //             { name: 'Portuguese', value: 'pt' },
    //             { name: 'Punjabi', value: 'pa' },
    //             { name: 'Romanian', value: 'ro' },
    //             { name: 'Russian', value: 'ru' },
    //             { name: 'Samoan', value: 'sm' },
    //             { name: 'Scots Gaelic', value: 'gd' },
    //             { name: 'Serbian', value: 'sr' },
    //             { name: 'Sesotho', value: 'st' },
    //             { name: 'Shona', value: 'sn' },
    //             { name: 'Sindhi', value: 'sd' },
    //             { name: 'Sinhala', value: 'si' },
    //             { name: 'Slovak', value: 'sk' },
    //             { name: 'Slovenian', value: 'sl' },
    //             { name: 'Somali', value: 'so' },
    //             { name: 'Spanish', value: 'es' },
    //             { name: 'Sundanese', value: 'su' },
    //             { name: 'Swahili', value: 'sw' },
    //             { name: 'Swedish', value: 'sv' },
    //             { name: 'Tajik', value: 'tg' },
    //             { name: 'Tamil', value: 'ta' },
    //             { name: 'Telugu', value: 'te' },
    //             { name: 'Thai', value: 'th' },
    //             { name: 'Turkish', value: 'tr' },
    //             { name: 'Ukrainian', value: 'uk' },
    //             { name: 'Urdu', value: 'ur' },
    //             { name: 'Uzbek', value: 'uz' },
    //             { name: 'Vietnamese', value: 'vi' },
    //             { name: 'Welsh', value: 'cy' },
    //             { name: 'Xhosa', value: 'xh' },
    //             { name: 'Yiddish', value: 'yi' },
    //             { name: 'Yoruba', value: 'yo' },
    //             { name: 'Zulu', value: 'zu' }
    //         ];
    //     }
    //     let choices;
    //     const focusedOption = interaction.options.getFocused(true);
 
    // 	if (focusedOption.name === 'from') {
    // 		choices = lang()
    // 	}
 
    // 	if (focusedOption.name === 'to') {
    // 		choices = lang()
    // 	}
 
    // 	const filtered = choices.filter(choice => choice.startsWith(focusedOption.value));
    // 	await interaction.respond(
    // 		filtered.map(choice => ({ name: choice, value: choice })),
    // 	);
 
    // },
    async execute(interaction, client) {
        const msg = interaction.options.getString('text')
        const from = interaction.options.getString('from')
        const to = interaction.options.getString('to')
 
        const translated = await translate(msg, { from: from, to: to })
        const embed = new EmbedBuilder()
            .setTimestamp()
            .setTitle('Google Translate')
            .setFields(
                { name: 'Old Message', value: msg },
                { name: 'translated Message', value: translated.text }
            )
            .setColor(0x2b2d31)
        interaction.reply({ embeds: [embed] })
    }
}
