import { Widget } from "../ui/widget";
import { Vector3 } from "three";
import { Engine } from "../engine/engine";

/** OBSELETE USE EVENT HANDLERS FROM pointerevents.ts FOR TOUCH EVENTS */

let touchedWidgets: Widget[] = [];

export function handleTouchStartEvent(widget: Widget, e: TouchEvent, engine: Engine) {
    // can we just check for widget type = button instead?
    if (widget.event("press") && widget.event("unpress") && widget.attr("height") && widget.attr("width")) {
        const halfWidth = Number(widget.attr("width"))/2;
        const halfHeight = Number(widget.attr("height"))/2;
        const widgetIndex: number = touchedWidgets.indexOf(widget);
        const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
        const scaleRatioX = engine.screenWidth / rect.width;
        const scaleRatioY = engine.screenHeight / rect.height;
        const scaledClientX = e.touches[0].clientX * scaleRatioX;
        const scaledClientY = e.touches[0].clientY * scaleRatioY;
        const position = new Vector3();
        widget.getWorldPosition(position);

        // TODO: use sweep & prune alg instead of AABB
        if (scaledClientY > -position.y - halfHeight
            && scaledClientY - halfHeight < -position.y
            && scaledClientX > position.x - halfWidth
            && scaledClientX - halfWidth < position.x)
        {
            // WidgetIndex necessary?
            if (widgetIndex === -1) {
                touchedWidgets.push(widget);
                widget.trigger("press", e);
            }
        }
    }

    widget.childNodes.forEach(child => {
        handleTouchStartEvent(child, e, engine);
    });
}

// test both looping through and just checking for length with mult buttons.
export function handleTouchEndEvent(e: TouchEvent, engine: Engine) {
    for (let i = 0; i < touchedWidgets.length; i++) {
    // if (touchedWidgets.length > 0) {
        const halfWidth = Number(touchedWidgets[i].attr("width"))/2;
        const halfHeight = Number(touchedWidgets[i].attr("height"))/2;
        const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
        const scaleRatioX = engine.screenWidth / rect.width;
        const scaleRatioY = engine.screenHeight / rect.height;
        const scaledClientX = e.changedTouches[0].clientX * scaleRatioX;
        const scaledClientY = e.changedTouches[0].clientY * scaleRatioY;
        const position = new Vector3();
        touchedWidgets[i].getWorldPosition(position);

        // TODO: use sweep & prune alg instead of AABB
        if (scaledClientY > -position.y - halfHeight
            && scaledClientY - halfHeight < -position.y
            && scaledClientX > position.x - halfWidth
            && scaledClientX - halfWidth < position.x)
        {
            // Trigger events.
            touchedWidgets[i].trigger("submit", e);
            touchedWidgets[i].trigger("unpress", e);
        }
        else {
            // Thumb release when off of button so don't trigger submit.
            touchedWidgets[i].trigger("unpress", e);
        }
    }

    // Clear touchedWidgets.
    touchedWidgets = [];
}