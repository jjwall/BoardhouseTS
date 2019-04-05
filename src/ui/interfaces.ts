import { Widget } from "./widget";

export interface JSXElement {
    type: string;
    props: object;
    children?: JSXElement[];
}

export interface Instance {
    widget: Widget;
    element: JSXElement;
}

export interface WidgetInstance extends Instance {
    children: WidgetInstance[];
}

export interface ComponentInstance extends Instance {
    child: Instance;
    componentInstance: Component;
}

export interface Component {
    internalInstnace: Instance;
}