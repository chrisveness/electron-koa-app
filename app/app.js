/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/* app.js; minimal 'hello world' app (using router & handlebars)                                  */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

const koa        = require('koa');            // koa framework
const router     = require('koa-router')();   // router middleware for koa
const handlebars = require('koa-handlebars'); // handlebars templating

const app = koa();

app.use(handlebars({
    extension:   [ 'html', 'hbs', 'handlebars' ],
    root:        __dirname, // required for running app from electron build directory
    viewsDir:    '/',
}));

router.get('/', function*() {
    const context = { version: process.version, env: app.env, time: new Date() };
    console.log('router.get /', context);
    yield this.render('hello-world.html', context);
});

app.use(router.routes());

app.listen(3000);                      // note: don't use "if (!module.parent)"!
console.log('listening on port 3000');
