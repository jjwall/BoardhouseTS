import { Widget } from "./widget";

export interface Element {
    type: string;
    props: object;
    children?: Element[];
}

export interface Instance {
    widget: Widget;
    element: Element;
}

export interface WidgetInstance extends Instance {
    children: Instance[];
}

export interface ComponentInstance extends Instance {
    child: Instance;
    componentInstance: Component;
}

export interface Component {
    internalInstnace: Instance;
}