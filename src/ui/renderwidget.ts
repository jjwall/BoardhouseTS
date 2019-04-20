import { JSXElement, Instance } from "./interfaces";
import { reconcile } from "./reconcile";
import { Widget } from "./widget";
import { Scene} from "three";

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