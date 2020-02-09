// /** @jsx createJSXElement */
import { createJSXElement } from "./../../ui/createjsxelement";
import { JSXElement, ComponentInstance } from "./../../ui/interfaces";
import { renderWidget } from "./../../ui/renderwidget";
import { Scene } from "THREE";
import { Widget } from "./../../ui/widget";
import { Component } from "./../../ui/component";

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
            panelColor: "#1f22dc", // Start button color
            fontColor: "#C9CFFF", // Start text color
            start: false,
        }
    }

    public hover = (): void => {
        this.setState({
            panelColor: "#3439FF", // Hover button color
            fontColor: "#ffffff" // Hover text color
        });
    }

    public plunge = (): void => {
        this.setState({
            panelColor: "#1f22dc", // Idle button color
            fontColor: "#C9CFFF" // Idle text color
        });
    }

    public triggerStartGame = (): void => {
        this.props.startGame();
    }

    render(): JSXElement {
        return(
            <div>
                <panel 
                    z_index="-1" width="1280" height="720" color="#282828" img="./data/textures/space4096Square.png" 
                    left="640" top="390"
                />
                <panel height="120" /*color="red"*/ width="600" top="200" left="640">
                    <label top="50" color="#C9CFFF" font_size="100" contents="Game"></label>
                </panel>
                <panel height="120" /*color="red"*/ width="800" top="400" left="640">
                    <label top="50" color="#C9CFFF" font_size="100" contents="Name"></label>
                </panel>
                <panel height="70" width="300" color={this.state.panelColor} top="600" left="640"
                    onHover={() => this.hover()}
                    onPlunge={() => this.plunge()}
                    onClick={() => this.triggerStartGame()}>
                    <label top="10" color={this.state.fontColor} contents="start"></label>
                </panel>
            </div>
        )
    }
}