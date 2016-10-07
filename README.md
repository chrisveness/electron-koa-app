Electron Koa App
================

Minimal example of running a [Koa](http://koajs.com/) app from within 
[Electron](http://electron.atom.io/), for creating multi-platform distributable executables.

The Koa app is trivially simple (just a single page, using koa-router and koa-handlebars to ensure 
such basic architecture works). Replace the *app* with your own! (Note using NAN – native 
abstractions – will probably make life harder).

Setup
-----

    git clone https://github.com/chrisveness/electron-koa-app.git
    cd electron-koa-app
    npm install

To run the app in browser
-------------------------

    cd app
    npm run start-dev

and open `localhost:3000` in your browser.

To run the app in Electron
--------------------------

    npm start

To build a stand-alone Windows executable
-----------------------------------------

    npm run build -- --win --x64

which generates a setup file in the `dist\win` directory (only tested on Windows for Windows).

Thx to [JDM](http://github.com/theallmightyjohnmanning/electron-express), 
[eriedl](https://github.com/electron-userland/electron-builder/issues/796#issuecomment-252152108), 
[electron-builder](https://github.com/electron-userland/electron-builder).

Koa and Electron are still both rather moving targets. This was developed with Koa v1.2.4 and 
Electron v1.4.2, electron-builder v7.10.2.
