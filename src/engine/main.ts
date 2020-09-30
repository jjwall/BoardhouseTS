import { WebGLRenderer } from "three";
import { Engine, EngineConfig } from "./engine";
import { last } from "./helpers";
import { setEventListeners } from "./seteventlisteners";
import { MainMenuState } from "./../states/mainmenu/state";
import { GamePlayState } from "./../states/gameplay/state";
import { LoadState } from "../states/load/state";

const config: EngineConfig = {
    screenWidth: 1280,
    screenHeight: 720,
    gameTicksPerSecond: 60,
    displayFPS: true,
    displayHitBoxes: true,
    globalErrorHandling: true,
    fontUrls: [
        "./data/fonts/helvetiker_regular_typeface.json"
    ],
    textureUrls: [
        "./data/textures/cottage.png",
        "./data/textures/girl.png",
        "./data/textures/msknight.png",
        "./data/textures/snow.png",
        "./data/textures/space4096Square.png",
        // "./data/textures/logo.png",
    ],
    audioUrls: [
        "./data/audio/Pale_Blue.mp3",
        "./data/audio/SFX_Bonk2.wav",
    ],
}

const engine = new Engine(config);

// Removing loading state for now.
// const loadState = new LoadState(engine);
// engine.stateStack.push(loadState);

engine.loadAssets().then(() => {
    const mainMenuState = new MainMenuState(engine);
    engine.stateStack.push(mainMenuState);
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
    // set up renderer
    const renderer = new WebGLRenderer();
    renderer.setSize(engine.screenWidth, engine.screenHeight);
    renderer.autoClear = false;
    engine.renderer = renderer;

    // append canvas element to canvas container
    canvasContainer.append(renderer.domElement);

    // disable right click context menu
    renderer.domElement.oncontextmenu = function (e) {
        e.preventDefault();
    };

    let fps: number = 0;
    let totalTime: number = 0;
    let currentTime: number = 0;
    // let fpsWidget = BoardhouseUI.CreateWidget();
    // fpsWidget.setText("FPS:");

    // set up global event listeners
    setEventListeners(engine);

    // logic update loop
    setInterval(function (): void {
        if (engine.stateStack.length > 0) {
            // call update on last element in state stack
            last(engine.stateStack).update();
        }
        else {
            throw "No states to update";
        }
    }, engine.millisecondsPerGameTick);

    // render update loop
    function renderLoop(timeStamp: number) {
        requestAnimationFrame(renderLoop);
        currentTime = timeStamp - totalTime;
        totalTime = timeStamp;
        engine.FPS = Math.round(1 / (currentTime / 1000));
                
        if (engine.stateStack.length > 0) {
            // call render on last element in state stack
            last(engine.stateStack).render();
        }
        else {
            throw "No states to render";
        }
    }

    // start the render loop
    renderLoop(0);
}