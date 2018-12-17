// import * as PIXI from "pixi.js";
import * as THREE from "three";
import { State } from "./state";
import { last } from "./helpers";
import { setEventListeners } from "./seteventlisteners";
// import { BoardhouseUI } from "./boardhouseui";
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

var scene = new THREE.Scene();
scene.background = new THREE.Color("#FFFFFF");
var camera = new THREE.PerspectiveCamera( 75, 1280 / 720, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(1280, 720);

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

main(<HTMLElement>document.getElementById("canvasContainer"));

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

            				cube.rotation.x += 0.01;
				cube.rotation.y += 0.01;
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