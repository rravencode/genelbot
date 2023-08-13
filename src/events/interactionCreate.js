const { Interaction } = require("discord.js");
const { mongoose } = require("mongoose")

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) return
        
        try{

            const blacklist = require('../Schemas.js/blacklistSchema');
            const data = await blacklist.findOne({ User: interaction.user.id });
     
            if(data) return await interaction.reply({ content: `You have been **blacklisted** from using this bot! This means the developer doesn't want you to use it's commands for any given reason`, ephemeral: true })
    

            await command.execute(interaction, client);
        } catch (error) {
            console.log(error);
            await interaction.reply({
                content: 'There was an error while executing this command!', 
                ephemeral: true
            });
        } 

    },

    
    


};