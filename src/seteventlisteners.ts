import { scaleToWindow } from "./helpers";
import { BoardhouseUI } from "./boardhouseui";
import { State } from "./state";
import { last } from "./helpers";

export function setEventListeners(canvas: HTMLCanvasElement, stateStack: State[]) {
    // call first to scale to current window dimensions
    scaleToWindow(canvas);

    window.addEventListener("resize", function () {
        scaleToWindow(canvas);
    });

    canvas.addEventListener("mousedown", function (e: MouseEvent) {
        traverseTreeForOnClick(last(stateStack).rootWidget, e);
    });
}

function traverseTreeForOnClick(widget: BoardhouseUI.Widget, e: MouseEvent) {
    if (widget.style !== undefined && widget.onClick !== undefined) {
        if (e.offsetY > widget.selfContainer.worldTransform.ty && e.offsetY < widget.selfContainer.worldTransform.ty + widget.style.height
            && e.offsetX > widget.selfContainer.worldTransform.tx && e.offsetX < widget.selfContainer.worldTransform.tx + widget.style.width)
        {
            widget.onClick();
        }
    }

    if (widget.children.length > 0) {
        widget.children.forEach(child => {
            traverseTreeForOnClick(child, e);
        });
    }
}