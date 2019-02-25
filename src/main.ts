import {
    WebGLRenderer,
    Scene,
    Color,
    OrthographicCamera,
} from "three";
import {
    Resources,
    loadTextures,
    loadAudioElements,
} from "./resourcemanager";
import { BaseState } from "./basestate";
import { last } from "./helpers";
import { setEventListeners } from "./seteventlisteners";
import { GameState } from "./gamestate";
// import { BoardhouseUI } from "./boardhouseui";

// TODO: modifyX, modifyY, offsetX, offsetY form collision initializers (in progress)
// TODO: Test: collisionSystem, entityRegistry (in progress)
// TODO: Add camera/scene as state properties (see pale blue dot)
// TODO: Rework main menu state/screen (not started)
// TODO: Rework UI layer (in progress) 
// -> USE OPTIONAL PROPS FOR PROP INTERFACE
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
// TODO: Swap out usage of HTMLAudioElement with web audio API (not started)

loadTextures([
    "./data/textures/cottage.png",
    "./data/textures/girl.png",
    "./data/textures/msknight.png",
    "./data/textures/snow.png",
]).then((textures) => {
    // cache off textures
    Resources.instance.setTextures(textures);

    loadAudioElements([
        "./data/audio/Pale_Blue.mp3"
    ]).then((audioElements) => {
        // cache off audio elements
        Resources.instance.setAudioElements(audioElements);

        // start game
        main(<HTMLElement>document.getElementById("canvasContainer"));
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
    const rendererSize = renderer.getSize();

    // set up scene
    let scene = new Scene();
    scene.background = new Color("#FFFFFF");

    // set up camera 
    // var camera = new THREE.PerspectiveCamera(75, 1280 / 720, 0.1, 1000);
    const camera = new OrthographicCamera(rendererSize.width / - 2, rendererSize.width / 2, rendererSize.height / 2, rendererSize.height / -2, -1000, 1000);
    scene.add(camera);

    canvasContainer.append(renderer.domElement);

    // initialize state stack
    let stateStack: BaseState[] = [];
    let gameState = new GameState(scene, stateStack);
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