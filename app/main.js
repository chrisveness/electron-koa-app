/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/* main.js; adapted from electron.atom.io/docs/tutorial/quick-start with mods to run Koa.js app   */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
 
const { app, BrowserWindow } = require('electron'); // www.npmjs.com/package/electron
const spawn = require('child_process').spawn;       // nodejs.org/api/child_process.html
const path = require('path');                       // nodejs.org/api/path.html

if (handleSquirrelCommand()) return; // squirrel event handled, app will exit in 1000ms

let win = null; // keep global reference to window object to avoid automatic closing on JS GC

const shouldQuit = app.makeSingleInstance(function(otherInstArgv, otherInstWorkingDir) {
    // someone tried to run a second instance, we should focus our window
    if (win != null) {
        if (win.isMinimized()) win.restore();
        win.focus();
    }
});

if (shouldQuit) app.quit();
    
function createWindow() {
    console.log('createWindow');
    app.server = require('./app.js');                     // instantiate Koa app
    win = new BrowserWindow({ width: 800, height: 600 }); // create browser window
    win.loadURL('http://localhost:3000');                 // load koa-app home page
    win.on('closed', () => { win = null; });              // dereference window object
}

app.on('ready', createWindow); // create window after Electron initialisation complete

app.on('window-all-closed', () => {               // quit when all windows are closed
    if (process.platform != 'darwin') app.quit(); // (except leave MacOS app active until Cmd+Q)
});

app.on('activate', () => { // re-recreate window when dock icon is clicked and no other windows open
    if (win == null) createWindow();                     
});


// qv www.npmjs.com/package/electron-windows-installer
function handleSquirrelCommand() {
    if (process.platform != 'win32') return false; // only applies to Windows (win32 is both 32- & 64-bit)

    const command = process.argv[1];
    const target = path.basename(process.execPath);
    
    switch (command) {
        case '--squirrel-install':
        case '--squirrel-updated':
            update(['--createShortcut=' + target + ''], app.quit);
            return true;
        case '--squirrel-uninstall':
            update(['--removeShortcut=' + target + ''], app.quit);
            return true;
        case '--squirrel-obsolete':
            app.quit();
            return true;
    }

    return false;
}

function update(args, done) {
    const updateExe = path.resolve(path.dirname(process.execPath), '..', 'Update.exe');
    spawn(updateExe, args, { detached: true }).on('close', done);
}
