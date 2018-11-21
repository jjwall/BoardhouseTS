import { GameState } from "./gamestate";
import { State } from "./state";
import { Last } from "./helpers";

// TODO: Add unit tests.
// TODO: Add systems for current core components.
// TODO: Pull in PixiJS.
// TODO: Write animation engine.
// TODO: Write virtual DOM framework for UI components.
// TODO: Create level editor.

/**
 * 
 * @param canvas Captured Canvas Element
 * 
 * Main function that gets immediately invoked.
 * Only dependecy is the canvas element. Also triggers the event pump.
 */
function main(canvas: HTMLCanvasElement) {
    // initialize state stack
    let stateStack: State[] = [];
    // in this example push GameState onto stack
    // but should probably push like a "MainMenuState" onto stack
    // which would initialize and push GameState within it's own update method
    stateStack.push(new GameState(canvas));

    // Event pump - set at about 60fps
    // CONSIDER: Using requestAnimationFrame for rendering
    setInterval(function() : void {
        if (stateStack.length > 0) {
            // call update on last element in state stack
            Last(stateStack).update(stateStack);
        }
        else {
            throw "No states to update";
        }
    }, 16);
}

main(<HTMLCanvasElement> document.getElementById("gameScreen"));