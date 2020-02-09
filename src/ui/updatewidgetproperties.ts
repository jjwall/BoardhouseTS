import { Widget } from "./widget";

export function updateWidgetProperties(widget: Widget, prevProps: object, nextProps: object): void {
    const isEvent = name => name.startsWith("on");
    const isAttribute = name => !isEvent(name);

    // Remove event listeners.
    Object.keys(prevProps).filter(isEvent).forEach(name => {
        const eventType = name.toLowerCase().substring(2);
        widget.detachEventListener(eventType);
    });

    // Remove attributes.
    Object.keys(prevProps).filter(isAttribute).forEach(name => {
        widget.setAttr(name, undefined);
    });

    // Add event listeners.
    Object.keys(nextProps).filter(isEvent).forEach(name => {
        const eventType = name.toLowerCase().substring(2);
        widget.setEventListener(eventType, nextProps[name]);
    });

    // Add attributes.
    Object.keys(nextProps).filter(isAttribute).forEach(name => {
        widget.setAttr(name, nextProps[name]);
    });
}