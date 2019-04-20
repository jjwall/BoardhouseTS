import { Widget, createWidget } from "./widget";
import { JSXElement, Instance, WidgetInstance, ComponentInstance } from "./interfaces";
import { Scene} from "three";
import { createComponent } from "./component";

let rootInstance: Instance = null;
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

export function reconcile(parentWidget: Widget, instance: Instance, element: JSXElement, scene: Scene): Instance {
    if (instance == null) {
        // Create instance.
        const newInstance = instantiate(element, scene);
        parentWidget.appendChild(newInstance.widget, scene);

        return newInstance;
    }
    else if (element == null) {
        // Remove instance.
        parentWidget.removeChild(instance.widget);
        // TODO: layout widget to remove visual attributes here?

        return null;
    }
    else if (instance.element.type !== element.type) {
        // Replace instance.
        const newInstance = instantiate(element, scene);
        parentWidget.replaceChild(newInstance.widget, instance.widget);

        return newInstance;
    }
    else if (typeof element.type === "string") {
        // Update widget instance.
        let widgetInstance = instance as WidgetInstance;
        updateWidgetProperties(widgetInstance.widget, widgetInstance.element.props, element.props);
        widgetInstance.children = reconcileChildren(widgetInstance, element, scene);
        widgetInstance.element = element;
        return widgetInstance;
    }
    else {
        // Update component instance.
        let componentInstance = instance as ComponentInstance;
        componentInstance.component.props = element.props;
        const childElement = componentInstance.component.render();
        const oldChildInstance = componentInstance.child;
        const childInstance = reconcile(parentWidget, oldChildInstance, childElement, scene);
        componentInstance.widget = childInstance.widget;
        componentInstance.child = childInstance;
        componentInstance.element = element;
        
        return componentInstance;
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

function instantiate(element: JSXElement, scene: Scene): Instance {
    if (typeof element === "string")
        throw Error('If you are trying to set text try: <label contents="Hello world!"/>');

    const { type, props } = element;
    const isWidgetElement = typeof type === "string";

    if (isWidgetElement) {
        // Instantiate Widget element.

        const widget = createWidget(type as string);

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
    else {
        // Instantiate component element.
        let instance: ComponentInstance = {
            component: undefined,
            child: undefined,
            widget: undefined,
            element: undefined
        };
        const component = createComponent(element, instance, scene);
        const childElement = component.render();
        const childInstance = instantiate(childElement, scene);
        const widget = childInstance.widget;

        instance.component = component;
        instance.child = childInstance;
        instance.widget = widget;
        instance.element = element;

        return instance;
    }
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