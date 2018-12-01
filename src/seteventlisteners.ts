import { scaleToWindow } from "./helpers";
import { BoardhouseUI } from "./boardhouseui";
import { State } from "./state";
import { last } from "./helpers";
type Widget = BoardhouseUI.Widget;

export function setEventListeners(canvas: HTMLCanvasElement, stateStack: State[]) {
    let hoveredWidgets: BoardhouseUI.Widget[] = [];
    // call first to scale to current window dimensions
    scaleToWindow(canvas);

    window.addEventListener("resize", function () {
        scaleToWindow(canvas);
    });

    canvas.addEventListener("mousedown", function (e: MouseEvent) {
        traverseTreeForOnClick(last(stateStack).rootWidget, e);
        canvas.setAttribute("class", "default");
    });

    canvas.addEventListener("mousemove", function (e: MouseEvent) {
        traverseTreeForHover(last(stateStack).rootWidget, hoveredWidgets, canvas, e);
    });

    // keyboard controls
    window.onkeydown = function(e: KeyboardEvent) {
        if (e.keyCode === 37) {
            // handle ui events first then pass to controls
            last(stateStack).entities.forEach(ent=> {
                if (ent.control !== undefined) {
                    ent.control.left = true;
                }
            });
        }

        if (e.keyCode === 39) {
            // handle ui events first then pass to controls
            last(stateStack).entities.forEach(ent=> {
                if (ent.control !== undefined) {
                    ent.control.right = true;
                }
            });
        }

        if (e.keyCode === 90) { // spacebar
            // handle ui events first then pass to controls
            last(stateStack).entities.forEach(ent=> {
                if (ent.control !== undefined) {
                    ent.control.attack = true;
                }
            });
        }
    }

    window.onkeyup = function(e) {
        if (e.keyCode === 37) {
            // handle ui events first then pass to controls
            last(stateStack).entities.forEach(ent=> {
                if (ent.control !== undefined) {
                    ent.control.left = false;
                }
            });
        }
        if (e.keyCode === 39) {
            // handle ui events first then pass to controls
            last(stateStack).entities.forEach(ent=> {
                if (ent.control !== undefined) {
                    ent.control.right = false;
                }
            });
        }

        if (e.keyCode === 90) { // spacebar
            // handle ui events first then pass to controls
            last(stateStack).entities.forEach(ent=> {
                if (ent.control !== undefined) {
                    ent.control.attack = false;
                }
            });
        }
    }
}

function traverseTreeForOnClick(widget: Widget, e: MouseEvent) {
    if (widget.style !== undefined && widget.onClick !== undefined) {
        if (e.offsetY > widget.selfContainer.worldTransform.ty && e.offsetY < widget.selfContainer.worldTransform.ty + widget.style.height
            && e.offsetX > widget.selfContainer.worldTransform.tx && e.offsetX < widget.selfContainer.worldTransform.tx + widget.style.width)
        {
            widget.onClick(e);
        }
    }

    if (widget.children.length > 0) {
        widget.children.forEach(child => {
            traverseTreeForOnClick(child, e);
        });
    }
}

function traverseTreeForHover(widget: Widget, hoveredWidgets: Widget[], canvas: HTMLCanvasElement, e: MouseEvent) {
    if (widget.style !== undefined && widget.onHover !== undefined && widget.offHover) {
        let widgetIndex: number = hoveredWidgets.indexOf(widget);

        if (e.offsetY > widget.selfContainer.worldTransform.ty && e.offsetY < widget.selfContainer.worldTransform.ty + widget.style.height
            && e.offsetX > widget.selfContainer.worldTransform.tx && e.offsetX < widget.selfContainer.worldTransform.tx + widget.style.width)
        {
            if (widgetIndex === -1) {
                hoveredWidgets.push(widget);
                widget.onHover(e);
                canvas.setAttribute("class", "pointer");
            }
        }
        else {
            if (widgetIndex > -1) {
                widget.offHover(e);
                hoveredWidgets.splice(widgetIndex);
                canvas.setAttribute("class", "default");
            }
        }
    }

    if (widget.children.length > 0) {
        widget.children.forEach(child => {
            traverseTreeForHover(child, hoveredWidgets, canvas, e);
        });
    }

}