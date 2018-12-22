// import * as PIXI from "pixi.js";
import * as THREE from "three";
import { State } from "./state";
import { last } from "./helpers";
import { setEventListeners } from "./seteventlisteners";
// import { BoardhouseUI } from "./boardhouseui";
import { MainMenuState } from "./mainmenustate";
import { loadTextures } from "./assetmanager";

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

// set up scene
const width = 1280; // should grab from canvas element
const height = 720; // should grab from canvas element
var scene = new THREE.Scene();
scene.background = new THREE.Color("#FFFFFF");
// var camera = new THREE.PerspectiveCamera(75, 1280 / 720, 0.1, 1000);
var camera = new THREE.OrthographicCamera(width / - 2, width / 2, height / 2, height / -2, -1000, 1000);
scene.add(camera);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(1280, 720); // should grab from canvas element

loadTextures([
    "../data/textures/msknight.png",
    "../data/textures/cottage.png",
    "../data/textures/girl.png"
]).then((textures) => {
    console.log(textures);

    // move to helper file
    // var spriteMap = new THREE.TextureLoader().load( "../data/textures/msknight.png", function(tex) {
    //     console.log( tex.image.width, tex.image.height );
    // });

    let spriteMap = textures["../data/textures/msknight.png"];
    var geometry = new THREE.PlaneGeometry(spriteMap.image.width*4, spriteMap.image.height*4);
    spriteMap.magFilter = THREE.NearestFilter;
    var material = new THREE.MeshBasicMaterial( { map: spriteMap, transparent: true });
    var sprite = new THREE.Mesh(geometry, material);
    // console.log(sprite.getWorldPosition
    scene.add(sprite);

    // camera.position.z = 5;

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
    canvasContainer.append(renderer.domElement);
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


            renderer.render( scene, camera );

            	// 			cube.rotation.x += 0.01;
                // cube.rotation.y += 0.01;
                
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