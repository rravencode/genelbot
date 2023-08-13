const mongoose = require('mongoose')
const mongodbURL = process.env.MONGOURL;

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log('Ready!');

        setInterval(client.checkUpdates, 30000)

        if (!mongodbURL) return;

        await mongoose.connect(mongodbURL || '',{
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
       
    })

    if (mongoose.connect) {
        console.log("MongoDB bağlantısı tamamlandı")
    }

        async function pickPresence () {
            const option = Math.floor(Math.random() * statusArray.length);

            try {
                await client.user.setPresence({
                    activities: [
                        {
                            name: statusArray[option].content,
                            type: statusArray[option].type,

                        },
                    
                    ],

                    status: statusArray[option].status
                })
            } catch (error) {
                console.error(error);
            }
        }
    },
};