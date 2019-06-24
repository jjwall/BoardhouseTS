``TO-DO (06/19/2019):``

* See and transfer to-dos from ``main.ts``
* Create new ``builds`` branch
* Define interface for system function
* Component design for ``<root />`` element so global UI state can be passed from the game state and filter down to all UI components.
    > See current parent -> child passing usage with state
* Add ``removeChild()`` method on ``Widget`` class so UI can be hidden and/or deleted. Use empty three JS methods for both text and sprite properties.
* Set up ``builds`` directory
    > See journal notes on new file structure
* Add intex.ts file for ``pure-browser`` build, and for ``full-stack``, or, ``node-and-browser`` build
    > ex: export * from "file/path"
* Name framework pieces of Boardhouse library in a type definition file
* Each build in the ``builds`` directory will have their own build system as currently seen the root directory of this project
* Add library as an npm package
    > search-engine "npm publishing typescript"
* Before this can be done, we must package and pull the existing library locally
    > This will require distinguishing between current framework code and engine code. Library can be part application (see ``ui`` in ``src``) and part engine (see ``basestate.ts``)
* Example tsconfig.json:
    ```json
    "boardhouse-pure-browser": {
        "front-end": "../src/app",
        "back-end": "../src/framework"
    },
    "boardhouse-full-stack": {
        "front-end": "../src/app",
        "middleware": "../src/node",
        "back-end": "../src/framework"
    }

    // Search engine: "typescript module resolution"
* Put current example code in new ``builds`` dir, call this new dir "ex1" and pull in library
* Remove ``HurtBox`` component. ``HitBoxes`` will take a type and a list of types it can collid with (use flags). A new component will be required, essentially a merge of existing HitBox and HurtBox components. This new component will be called ``HitBoxes`` and it will have a list of "hit boxes" as one of the component's properties. Another property will be a self-reference to the Entity that has the component. This will be used for the mark and sweep algorithm. Setting hurt box and hit box graphics helper methods can be merged, just add a color parameter to pass in whatever color you want.
    > Consider hit/hurt box helper method changes with new ``HitBoxes`` component

    > Check to see if you can render multiple colored panels on same sprite
* Write geometry loader
* Write separate ``Vector3`` module to begin the distinction between render code and engine code. For games that use Node on the back end, Three.js should only be used as a browser dependency. For front-end-only games, this distinction won't matter, but the distinction will still be made.
* Construct ``middleware`` layer for TypeScript <=> Json objects from Node to browser and from browser to Node.

``Finished (06/18/2019)``
* Set up TO-DO file :)