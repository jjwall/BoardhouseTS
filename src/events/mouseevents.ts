import { Widget } from "../ui/widget";
import { Vector3 } from "three";

export let hoveredWidgets: Widget[] = [];

export function traverseTreeForOnClick(widget: Widget, e: MouseEvent) {
    if (widget.event("click") && widget.attr("height") && widget.attr("width")) {
        const halfWidth = Number(widget.attr("width"))/2;
        const halfHeight = Number(widget.attr("height"))/2;

        const position = new Vector3();
        widget.getWorldPosition(position);

        // TODO: use sweep & prune alg instead of AABB
        if (e.offsetY > -position.y - halfHeight
            && e.offsetY - halfHeight < -position.y
            && e.offsetX > position.x - halfWidth
            && e.offsetX - halfWidth < position.x)
        {
            // TODO: Make sure only top most widget's click event is triggered.
            // Right now it's triggering all widgets' click events if they are stacked.
            widget.trigger("click", e);
        }
    }

    widget.childNodes.forEach(child => {
        traverseTreeForOnClick(child, e);
    });
}

export function traverseTreeForHover(widget: Widget, hoveredWidgets: Widget[], canvas: HTMLCanvasElement, e: MouseEvent) {
    if (widget.event("hover") && widget.event("plunge") && widget.attr("height") && widget.attr("width")) {
        const halfWidth: number = Number(widget.attr("width"))/2;
        const halfHeight: number = Number(widget.attr("height"))/2;
        let widgetIndex: number = hoveredWidgets.indexOf(widget);

        const position = new Vector3();
        widget.getWorldPosition(position);

        if (e.offsetY > -position.y - halfHeight
            && e.offsetY - halfHeight < -position.y
            && e.offsetX > position.x - halfWidth
            && e.offsetX - halfWidth < position.x)
        {
            if (widgetIndex === -1) {
                hoveredWidgets.push(widget);
                widget.trigger("hover", e);

                // TODO: Remove this eventually...
                // canvas.setAttribute("class", "pointer"); // pointer cursor
            }
        }
        else {
            if (widgetIndex > -1) {
                widget.trigger("plunge", e);
                hoveredWidgets.splice(widgetIndex);
                // canvas.setAttribute("class", "default"); // arrow cursor
            }
        }
    }

    if (widget.childNodes.length > 0) {
        widget.childNodes.forEach(child => {
            traverseTreeForHover(child, hoveredWidgets, canvas, e);
        });
    }
}