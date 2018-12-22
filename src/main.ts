import * as THREE from "three";
import { State } from "./state";
import { last } from "./helpers";
import { setEventListeners } from "./seteventlisteners";
// import { BoardhouseUI } from "./boardhouseui";
import { MainMenuState } from "./mainmenustate";
import { loadTextures, UrlToTextureMap } from "./assetmanager";

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

loadTextures([
    "../data/textures/cottage.png",
    "../data/textures/girl.png",
    "../data/textures/msknight.png",
]).then((textures) => {
    console.log(textures);

    // start game
    main(<HTMLElement>document.getElementById("canvasContainer"), textures);
});

/**
 * 
 * @param canvasContainer Captured Canvas Container Element
 * 
 * Main function that gets immediately invoked.
 * Only dependecy is the canvas container element. Also triggers the event pump.
 */
function main(canvasContainer: HTMLElement, textures: UrlToTextureMap) {
    // set up renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(1280, 720);
    const rendererSize = renderer.getSize();

    // set up scene
    let scene = new THREE.Scene();
    scene.background = new THREE.Color("#FFFFFF");

    // set up camera 
    // var camera = new THREE.PerspectiveCamera(75, 1280 / 720, 0.1, 1000);
    var camera = new THREE.OrthographicCamera(rendererSize.width / - 2, rendererSize.width / 2, rendererSize.height / 2, rendererSize.height / -2, -1000, 1000);
    scene.add(camera);

    canvasContainer.append(renderer.domElement);

    // vvv test entity code vvv

    // move to helper file
    let spriteMap = textures["../data/textures/msknight.png"];
    var geometry = new THREE.PlaneGeometry(spriteMap.image.width*4, spriteMap.image.height*4);
    spriteMap.magFilter = THREE.NearestFilter;
    var material = new THREE.MeshBasicMaterial( { map: spriteMap, transparent: true });
    var sprite = new THREE.Mesh(geometry, material);
    // console.log(sprite.getWorldPosition
    scene.add(sprite);

    // ^^^ end test entity code ^^^

    // initialize state stack
    let stateStack: State[] = [];
    // let mainMenuState = new MainMenuState(stateStack, app.stage);
    // stateStack.push(mainMenuState);

    let fps: number = 0;
    let totalTime: number = 0;
    let currentTime: number = 0;
    // let fpsWidget = BoardhouseUI.CreateWidget();
    // fpsWidget.setText("FPS:");

    // set up event listeners
    setEventListeners(renderer.domElement, stateStack);

    // logic update loop
    setInterval(function (): void {
        // if (stateStack.length > 0) {
        //     // call update on last element in state stack
        //     last(stateStack).update(stateStack, app.stage);
        // }
        // else {
        //     throw "No states to update";
        // }

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


        renderer.render(scene, camera);
                
        // if (stateStack.length > 0) {
        //     // call render on last element in state stack
        //     last(stateStack).render(app.renderer.view, app.stage);
        // }
        // else {
        //     throw "No states to render";
        // }
    }

    // start the render loop
    renderLoop(0);
}