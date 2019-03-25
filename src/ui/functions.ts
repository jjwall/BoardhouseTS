import { PlaneGeometry, MeshBasicMaterial, Scene } from "three";
import { Widget } from "./classes";
import { Element } from "./interfaces";

/**
 * React-like render method for widgets.
 * @param element 
 * @param parentWidget 
 * @param scene 
 */
export function renderWidget(element: Element, parentWidget: Widget, scene: Scene): void {
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

    // Render child widgets.
    const childElement = element.children || [];
    childElement.forEach(childElement => renderWidget(childElement, widget, scene));

    // Layout widget.
    layoutWidget(widget);

    // Append widget to parent widget.
    parentWidget.appendChild(widget);
}

/**
 * Returns new Widget and add it's mesh to the scene.
 * @param type 
 * @param scene 
 */
function createWidget(type: string, scene: Scene): Widget {
    let widget = new Widget(type);
    scene.add(widget);
    return widget;
}

/**
 * Layout widget by updating Mesh properties for any relevant attribute.
 * Gets called when Widget is create or setState is called.
 * @param widget 
 */
function layoutWidget(widget: Widget): void {
    // cycle through attrs and update visible properties using Object3D base class
    if (widget.attr("height") && widget.attr("width")) {
        widget.geometry = new PlaneGeometry(Number(widget.attr("width")), Number(widget.attr("height")));
    }

    if (widget.attr("color")) {
        widget.material = new MeshBasicMaterial({color: widget.attr("color")});
    }
}