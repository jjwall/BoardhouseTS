import { WebGLRenderer } from "three";
import { Engine } from "./engine";
import { loadTextures, loadAudioElements, loadFonts } from "./loaders";
import { BaseState } from "./basestate";
import { last } from "./helpers";
// import { activateGlobalEvents } from "./globalevents";
import { setEventListeners } from "./seteventlisteners";
import { MainMenuState } from "./../states/mainmenu/state";
import { GamePlayState } from "./../states/gameplay/state";
import { LoadState } from "../states/load/state";

// initialize engine
const engine = new Engine();

// initialize state stack
const loadState = new LoadState(engine);
engine.stateStack.push(loadState);

// load fonts first then call main
loadFonts([
    "./data/fonts/helvetiker_regular_typeface.json"
]).then((fonts) => {
    // cache off fonts
    engine.setFonts(fonts);

    // Call main to start updating and rendering.
    main(<HTMLElement>document.getElementById("canvasContainer"));

    loadTextures([
        "./data/textures/cottage.png",
        "./data/textures/girl.png",
        "./data/textures/msknight.png",
        "./data/textures/snow.png",
        "./data/textures/space4096Square.png",
    ]).then((textures) => {
        // cache off textures
        engine.setTextures(textures);

        loadAudioElements([
            // "./data/audio/Pale_Blue.mp3",
            // "./data/audio/SFX_Bonk2.wav",
        ]).then((audioElements) => {
            // cache off audio elements
            engine.setAudioElements(audioElements);

            // pop load state, push main state
            engine.stateStack.pop();
            const mainMenuState = new MainMenuState(engine);
            engine.stateStack.push(mainMenuState);
        });
    });
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
    renderer.setSize(1280, 720);
    renderer.autoClear = false;
    engine.renderer = renderer;

    // append canvas element to canvas container
    canvasContainer.append(renderer.domElement);

    // disable right click context menu
    canvasContainer.oncontextmenu = function (e) {
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

        // log FPS
        // fpsWidget.setText("FPS: " + Math.round(fps));
        // BoardhouseUI.ReconcilePixiDom(fpsWidget, app.stage);
    }, 16);

    // render update loop
    function renderLoop(timeStamp: number) {
        requestAnimationFrame(renderLoop);
        currentTime = timeStamp - totalTime;
        totalTime = timeStamp;
        fps = 1 / (currentTime / 1000);
                
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