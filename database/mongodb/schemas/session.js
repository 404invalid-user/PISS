const { Schema, model } = require('mongoose');

const str = { type: String, required: true }
const bol = { type: Boolean, required: true, default: false }

const userSchema = new Schema({
    id: str,
    userid: str,
    token: str,
    ip: str,
    location: str,
    deviceType: str,
    active: bol,
    icon: bol,
    createdDate: {
        type: String,
        required: true,
        default: Date.now().toString()
    },
    lastUsed: {
        type: String,
        required: true,
        default: Date.now().toString()
    }
}, {
    versionKey: false
})

module.exports = model('session', userSchema);