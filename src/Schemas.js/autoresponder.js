const { model, Schema } = require('mongoose');

const schema = new Schema({
    guildId: String,
    autoresponses: [
        {
            trigger: String,
            response: String
        }
    ]
})

module.exports = model("name", schema);
