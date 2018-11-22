/// <reference types="pixi.js" />
import { GameState } from "./gamestate";
import { State } from "./state";
import { Last } from "./helpers";
import * as PIXI from "pixi.js";

// TODO: Add unit tests.
// TODO: Add systems for current core components.
// TODO: Pull in PixiJS.
// TODO: Write animation engine.
// TODO: Write virtual DOM framework for UI components.
// TODO: Create level editor.

function setEventListeners(app: PIXI.Application) {
    window.addEventListener("resize", function() {
        app.renderer.resize(window.innerWidth, window.innerHeight);
    });
}

/**
 * 
 * @param canvas Captured Canvas Element
 * 
 * Main function that gets immediately invoked.
 * Only dependecy is the canvas element. Also triggers the event pump.
 */
function main(canvasContainer: HTMLElement) {
    // initialize state stack
    let stateStack: State[] = [];
    // in this example push GameState onto stack
    // but should probably push like a "MainMenuState" onto stack
    // which would initialize and push GameState within it's own update method
    stateStack.push(new GameState());

    // set up canvas - need to add resize event when changing the size of the window
    let app = new PIXI.Application({width: 1280, height: 720});
    
    app.renderer.view.style.position = "absolute";
    app.renderer.view.style.display = "block";
    app.renderer.autoResize = true;
    app.renderer.resize(window.innerWidth, window.innerHeight);
    canvasContainer.appendChild(app.view);

    setEventListeners(app);

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

main(<HTMLElement> document.getElementById("letterbox"));