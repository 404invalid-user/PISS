const { Schema, model } = require('mongoose');

const str = { type: String, required: true }
const bol = { type: Boolean, required: true, default: false }

const userSchema = new Schema({
    id: str,
    userid: str,
    path: str,
    uploadSession: str,
    icon: bol,
    fileType: str,
    createdDate: {
        type: String,
        required: true,
        default: Date.now().toString()
    }
}, {
    versionKey: false
})

module.exports = model('file', userSchema);