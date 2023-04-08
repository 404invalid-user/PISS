require('dotenv').config();
process.env = require('./config.json');
const express = require('express');
const app = express();
const logger = require('./process-log');
const port = parseFloat(process.argv[2]) || process.env.port;

const routes = {
    root: require('./router/root/index'),
    installer: require('./router/installer/index')
};

app.disable('x-powered-by');
app.set('trust proxy', true);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/www/`));
app.use((req, res, next) => {
    const { headers: { cookie } } = req;
    if (cookie) {
        const values = cookie.split(';').reduce((res, item) => {
            const data = item.trim().split('=');
            return {...res, [data[0]]: data[1] };
        }, {})
        req.cookies = values;
    } else req.cookies = {}
    next();
});
app.use(async (req, res, next) => {
    req.user = null;
    let userid;
    let token;

    //get id from available auth methods 
    if (req.cookies.id && req.cookies.token) {
        userid = req.cookies.id;
        token = req.cookies.token;
    } else if (req.headers.authorization && req.headers.authorization.split(' ').length >=2) {
        userid = req.headers.authorization.split(' ')[0];
        token =req.headers.authorization.split(' ')[1];
    } else if (req.body.auth.id && req.body.auth.token) {
        userid = req.body.auth.id;
        token = req.body.auth.token;
    } else {
        req.user = {
            authError: "no valid id and token provided"
        }
        return next();
    }

    //get session
    let currentSession;
    try {
        currentSession = await db.getSession(userid, token);
    } catch(e) {
        logger.error(e.stack || e);
        req.user = {
            authError: "could not get session from database"
        }
        return next();
    }
    if (currentSession === null || currentSession === undefined || currentSession === '') {
        req.user = {
            authError: "invalid or no session"
        }
        return next();
    }

    //get user
    let currentUser;
    try {
        currentUser = await db.getUser(userid);
    } catch(e) {
        logger.error(e.stack || e);
        req.user = {
            authError: "could not get user from database"
        }
        return next();
    }

    if (currentUser === null || currentUser === undefined || currentUser === '') {
        logger.warn("user session was found for user " + userid + " but could not locate user");
        req.user = {
            authError: "could not get a user from session"
        }
        return next();
    }

    //update sesion last use time stamp
    currentSession.lastused = Date.now().toString();
    currentSession.save();

    req.user = currentUser;
    req.user['session'] = currentSession;
    return next()
});

//apply routes 

app.use('/', routes.root);
app.use('/:image', routes.root);
//app.use('/api', apiRouter);




app.listen(port, () => {
    console.log("Ready!");
    logger.success("now running on port " + port);
    //make this false 
    if (process.env.firstStart == true) {
        process.env.firstStart = false;
        require('fs').writeFileSync('./config.json', JSON.stringify(process.env.firstStart, null, 2));
    } 
})