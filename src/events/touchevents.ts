import { Widget } from "../ui/widget";
import { Vector3 } from "three";

export function handleTouchStartEvent(widget: Widget, e: TouchEvent) {
    if (widget.event("click") && widget.attr("height") && widget.attr("width")) {
        const halfWidth = Number(widget.attr("width"))/2;
        const halfHeight = Number(widget.attr("height"))/2;

        const position = new Vector3();
        widget.getWorldPosition(position);

        // TODO: use sweep & prune alg instead of AABB
        if (e.touches[0].clientY > -position.y - halfHeight
            && e.touches[0].clientY - halfHeight < -position.y
            && e.touches[0].clientX > position.x - halfWidth
            && e.touches[0].clientX - halfWidth < position.x)
        {
            // TODO: Make sure only top most widget's click event is triggered.
            // Right now it's triggering all widgets' click events if they are stacked.
            widget.trigger("click", e);
        }
    }

    widget.childNodes.forEach(child => {
        handleTouchStartEvent(child, e);
    });
}