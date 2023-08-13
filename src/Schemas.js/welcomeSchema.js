const { model, Schema } = require('mongoose');

let welcomeSchema = new Schema({
    Guild: String,
    Channel: String,
});

module.exports = model('welcomeSchema', welcomeSchema)