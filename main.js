/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/* main.js; adapted from electron.atom.io/docs/tutorial/quick-start with mods to run Koa.js app   */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
 
const { app, BrowserWindow } = require('electron');

let win = null; // keep global reference to window object to avoid automatic closing on JS GC

function createWindow() {
    console.log('createWindow');
    app.server = require('./app/app.js');                  // instantiate Koa app
    win = new BrowserWindow({ width: 1024, height: 768 }); // create browser window
    win.loadURL('http://localhost:3001');                  // load koa-app home page
    win.on('closed', () => { win = null; });               // dereference window object
}

app.on('ready', createWindow); // create window after Electron initialisation complete

app.on('window-all-closed', () => {               // quit when all windows are closed
    if (process.platform != 'darwin') app.quit(); // (except leave MacOS app active until Cmd+Q)
});

app.on('activate', () => { // re-recreate window when dock icon is clicked and no other windows open
    if (win == null) createWindow();                     
});
