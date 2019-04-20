import { Instance, JSXElement, WidgetInstance, ComponentInstance } from "./interfaces";
import { updateWidgetProperties } from "./updatewidgetproperties";
import { createWidget } from "./widget";
import { createComponent } from "./component";
import { Scene } from "three";

export function instantiate(element: JSXElement, scene: Scene): Instance {
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
