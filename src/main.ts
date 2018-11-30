import * as PIXI from "pixi.js";
import { GameState } from "./gamestate";
import { State } from "./state";
import { last, setSprite } from "./helpers";
import { Entity } from "./entity";
import { setEventListeners } from "./seteventlisteners";
import { BoardhouseUI } from "./boardhouseui";

// TODO: Add unit tests.
// TODO: Add systems for current core components.
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
    ent.pos = {x: 0, y: 0};
    ent.sprite = setSprite("data/textures/ship.png", ent.pos.x, ent.pos.y, app.stage, 8);

    gameState.entities.push(ent);
    // end test ent code

    // test button:
    // gameState.rootWidget = new BoardhouseUI.Widget(BoardhouseUI.WidgetTypes.Div);
    // gameState.rootWidget.left = 100;
    // gameState.rootWidget.top = 100;
    // gameState.rootWidget.text = "hello";
    // gameState.rootWidget.style = {
    //     color: 0x008080,
    //     height: 50,
    //     width: 100,
    //     lineWidth: 4,
    //     lineColor: 0xE0FFFF
    // }
    // gameState.rootWidget.children.push(new BoardhouseUI.Widget(BoardhouseUI.WidgetTypes.Div));
    // gameState.rootWidget.children[0].left = 10;
    // gameState.rootWidget.children[0].top = 10;
    // gameState.rootWidget.children[0].style = {
    //     color: 0x808000,
    //     height: 50,
    //     width: 100,
    //     lineWidth: 4,
    //     lineColor: 0x008000
    // }
    // gameState.rootWidget.children[0].children.push(new BoardhouseUI.Widget(BoardhouseUI.WidgetTypes.Div));
    // gameState.rootWidget.children[0].children[0].left = 10;
    // gameState.rootWidget.children[0].children[0].top = 10;
    // gameState.rootWidget.children[0].children[0].style = {
    //     color: 0x0000FF,
    //     height: 50,
    //     width: 100,
    //     lineWidth: 4,
    //     lineColor: 0x000000
    // }

    let rootWidget = BoardhouseUI.CreateWidget(0);
    rootWidget.left = 100;
    rootWidget.top = 100;
    rootWidget.text = "hello";
    rootWidget.style = {
        color: 0x008080,
        height: 50,
        width: 100,
        lineWidth: 4,
        lineColor: 0xE0FFFF
    }
    let child = BoardhouseUI.CreateWidget(0);
    rootWidget.appendChild(child);
    child.left = 10;
    child.top = 10;
    child.style = {
        color: 0x808000,
        height: 50,
        width: 100,
        lineWidth: 4,
        lineColor: 0x008000
    }
    gameState.rootWidget = rootWidget;


    // const element = BoardhouseUI.CreateElement(
    //     BoardhouseUI.WidgetTypes.Div,
    //     {id: "hey"},
    //     BoardhouseUI.CreateElement(
    //         BoardhouseUI.WidgetTypes.Button,
    //         {onClick: e => console.log("hello")}
    //     )
    // )
    // end test button
    
    // set up event listeners
    setEventListeners(app);

    // logic update loop
    setInterval(function() : void {
        if (stateStack.length > 0) {
            // call update on last element in state stack
            last(stateStack).update(stateStack, app);
            // test update
            ent.pos.x += 1;
            ent.pos.y += 1;
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
            last(stateStack).render(app.renderer.view, app.stage);
        }
        else {
            throw "No states to render";
        }
    }

    // start the render loop
    renderLoop(0);
}