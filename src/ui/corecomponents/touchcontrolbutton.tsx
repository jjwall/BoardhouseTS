// /** @jsx createJSXElement */
import { createJSXElement } from "./../../ui/createjsxelement";
import { JSXElement } from "./../../ui/interfaces";
import { Scene } from "THREE";
import { Component } from "./../../ui/component";

interface Props {
    /** Color or img url */
    pressedLayout: string;
    /** Color or img url */
    unpressedLayout: string;
    width: string | number,
    height: string | number,
    top: string | number,
    left: string | number,
    press: () => void;
    unpress: () => void;
    contents?: string,
    fontSize?: string | number,
    pressedFontColor?: string;
    unpressedFontColor?: string;
    fontTop?: string | number;
    fontLeft?: string | number;
    font?: string;
}

interface State {
    pressed: boolean;
}

export class TouchControlButton extends Component<Props, State> {
    constructor(props: Props, scene: Scene) {
        super(props, scene);
        this.state = {
            pressed: false,
        }
    }

    public press = (): void => {
        this.setState({
            pressed: true
        });

        this.props.press();
    }

    public unpress = (): void => {
        this.setState({
            pressed: false
        });

        this.props.unpress();
    }

    render(): JSXElement {
        // case: colored button (placeholder)
        if (this.props.pressedLayout.substr(0, 1) === "#") {
            return (
                <panel
                    color={this.state.pressed ? this.props.pressedLayout : this.props.unpressedLayout}
                    width={this.props.width}
                    height={this.props.height}
                    top={this.props.top}
                    left={this.props.left}
                    onPress={() => this.press()}
                    onUnpress={() => this.unpress()}
                >
                    <label
                        color={this.state.pressed ? this.props.pressedFontColor : this.props.unpressedFontColor}
                        top={this.props.fontTop}
                        left={this.props.fontLeft}
                        contents={this.props.contents}
                        font={this.props.font}
                        font_size={this.props.fontSize}>
                    </label>
                </panel>
            )
        }
        // case: img button
        else {
            return (
                <panel
                    img={this.state.pressed ? this.props.pressedLayout : this.props.unpressedLayout}
                    width={this.props.width}
                    height={() => this.props.height}
                    onPress={this.press()}
                    onUnpress={this.unpress()}
                >
                </panel>
            )
        }
    }
}