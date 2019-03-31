import { Widget, createWidget } from "./widget";
import { layoutWidget } from "./layoutwidget";
import { JSX } from "./interfaces";
import { Scene} from "three";

/**
 * React-like render method for widgets.
 * @param element 
 * @param parentWidget 
 * @param scene 
 */
export function renderWidget(element: JSX.Element, parentWidget: Widget, scene: Scene): void {
    const { type, props } = element;
    const widget = createWidget(type, scene);

    // Add event listeners.
    const isListener = name => name.startsWith("on");
    Object.keys(props).filter(isListener).forEach(name => {
        const eventType = name.toLowerCase().substring(2);
        widget.setEventListener(eventType, props[name]);
    });

    // Add attributes.
    const isAttribute = name => !isListener(name);
    Object.keys(props).filter(isAttribute).forEach(name => {
        widget.setAttr(name, props[name]);
    });

    // Append widget to parent widget.
    if (parentWidget)
        parentWidget.appendChild(widget);

    // Layout widget.
    layoutWidget(widget);

    // Render child widgets.
    const childElements = element.children || [];
    childElements.forEach(childElement => renderWidget(childElement, widget, scene));
}