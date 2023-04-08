const db = require('../../../database/index');
const processlog = require('../../../utils/process-log');

module.exports.post = async(req, res) => {
    if (process.env.signups == false) return res.status(403).json({ error: 403, message: "signups have been disabled" });
    if (!req.body.username || req.body.username == " " || req.body.username.lenght <= 3 || !req.body.email || req.body.email == " " || req.body.username.email <= 3 || !req.body.password || req.body.password == " " || req.body.username.password <= 3 || !req.body.passwordv || req.body.passwordv == " " || req.body.username.passwordv <= 3) {
        return res.status(400).json({ error: 400, message: "please fill in all fealds" });
    }

    const usernameValid = validateUsername(req.body.username);
    if (usernameValid.startsWith('Error:')) return res.status(400).json({ error: 400, message: usernameValid.replace("Error:") });

    const emailValid = validateEmail(req.body.email);
    if (emailValid.startsWith('Error:')) return res.status(400).json({ error: 400, message: emailValid.replace("Error:") });

    if (req.body.password != req.body.passwordv) return res.status(400).json({ error: 400, message: "your passwords do not match" });

    try {
        await db.create('User', null, data);
    } catch (error) {
        processlog.error(error.stack || error);
        return res.status(500).json({ error: 500, message: "failed to make your account please try again" });
    }


}


function validateUsername(username) {
    let formatCorrect = /^[A-Za-z0-9-_]*$/.test(username);

    if (formatCorrect == false) {
        return "Error: username must only have latter numbers - and _";
    }
    if (username.lenght < 3 || username.lenght > 30) {
        return "Error: username must be between 3 and 30 in lenght";
    }
    return true;
}

function validateEmail(email) {

    if (!email.includes('@') || email.includes('.')) {
        return "Error: please double check your email";
    }
    return true;
}