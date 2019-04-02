import { Widget, createWidget } from "./widget";
import { layoutWidget } from "./layoutwidget";
import { JSXElement } from "./interfaces";
import { Scene} from "three";

/**
 * React-like render method for widgets.
 * @param element 
 * @param parentWidget 
 * @param scene 
 */
export function renderWidget(element: JSXElement, parentWidget: Widget, scene: Scene): void {
    const { type, props } = element;

    if (!type) {
        parentWidget.setAttr("nodeValue", element as unknown as string);
        layoutWidget(parentWidget);
        return;
    }

    const widget = createWidget(type);

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

    // Append to parent or replace parent's last child.
    if (!parentWidget.lastChild)
        parentWidget.appendChild(widget, scene);
    else
        parentWidget.replaceChild(widget, parentWidget.lastChild);

    // Layout widget.
    if (type !== "label")
        layoutWidget(widget);

    // Render child widgets.
    const childElements = element.children || [];
    childElements.forEach(childElement => renderWidget(childElement, widget, scene));
}