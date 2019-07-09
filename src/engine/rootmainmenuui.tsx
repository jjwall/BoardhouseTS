// /** @jsx createJSXElement */
import { createJSXElement } from "../ui/createjsxelement";
import { JSXElement, ComponentInstance } from "../ui/interfaces";
import { renderWidget } from "../ui/renderwidget";
import { Scene } from "THREE";
import { Widget } from "../ui/widget";
import { Component } from "../ui/component";

export function renderMainMenuUi(scene: Scene, rootWidget: Widget, startGame: () => void): MainMenuRoot {
    let rootInstance = renderWidget(<MainMenuRoot startGame = {startGame} />, rootWidget, scene);

    return rootInstance.component as MainMenuRoot;
}

interface Props {
    startGame: () => void;
}

interface State {
    panelColor: string;
    fontColor: string;
    start: boolean;
}

export class MainMenuRoot extends Component<Props, State> {
    constructor(props: Props, scene: Scene) {
        super(props, scene);
        this.state = {
            panelColor: "#228B22",
            fontColor: "#0000FF",
            start: false,
        }
    }

    public hover = (): void => {
        this.setState({
            fontColor: "#FF0000",
            panelColor: "#00FFFF"
        });
    }

    public plunge = (): void => {
        this.setState({
            fontColor: "#0000FF",
            panelColor: "#228B22"
        });
    }

    public triggerStartGame = (): void => {
        this.props.startGame();
    }

    render(): JSXElement {
        return(
            <panel height="70" width="300" color={this.state.panelColor} top="360" left="640"
                onHover={() => this.hover()}
                onPlunge={() => this.plunge()}
                onClick={() => this.triggerStartGame()}>
                <label top="10" color={this.state.fontColor} contents="start"></label>
            </panel>
        )
    }
}