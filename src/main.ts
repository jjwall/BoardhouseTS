import * as PIXI from "pixi.js";
import { State } from "./state";
import { last } from "./helpers";
import { setEventListeners } from "./seteventlisteners";
import { BoardhouseUI } from "./boardhouseui";
import { MainMenuState } from "./mainmenustate";

// TODO: Add unit tests.
// TODO: Add systems for current core components.
// >> position system, velocity system
// TODO: Add event listeners for key events (controls)
// TODO: Write animation engine.
// TODO: Write virtual DOM framework for UI components.
// TODO: Create level editor.
// Stretch goals:
// Screen shake
// Particle effects
// Scene transitions

// Load all png files and call main when finished.
PIXI.loader
    .add("data/textures/ship.png")
    .add("data/textures/girl.png")
    .load(function () {
        main(<HTMLElement>document.getElementById("canvasContainer"));
    });

/**
 * 
 * @param canvasContainer Captured Canvas Container Element
 * 
 * Main function that gets immediately invoked.
 * Only dependecy is the canvas container element. Also triggers the event pump.
 */
function main(canvasContainer: HTMLElement) {
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

    // initialize state stack
    let stateStack: State[] = [];
    let mainMenuState = new MainMenuState(stateStack, app.stage);
    stateStack.push(mainMenuState);

    let fps: number = 0;
    let totalTime: number = 0;
    let currentTime: number = 0;
    let fpsWidget = BoardhouseUI.CreateWidget();
    fpsWidget.setText("FPS:");

    // set up event listeners
    setEventListeners(app.renderer.view, stateStack);

    // logic update loop
    setInterval(function (): void {
        if (stateStack.length > 0) {
            // call update on last element in state stack
            last(stateStack).update(stateStack, app.stage);
        }
        else {
            throw "No states to update";
        }

        // log FPS
        fpsWidget.setText("FPS: " + Math.round(fps));
        BoardhouseUI.ReconcilePixiDom(fpsWidget, app.stage);
    }, 16);


    // render update loop
    function renderLoop(timeStamp: number) {
        requestAnimationFrame(renderLoop);
        currentTime = timeStamp - totalTime;
        totalTime = timeStamp;
        fps = 1 / (currentTime / 1000);

        if (stateStack.length > 0) {
            // call render on last element in state stack
            last(stateStack).render(app.renderer.view, app.stage);
        }
        else {
            throw "No states to render";
        }
    }

    // start the render loop
    renderLoop(0);
}