import { Widget, createWidget } from "./widget";
import { layoutWidget } from "./layoutwidget";
import { JSXElement, Instance, WidgetInstance } from "./interfaces";
import { Scene} from "three";

let rootInstance = null;
/**
 * React-like render method for widgets.
 * @param element 
 * @param parentWidget 
 * @param scene 
 */
export function renderWidget(element: JSXElement, container: Widget, scene: Scene): void {
    const prevInstance = rootInstance;
    const nextInstance = reconcile(container, prevInstance, element, scene)
    rootInstance = nextInstance;
}

function reconcile(parentWidget: Widget, instance: WidgetInstance, element: JSXElement, scene: Scene): Instance {
    if (instance == null) {
        // Create instance.
        const newInstance = instantiate(element, scene);
        parentWidget.appendChild(newInstance.widget, scene);
        layoutWidget(newInstance.widget);

        return newInstance;
    }
    else if (element == null) {
        // Remove instance.
        parentWidget.removeChild(instance.widget);
        // TODO: layout widget to remove visual attributes here?

        return null;
    }
    else if (instance.element.type === element.type) {
        // Update instance.
        updateWidgetProperties(instance.widget, instance.element.props, element.props);
        instance.children = reconcileChildren(instance, element, scene);
        instance.element = element;
        layoutWidget(instance.widget);
        return instance;
    }
    else {
        // Replace instance.
        const newInstance = instantiate(element, scene);
        parentWidget.replaceChild(newInstance.widget, instance.widget);
        layoutWidget(newInstance.widget);

        return newInstance;
    }
}

function reconcileChildren(instance: WidgetInstance, element: JSXElement, scene: Scene): WidgetInstance[] {
    const widget = instance.widget;
    const childInstances = instance.children;
    const nextChildElements = element.children || [];
    const newChildInstances = [];
    const count = Math.max(childInstances.length, nextChildElements.length);

    for (let i = 0; i < count; i++) {
        const childInstance = childInstances[i];
        const childElement = nextChildElements[i];
        const newChildInstance = reconcile(widget, childInstance, childElement, scene);
        newChildInstances.push(newChildInstance);
    }

    return newChildInstances.filter(instance => instance != null);
}

function instantiate(element: JSXElement, scene: Scene): WidgetInstance {
    if (typeof element === "string")
        throw Error('If you are trying to set text try: <label contents="Hello world!"/>');

    const { type, props } = element;

    const widget = createWidget(type);

    updateWidgetProperties(widget, {}, props);

    // Instantiate and append children.
    const childElements = element.children || [];
    const childInstances = childElements.map(childElement => instantiate(childElement, scene));
    const childWidgets = childInstances.map(childInstance => childInstance.widget);
    childWidgets.forEach(childWidget => widget.appendChild(childWidget, scene));

    const instance: WidgetInstance = {
        widget: widget,
        element: element,
        children: childInstances,
    }

    return instance;
}

function updateWidgetProperties(widget: Widget, prevProps: object, nextProps: object): void {
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