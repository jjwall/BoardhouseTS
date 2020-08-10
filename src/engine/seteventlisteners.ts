import { scaleToWindow } from "./scaletowindow";
import { last } from "./helpers";
import { Engine } from "./engine";

export function setEventListeners(engine: Engine) {
    // call first to scale to current window dimensions
    scaleToWindow(engine.renderer.domElement);

    window.addEventListener("resize", function () {
        scaleToWindow(engine.renderer.domElement);
    });

    engine.renderer.domElement.addEventListener("mousedown", function (e: MouseEvent) {
        last(engine.stateStack).handleEvent(e);
        // canvas.setAttribute("class", "default");
    });

    engine.renderer.domElement.addEventListener("mousemove", function (e: MouseEvent) {
        last(engine.stateStack).handleEvent(e);
    });

    window.onkeydown = function(e: KeyboardEvent) {
        last(engine.stateStack).handleEvent(e);
    }

    window.onkeyup = function(e: KeyboardEvent) {
        last(engine.stateStack).handleEvent(e);
    }
}