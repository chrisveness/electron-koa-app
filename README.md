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
    npm start

and open `localhost:3001` in your browser.

To run the app in Electron
--------------------------

    npm start

To build a stand-alone executable
-------------------------------

    npm run dist --win --x64

(in theory: I have still to make this work... PRs welcome...)

Thx to [JDM](http://github.com/theallmightyjohnmanning/electron-express), 
[electron-builder](https://github.com/electron-userland/electron-builder).

Koa and Electron are still both rather moving targets. This was developed with Koa v1.2.4 and 
Electron v1.4.1.
