``TO-DO (06/19/2019):``

|   Mark  | Description |
|:-------:|:---------:|
| bullet | work not started |
| :runner:| in progress  |
| :heavy_check_mark: | complete |

``Musts:``

* See and transfer to-dos from ``main.ts``
* Write geometry loader

``Maybes:``
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
* :heavy_check_mark: Define interface for system function
* :heavy_check_mark: Component design for ``<root />`` element so global UI state can be passed from the game state and filter down to all UI components.
    > See current parent -> child passing usage with state
* :heavy_check_mark: Update ``removeChild()`` method on ``Widget`` class so UI can be hidden and/or deleted. Use empty three JS methods for both text and sprite properties.