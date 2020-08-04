---
layout: default
title: Build
nav_order: 2
---

# Build Instructions

Below are instructions for getting BoardhouseTS to build locally on your machine. Make sure you have the latest version of NPM installed and Boardhouse needs Node version 10.0 or later to build properly.

```
npm install
```

##### Development:
```
npm start
```

##### Production:
```
npm run build
node server.js
```

Go to ``localhost:8080`` to test it out. All production files will be contained in the ``dist`` folder.