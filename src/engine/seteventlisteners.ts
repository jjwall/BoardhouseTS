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
        switch(e.keyCode) {
            case 37: // left
            case 65: // w
                last(stateStack).getEntitiesByKey<Entity>("control").forEach(ent=> {
                    if (ent.control) {
                        ent.control.left = true;
                    }
                });
                break;

            case 39: // right
            case 68: // d
                last(stateStack).getEntitiesByKey<Entity>("control").forEach(ent=> {
                    if (ent.control) {
                        ent.control.right = true;
                    }
                });
                break;

            case 38: // up
            case 87: // w
                last(stateStack).getEntitiesByKey<Entity>("control").forEach(ent=> {
                    if (ent.control) {
                        ent.control.up = true;
                    }
                });
                break;
            
            case 40: // down
            case 83: // s
                last(stateStack).getEntitiesByKey<Entity>("control").forEach(ent=> {
                    if (ent.control) {
                        ent.control.down = true;
                    }
                });
                break;

            case 32: // spacebar
            case 90: // z
                last(stateStack).getEntitiesByKey<Entity>("control").forEach(ent=> {
                    if (ent.control) {
                        ent.control.attack = true;
                    }
                });
                break;
        }
    }

    window.onkeyup = function(e) {
        switch(e.keyCode) {
            case 37: // left
            case 65: // w
                last(stateStack).getEntitiesByKey<Entity>("control").forEach(ent=> {
                    if (ent.control) {
                        ent.control.left = false;
                    }
                });
                break;

            case 39: // right
            case 68: // d
                last(stateStack).getEntitiesByKey<Entity>("control").forEach(ent=> {
                    if (ent.control) {
                        ent.control.right = false;
                    }
                });
                break;

            case 38: // up
            case 87: // w
                last(stateStack).getEntitiesByKey<Entity>("control").forEach(ent=> {
                    if (ent.control) {
                        ent.control.up = false;
                    }
                });
                break;
            
            case 40: // down
            case 83: // s
                last(stateStack).getEntitiesByKey<Entity>("control").forEach(ent=> {
                    if (ent.control) {
                        ent.control.down = false;
                    }
                });
                break;

            case 32: // spacebar
            case 90: // z
                last(stateStack).getEntitiesByKey<Entity>("control").forEach(ent=> {
                    if (ent.control) {
                        ent.control.attack = false;
                    }
                });
                break;
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
                canvas.setAttribute("class", "pointer"); // pointer cursor
            }
        }
        else {
            if (widgetIndex > -1) {
                widget.trigger("plunge", e);
                hoveredWidgets.splice(widgetIndex);
                canvas.setAttribute("class", "default"); // arrow cursor
            }
        }
    }

    if (widget.childNodes.length > 0) {
        widget.childNodes.forEach(child => {
            traverseTreeForHover(child, hoveredWidgets, canvas, e);
        });
    }

}