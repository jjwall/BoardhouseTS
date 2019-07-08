import { scaleToWindow } from "../scaletowindow";
import { BaseState } from "../basestate";
import { Widget } from "../ui/widget";
import { Entity } from "./entity";
import { last } from "./helpers";

export function setEventListeners(canvas: HTMLCanvasElement, stateStack: BaseState[]) {
    let hoveredWidgets: Widget[] = [];
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
        // left
        if (e.keyCode === 37) {
            last(stateStack).getEntitiesByKey<Entity>("control").forEach(ent=> {
                if (ent.control) {
                    ent.control.left = true;
                }
            });
        }

        // right
        if (e.keyCode === 39) {
            last(stateStack).getEntitiesByKey<Entity>("control").forEach(ent=> {
                if (ent.control) {
                    ent.control.right = true;
                }
            });
        }

        // up
        if (e.keyCode === 38 || e.key === 'w') {
            last(stateStack).getEntitiesByKey<Entity>("control").forEach(ent=> {
                if (ent.control) {
                    ent.control.up = true;
                }
            });
        }

        // down
        if (e.keyCode === 40 || e.key === 's') {
            last(stateStack).getEntitiesByKey<Entity>("control").forEach(ent=> {
                if (ent.control) {
                    ent.control.down = true;
                }
            });
        }

        // spacebar
        if (e.keyCode === 90) {
            last(stateStack).getEntitiesByKey<Entity>("control").forEach(ent=> {
                if (ent.control) {
                    ent.control.attack = true;
                }
            });
        }
    }

    window.onkeyup = function(e) {
        // left
        if (e.keyCode === 37) {
            last(stateStack).getEntitiesByKey<Entity>("control").forEach(ent=> {
                if (ent.control) {
                    ent.control.left = false;
                }
            });
        }

        // right
        if (e.keyCode === 39) {
            last(stateStack).getEntitiesByKey<Entity>("control").forEach(ent=> {
                if (ent.control) {
                    ent.control.right = false;
                }
            });
        }

        // up
        if (e.keyCode === 38 || e.key === 'w') {
            last(stateStack).getEntitiesByKey<Entity>("control").forEach(ent=> {
                if (ent.control) {
                    ent.control.up = false;
                }
            });
        }

        // down
        if (e.keyCode === 40 || e.key === 's') {
            last(stateStack).getEntitiesByKey<Entity>("control").forEach(ent=> {
                if (ent.control) {
                    ent.control.down = false;
                }
            });
        }

        // spacebar
        if (e.keyCode === 90) {
            last(stateStack).getEntitiesByKey<Entity>("control").forEach(ent=> {
                if (ent.control) {
                    ent.control.attack = false;
                }
            });
        }
    }
}

function traverseTreeForOnClick(widget: Widget, e: MouseEvent) {
    if (widget.event("click") && widget.attr("height") && widget.attr("width")) {
        const halfWidth: number = Number(widget.attr("width"))/2;
        const halfHeight: number = Number(widget.attr("height"))/2;

        if (e.offsetY > -widget.position.y - halfHeight
            && e.offsetY - halfHeight < -widget.position.y
            && e.offsetX > widget.position.x - halfWidth
            && e.offsetX - halfWidth < widget.position.x)
        {
            // TODO: Make sure only top most widget's click event is triggered.
            // Right now it's triggering all widgets' click events if they are stacked.
            widget.trigger("click", e);
        }
    }

    if (widget.childNodes.length > 0) {
        widget.childNodes.forEach(child => {
            traverseTreeForOnClick(child, e);
        });
    }
}

function traverseTreeForHover(widget: Widget, hoveredWidgets: Widget[], canvas: HTMLCanvasElement, e: MouseEvent) {
    if (widget.event("hover") && widget.event("plunge") && widget.attr("height") && widget.attr("width")) {
        const halfWidth: number = Number(widget.attr("width"))/2;
        const halfHeight: number = Number(widget.attr("height"))/2;
        let widgetIndex: number = hoveredWidgets.indexOf(widget);

        if (e.offsetY > -widget.position.y - halfHeight
            && e.offsetY - halfHeight < -widget.position.y
            && e.offsetX > widget.position.x - halfWidth
            && e.offsetX - halfWidth < widget.position.x)
        {
            if (widgetIndex === -1) {
                hoveredWidgets.push(widget);
                widget.trigger("hover", e);
                
                // TODO: Remove this eventually...
                canvas.setAttribute("class", "pointer");
            }
        }
        else {
            if (widgetIndex > -1) {
                widget.trigger("plunge", e);
                hoveredWidgets.splice(widgetIndex);
                canvas.setAttribute("class", "default");
            }
        }
    }

    if (widget.childNodes.length > 0) {
        widget.childNodes.forEach(child => {
            traverseTreeForHover(child, hoveredWidgets, canvas, e);
        });
    }

}