// /** @jsx createJSXElement */
import { createJSXElement } from "./ui/createjsxelement";
import { JSXElement, ComponentInstance } from "./ui/interfaces";
import { renderWidget } from "./ui/renderwidget";
import { Scene } from "THREE";
import { Widget } from "./ui/widget";
import { Component } from "./ui/component";
import { Test } from "./gameui";


export function renderGameUi(scene: Scene, rootWidget: Widget): Root {
    let rootInstance = renderWidget(<Root />, rootWidget, scene);

    return rootInstance.component as Root;
}


interface Props {
    // name: string;
    // initial_state: object
}

interface State {
    ticks: number;
    clicks: number;
    color: string;
    hidden: boolean;
}

export class Root extends Component<Props, State> {
    constructor(props: Props, scene: Scene) {
        super(props, scene);
        this.state = { 
            ticks: 50, 
            clicks: 0, 
            color: "#00FFFF",
            hidden: false,
        };

        setInterval(() => this.tick(), 1000);
    }

    public addClick = (): void => {
        this.setState({
            clicks: this.state.clicks + 1
        });
    }

    public tick = (): void => {
        this.setState({
            ticks: this.state.ticks + 1
        });
    }

    public hover = (): void => {
        this.setState({
            color: "#FF0000"
        });
    }

    public plunge = (): void => {
        this.setState({
            color: "#00FFFF"
        });
    }

    public toggle = (): void => {
        if (this.state.hidden) {
            this.setState({
                hidden: false
            });
        }
        else {
            this.setState({
                hidden: true
            });
        }
    }

    render(): JSXElement {
        return(
            <Test ticks = {this.state.ticks}
                clicks = {this.state.clicks}
                color = {this.state.color}
                hidden = {this.state.hidden}
                hover = {this.hover}
                plunge = {this.plunge}
                addClick = {this.addClick}
                toggle = {this.toggle}
            />
        )
    }
}