|   Mark  | Description |
|:-------:|:---------:|
| bullet | work not started |
| :runner:| in progress  |
| :heavy_check_mark: | complete |

``Priorities:``

* Clean up changes do to adding Engine class. I.e. move setSprite to engline class.
* Set up ``archetypes`` directory to output pre-constructed entities
* Set up lose state
* Set up Behavior generator type
* :runner: Create loading bar. Might need to set up canvas prior to everything else to render loading bar
* :runner: Fix callback hell scenario when adding additional loaders
* Add scene transitions
* Update three.js
* Add (three.js) gyroscopes
    > This will be helpful for locking hitBoxes in place if entities have rotations
* Hard code a sprite mesh into the resource loader and have sprites transform that to prevent recreating a new sprite mesh every time we need a new sprite
* Turn ``StrictNullChecks`` on

``Secondaries:``
* Make generic key binder. Custom controls for the given platform. Will need a clean looking keyboard UI that shows which keys are used in the game, what they do, and an easy way to rebind these controls (good home screen idea too for game jams)
* Write script to export project to electron using ``electron-builder``
    > Electron will now use ``dist`` folder. Web build will now use ``www`` folder
* Create skeletal animation data interpreter system that takes skeletal anim data from a program like blender and applies it to specified assets. State machine for animation data. Look into using three.js' animation layer
* Create level editor (tile based?)
* Write a generic custom shader
* Add particle effect renderer
* Swap out usage of HTMLAudioElement with web audio API (not started)
* Write geometry loader. Add new geometry folder in assets where each file is a separate geometry i.e. plane.ts create and returns a 1x1 plane
* Start on Wiki to explain the various parts of the engine. Setting up new projects, helper methods, adding new components, systems, and consuming existing APIs, etc. etc.
* Setup VSCode debugging
* Name framework pieces of Boardhouse library in a type definition file
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
``Finished``
* :heavy checkmark: event handling now happens in state. Event listeners are set up at start of engine
* :heavy_check_mark: Add screen shake method back to game state
* :heavy_check_mark: Remove hurtBox code in lieu of hitBox changes
* :heavy_check_mark: ``NoImplicitAny`` true
* :heavy_check_mark: Move new collision stuff over
* :heavy_check_mark: Define interface for system function
* :heavy_check_mark: Component design for ``<root />`` element so global UI state can be passed from the game state and filter down to all UI components.
    > See current parent -> child passing usage with state
* :heavy_check_mark: Update ``removeChild()`` method on ``Widget`` class so UI can be hidden and/or deleted. Use empty three JS methods for both text and sprite properties.
* :heavy_check_mark: update TypeScript compiler