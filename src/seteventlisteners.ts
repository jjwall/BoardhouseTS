import { scaleToWindow } from "./helpers";

export function setEventListeners(app: PIXI.Application) {
    // call first to scale to current window dimensions
    scaleToWindow(app.renderer.view);

    window.addEventListener("resize", function () {
        scaleToWindow(app.renderer.view);
    });
}