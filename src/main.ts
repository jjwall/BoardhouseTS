import * as THREE from "three";
import { State } from "./state";
import { last, setSprite } from "./helpers";
import { setEventListeners } from "./seteventlisteners";
// import { BoardhouseUI } from "./boardhouseui";
import { GameState } from "./gamestate";
import { Resources, loadTextures } from "./resourcemanager";

// TODO: Add unit tests (not started)
// TODO: Transition from PIXI to THREE (in progress)
// TODO: Rework UI layer (in progress) -> USE OPTIONAL PROPS FOR PROP INTERFACE
// TODO: Create level editor (not started)
// TODO: Make generic key binder (not started)
// TODO: Implement screen shake (not started)
// TODO: Add particle effect renderer (not started)
// TODO: Add scene transitions (not started)

loadTextures([
    "../data/textures/cottage.png",
    "../data/textures/girl.png",
    "../data/textures/msknight.png",
    "../data/textures/snow.png",
]).then((textures) => {
    // cache off textures
    Resources.current.textures = textures;

    // start game
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
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(1280, 720);
    const rendererSize = renderer.getSize();

    // set up scene
    let scene = new THREE.Scene();
    scene.background = new THREE.Color("#FFFFFF");

    // set up camera 
    // var camera = new THREE.PerspectiveCamera(75, 1280 / 720, 0.1, 1000);
    const camera = new THREE.OrthographicCamera(rendererSize.width / - 2, rendererSize.width / 2, rendererSize.height / 2, rendererSize.height / -2, -1000, 1000);
    scene.add(camera);

    canvasContainer.append(renderer.domElement);

    // initialize state stack
    let stateStack: State[] = [];
    let gameState = new GameState(scene);
    stateStack.push(gameState);

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
            last(stateStack).render(renderer, camera, scene);
        }
        else {
            throw "No states to render";
        }
    }

    // start the render loop
    renderLoop(0);
}