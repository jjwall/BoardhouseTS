// /** @jsx createJSXElement */
import { createJSXElement } from "./../../ui/createjsxelement";
import { JSXElement, ComponentInstance } from "./../../ui/interfaces";
import { renderWidget } from "./../../ui/renderwidget";
import { Scene } from "THREE";
import { Widget } from "./../../ui/widget";
import { Component } from "./../../ui/component";
import { Engine } from "./../../engine/engine";
import { Button } from "./../../ui/corecomponents/button";

export function renderMainMenuUi(scene: Scene, rootWidget: Widget, engine: Engine, startGame: () => void): MainMenuRoot {
    let rootInstance = renderWidget(<MainMenuRoot engine = {engine} startGame = {startGame} />, rootWidget, scene);

    return rootInstance.component as MainMenuRoot;
}

interface Props {
    engine: Engine,
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
                    z_index="-1"
                    img="./data/textures/space4096Square.png" 
                    pixel-ratio="2"
                />
                {/* <panel 
                    height="300"
                    width="300"
                    top={.2 * this.props.engine.screenHeight} 
                    left={.5 * this.props.engine.screenWidth}
                    img="./data/textures/logo.png"
                    pixel-ratio="4"
                >
                </panel> */}
                <panel height="120" /*color="red"*/ width="600" top="150" left="640">
                    <label top="50" color="#C9CFFF" font_size="100" contents="Game"></label>
                </panel>
                <panel height="120" /*color="red"*/ width="800" top="350" left="640">
                    <label top="50" color="#C9CFFF" font_size="100" contents="Name"></label>
                </panel>
                <Button
                    height="50"
                    width="200"
                    top={this.props.engine.screenHeight * .75}
                    left={this.props.engine.screenWidth * .5}
                    pressedLayout="#3439FF"
                    unpressedLayout="#1f22dc"
                    contents="Play"
                    fontSize="20"
                    pressedFontColor="#C9CFFF"
                    unpressedFontColor="#ffffff"
                    fontTop="10"
                    submit={() => this.triggerStartGame()}>
                </Button>
            </div>
        )
    }
}