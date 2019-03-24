import { Widget } from "./classes";
import { Element } from "./interfaces";

export function render(element: Element, parentWidget: Widget): void {
    const { type, props } = element;
    const widget = createWidget(type);
    const childElement = element.children || [];
    childElement.forEach(childElement => render(childElement, widget));
    parentWidget.appendChild(widget);
}

function createWidget(type: string): Widget {
    let widget = new Widget(type);
    return widget;
}

function layout(widget: Widget): void {
    // cycle through attrs and update visible properties using Object3D base class
}