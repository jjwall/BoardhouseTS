// /** @jsx createJSXElement */
import { createJSXElement } from "../ui/createjsxelement";
import { JSXElement, ComponentInstance } from "../ui/interfaces";
import { renderWidget } from "../ui/renderwidget";
import { Scene } from "THREE";
import { Widget } from "../ui/widget";
import { Component } from "../ui/component";

/**
 * Main Menu UI objects
 */

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
            panelColor: "#1f22dc",
            fontColor: "#C9CFFF", // Start color
            start: false,
        }
    }

    public hover = (): void => {
        this.setState({
            panelColor: "#3439FF", 
            fontColor: "#ffffff" // Hover color
        });
    }

    public plunge = (): void => {
        this.setState({
            panelColor: "#1f22dc",
            fontColor: "#C9CFFF" // Idle color
        });
    }

    public triggerStartGame = (): void => {
        this.props.startGame();
    }

    render(): JSXElement {
        return(
            <div>
                <panel height="70" width="300" color={this.state.panelColor} top="360" left="640"
                    onHover={() => this.hover()}
                    onPlunge={() => this.plunge()}
                    onClick={() => this.triggerStartGame()}>
                    <label top="10" color={this.state.fontColor} contents="start"></label>
                </panel>
            </div>
        )
    }
}