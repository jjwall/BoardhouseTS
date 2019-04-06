import { Widget } from "./widget";
import { Component } from "./component";
import { Scene } from "three";

export interface JSXElement {
    type: string | { new(props: {}, scene: Scene): Component<{}, any> } ;
    props: object;
    children?: JSXElement[];
}

export interface Instance {
    widget: Widget;
    element: JSXElement;
}

export interface WidgetInstance extends Instance {
    children: Instance[];
}

export interface ComponentInstance extends Instance {
    child: Instance;
    component: Component<{}, any>;
}