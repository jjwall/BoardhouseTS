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

function reconcile(parentWidget: Widget, instance: Instance, element: JSXElement, scene: Scene): Instance {
    if (instance == null) {
        const newInstance = instantiate(element, scene);
        parentWidget.appendChild(newInstance.widget, scene);
        layoutWidget(newInstance.widget);

        return newInstance;
    }
    else {
        const newInstance = instantiate(element, scene);
        parentWidget.replaceChild(newInstance.widget, instance.widget);
        layoutWidget(newInstance.widget);

        return newInstance;
    }
}

function instantiate(element: JSXElement, scene: Scene): Instance {
    if (typeof element === "string")
        throw Error('If you are trying to set text try: <label contents="Hello world!"/>');

    const { type, props } = element;

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