import { WebGLRenderer } from "three";
import { Resources, loadTextures, loadAudioElements, loadFonts } from "./resourcemanager";
import { BaseState } from "./basestate";
import { last } from "./helpers";
import { setEventListeners } from "./seteventlisteners";
import { MainMenuState } from "./mainmenustate";
import { GamePlayState } from "./../states/gameplay/state";

/**
 * Starts program
 */

// TODO: Remove hurtBox component. Only use HitBox. HitBox will take a type and a
// list of things it collided with (flags). Component will be "hitBoxes" and it will
// have a list of hitbox components each entity can have. Each hitbox will have a reference
// to the entity for the mark and sweep alg. Setting hurt box and hit box can remain the same
// just add a color parameter or something
// TODO: Scan & sweep alg for collision system (not started)
// TODO: Fix callback hell scenario when adding additional loaders (not started)
// TODO: Add scene transitions (not started)
// TODO: Write geometry loader (not started)
// TODO: Set up VSCode debugging (in progress)
// ----- (start sbo prototype at this point)
// TODO: Implement screen shake (not started)
// TODO: Write custom shaders
// TODO: Add particle effect renderer (not started)
// TODO: Make generic key binder (not started)
// TODO: Add unit tests (not started)
// TODO: Create level editor (not started)
// TODO: Add custom Vector3 method.
// TODO: Swap out usage of HTMLAudioElement with web audio API (not started)

loadTextures([
    "./data/textures/cottage.png",
    "./data/textures/girl.png",
    "./data/textures/msknight.png",
    "./data/textures/snow.png",
    "./data/textures/space4096Square.png",
]).then((textures) => {
    // cache off textures
    Resources.instance.setTextures(textures);

    loadFonts([
        "./data/fonts/helvetiker_regular_typeface.json"
    ]).then((fonts) => {
        // cache off fonts
        Resources.instance.setFonts(fonts);

        loadAudioElements([
            "./data/audio/Pale_Blue.mp3",
            "./data/audio/SFX_Bonk2.wav",
        ]).then((audioElements) => {
            // cache off audio elements
            Resources.instance.setAudioElements(audioElements);

            // start game
            main(<HTMLElement>document.getElementById("canvasContainer"));
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

    // append canvas element to canvas container
    canvasContainer.append(renderer.domElement);

    //disable right click context menu
    canvasContainer.oncontextmenu = function (e) {
        e.preventDefault();
    };

    // initialize state stack
    let stateStack: BaseState[] = [];
    let mainMenuState = new MainMenuState(stateStack);
    stateStack.push(mainMenuState);
    // let gameState = new GameState(stateStack);
    // stateStack.push(gameState);

    let fps: number = 0;
    let totalTime: number = 0;
    let currentTime: number = 0;
    // let fpsWidget = BoardhouseUI.CreateWidget();
    // fpsWidget.setText("FPS:");

    // set up event listeners
    setEventListeners(renderer.domElement, stateStack);

    // logic update loop
    setInterval(function (): void {
        if (stateStack.length > 0) {
            // call update on last element in state stack
            last(stateStack).update();
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
                
        if (stateStack.length > 0) {
            // call render on last element in state stack
            last(stateStack).render(renderer);
        }
        else {
            throw "No states to render";
        }
    }

    // start the render loop
    renderLoop(0);
}