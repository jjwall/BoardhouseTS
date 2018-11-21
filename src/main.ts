import { GameState } from "./gamestate";
import { State } from "./state";
import { Last } from "./helpers";

/**
 * 
 * @param canvas Captured Canvas Element
 * 
 * Main function that gets immediately invoked.
 * Only dependecy is the canvas element. Also triggers the event pump.
 */
function main(canvas: HTMLCanvasElement) {
    let stateStack: State[] = [];
    stateStack.push(new GameState(canvas));

    // Event pump - set at about 60fps
    setInterval(function() : void {
        if (Last(stateStack) !== undefined) {
            Last(stateStack).update();
        }
    }, 16);
}

main(<HTMLCanvasElement> document.getElementById("gameScreen"));