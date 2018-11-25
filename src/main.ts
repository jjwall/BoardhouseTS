import * as PIXI from "pixi.js";
import { GameState } from "./gamestate";
import { State } from "./state";
import { last, setSprite } from "./helpers";
import { Entity } from "./entity";
import { setEventListeners } from "./seteventlisteners";

// TODO: Add unit tests.
// TODO: Add systems for current core components.
// TODO: Write animation engine.
// TODO: Write virtual DOM framework for UI components.
// TODO: Create level editor.

// Load all png files and call main when finished.
PIXI.loader
    .add("data/textures/ship.png")
    .load(function() {
        main(<HTMLElement> document.getElementById("canvasContainer"));
    });

/**
 * 
 * @param canvasContainer Captured Canvas Container Element
 * 
 * Main function that gets immediately invoked.
 * Only dependecy is the canvas container element. Also triggers the event pump.
 */
function main(canvasContainer: HTMLElement) {
    // initialize state stack
    let stateStack: State[] = [];
    // in this example push GameState onto stack
    // but should probably push like a "MainMenuState" onto stack
    // which would initialize and push GameState within it's own update method
    let gameState = new GameState();
    stateStack.push(gameState);

    // set up canvas
    let app = new PIXI.Application({
        width: 1280, 
        height: 720,
    });
    app.renderer.backgroundColor = 999999; // -> hexadecimal color is dark torquoise?
    app.renderer.view.style.position = "absolute";
    app.renderer.view.style.display = "block"
    app.renderer.autoResize = true;
    canvasContainer.appendChild(app.view);

    // test entity:
    let ent = new Entity();
    ent.pos = {x: 50, y: 50};
    ent.sprite = setSprite("data/textures/ship.png", 50, 50, app.stage, 8);

    gameState.entities.push(ent);
    // end test ent code

    // set up event listeners
    setEventListeners(app);

    // logic update loop
    setInterval(function() : void {
        if (stateStack.length > 0) {
            // call update on last element in state stack
            last(stateStack).update(stateStack, app);
            // test update
            ent.pos.x += 1;
        }
        else {
            throw "No states to update";
        }
    }, 16);

    let fps: number = 0;
    let totalTime: number = 0;
    let currentTime: number = 0;

    // render update loop
    function renderLoop(timeStamp: number){
        requestAnimationFrame(renderLoop);
        currentTime = timeStamp - totalTime;
        totalTime = timeStamp;
        fps = 1/(currentTime / 1000);

        // log FPS
        console.log("FPS: " + fps);

        if (stateStack.length > 0) {
            // call render on last element in state stack
            last(stateStack).render();
        }
        else {
            throw "No states to update";
        }
    }

    // start the render loop
    renderLoop(0);
}