const { Schema, model } = require('mongoose');

const str = { type: String, required: true }
const bol = { type: Boolean, required: true, default: false }

const userSchema = new Schema({
    id: str,
    discordid: {
        type: String,
        required: true,
        default: '0000'
    },
    username: str,
    email: str,
    password: str,
    admin: bol,
    createdDate: {
        type: String,
        required: true,
        default: Date.now().toString()
    }
}, {
    versionKey: false
})

module.exports = model('user', userSchema);