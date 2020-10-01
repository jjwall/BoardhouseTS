// /** @jsx createJSXElement */
import { createJSXElement } from "./../../ui/createjsxelement";
import { JSXElement, ComponentInstance } from "./../../ui/interfaces";
import { renderWidget } from "./../../ui/renderwidget";
import { Scene } from "THREE";
import { Widget } from "./../../ui/widget";
import { Component } from "./../../ui/component";
import { Test } from "./ui";
import { TouchControlButton } from "./../../ui/corecomponents/touchcontrolbutton";
import { TouchControls } from "./touchcontrols";
import { FPS } from "../../ui/corecomponents/fps";
import { InputBox } from "../../ui/corecomponents/inputbox";

export function renderGamePlayUi(scene: Scene, rootWidget: Widget, props: Props): Root {
    let rootInstance = renderWidget(<Root { ...props }/>, rootWidget, scene);

    return rootInstance.component as Root;
}


interface Props {
    // name: string;
    // initial_state: object
    addClicks: Function,
    displayFPS: boolean;
    leftPress: () => void;
    leftUnpress: () => void;
    rightPress: () => void;
    rightUnpress: () => void;
    upPress: () => void;
    upUnpress: () => void;
    downPress: () => void;
    downUnpress: () => void;
}

interface State {
    ticks: number;
    clicks: number;
    color: string;
    hidden: boolean;
    currentFPS: number;
}

export class Root extends Component<Props, State> {
    constructor(props: Props, scene: Scene) {
        super(props, scene);
        this.state = {
            currentFPS: 0,
            ticks: 50,
            clicks: 0,
            color: "#00FFFF",
            hidden: false,
        };

        setInterval(() => this.tick(), 1000);
    }

    public addClick = (): void => {
        if (!!this.props.addClicks) {
            this.props.addClicks();
        }
    }

    public setClicks = (clicks: number) => {
        this.setState({
            clicks: clicks
        });
    }

    public tick = (): void => {
        this.setState({
            ticks: this.state.ticks + 1
        });
    }

    public updateFPS = (currentFPS: number): void => {
        this.setState({
            currentFPS: currentFPS
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
            // <Test ticks = {this.state.ticks}
            //     clicks = {this.state.clicks}
            //     color = {this.state.color}
            //     hidden = {this.state.hidden}
            //     press = {this.press}
            //     unpress = {this.unpress}
            //     addClick = {this.addClick}
            //     toggle = {this.toggle}>
            // </Test>
            <panel>
                <FPS 
                    displayFPS={this.props.displayFPS}
                    currentFPS={this.state.currentFPS}
                ></FPS>
                <TouchControls
                    top="250"
                    left="50"
                    upPress={this.props.upPress}
                    upUnpress={this.props.upUnpress}
                    leftPress={this.props.leftPress}
                    leftUnpress={this.props.leftUnpress}
                    rightPress={this.props.rightPress}
                    rightUnpress={this.props.rightUnpress}
                    downPress={this.props.downPress}
                    downUnpress={this.props.downUnpress}
                />
                <InputBox
                    focusColor="#FFFFFF"
                    blurColor="#C9CFFF"
                    borderColor="#000000"
                    top="200"
                    left="200"
                    width={100}
                    height={50}
                    submit={()=>{}}
                />
            </panel>
        )
    }
}