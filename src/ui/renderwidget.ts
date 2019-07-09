import { JSXElement, Instance, ComponentInstance } from "./interfaces";
import { reconcile } from "./reconcile";
import { Widget } from "./widget";
import { Scene} from "three";

/**
 * React-like render method for widgets.
 * @param element 
 * @param parentWidget 
 * @param scene 
 */
export function renderWidget(element: JSXElement, container: Widget, scene: Scene): ComponentInstance {
    let rootInstance: ComponentInstance = null;
    const prevInstance = rootInstance;
    const nextInstance = reconcile(container, prevInstance, element, scene)
    rootInstance = nextInstance as ComponentInstance;

    return rootInstance;
}