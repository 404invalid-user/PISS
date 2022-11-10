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
    if (!req.cookies.id || !req.cookies.token) return next()
    const currentUser = await db.cache.lookup('user', req.cookies.id).catch((e) => {});
    if (currentUser == null) return next();
    const currentToken = currentUser.tokens.filter(t => t.token == req.cookies.token)[0];
    if (!currentToken) return next();
    currentToken.lastUsed = Date.now();
    currentToken.uses++;
    currentUser.save();
    req.user = await currentUser;
    return next()
});

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