---
layout: default
title: Porting to Mobile Platforms
nav_order: 3
---

## How to set up Corodva for Boardhouse

Below are instructions for porting BoardhouseTS projects to mobile devices. iOS is specified, but the process should be similar for both Windows and Android platforms since Cordova supports both.

First you'll want to run:

```
cordova create path [id [name [config]]] [options]
```

Or follow the directions for creating a Cordova app [here](https://cordova.apache.org/docs/en/latest/guide/cli/index.html#create-the-app).

Since Boardhouse uses [three.js to load some external files](https://threejs.org/docs/#manual/en/introduction/How-to-run-things-locally), you'll want to add the [Cordova httpd plugin](https://github.com/floatinghotpot/cordova-httpd). I used [this fork](https://github.com/communico/cordova-httpd) as it was a few commits ahead of the original source code:

```
cordova plugin add https://github.com/floatinghotpot/cordova-httpd.git
```

If you are wondering why we will need an http server, it is so we can load the assets that use [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) such as textures and fonts without running into CORS errors. Alternatively, you can set up a custom scheme as discussed in [this GitHub issue](https://github.com/oracle/cordova-plugin-wkwebview-file-xhr/issues/44) to access local files without violating CORS security rules. Read up on [this Cordova plugin](https://github.com/EddyVerbruggen/Custom-URL-scheme) for more information about setting up custom schemes. Also see the [cdv file protocol](https://github.com/apache/cordova-plugin-file#cdvfile-protocol).

Next, you'll want to pull in all relevant Boardhouse files from the [BoardhouseTS repo](https://github.com/jjwall/BoardhouseTS) into the directory that was created after running ``cordova create``. These files include:
* config/
* data/
* index.html
* src/
* style.css
* tsconfig.json
* types/

You will also need to merge the ``package.json`` from Boardhouse with our new ``package.json`` that was created. Also, you will want to rename ``index.html`` to something like ``game.html``.

Now you will want to set up a new ``index.html`` that starts a local server and serves your ``www`` folder. [This gist](https://gist.github.com/Rockncoder/4584544) is a good reference to show how to set up your code to wait for the ``deviceready`` event before we can start calling into the Cordova APIs that come from ``cordova.js``. The example from the [Cordova httpd plugin](https://github.com/floatinghotpot/cordova-httpd) can be referenced for seeing how to set up the http server (this should happen after the ``deviceready`` event is triggered). If you are thinking it is odd that we are starting a server from a script tag in an html file, do not fret. Remember that Cordova will be converting this code to native iOS binaries and that's the environment where the server will be started. See [this gist](https://gist.github.com/jjwall/1f8091e3d0eeb14384fa5f7a14159fd1) for an example of an index.html file put together like this.

Now you need to edit the contents of ``webpack.common.js`` from the ``config/`` directory that was moved over from the Boardhouse files. You need to make sure that the webpack build copies over both ``index.html`` and ``game.html`` and outputs the content into a ``www`` folder.

Finally, run:

```
npm install
```

then:

```
npm run build
```

then:

```
cordova build
```

and lastly:

```
cordova emulate ios
```

Your game should launch into the iOS simulator running the default iPhone model simulator!