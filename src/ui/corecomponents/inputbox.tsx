// /** @jsx createJSXElement */
import { createJSXElement } from "./../../ui/createjsxelement";
import { JSXElement } from "./../../ui/interfaces";
import { Scene } from "THREE";
import { Component } from "./../../ui/component";

interface Props {
    focusColor: string,
    blurColor: string,
    borderColor: string,
    width: number,
    height: number,
    top: string | number,
    left: string | number,
    placeholder: string,
    contents?: string,
    fontColor?: string,
    fontSize?: string | number,
    fontTop?: string | number;
    fontLeft?: string | number;
    font?: string;
    // submit: () => void,
    currentKey: string,
}

let tempText = "";

interface State {
    focused: boolean;
    text: string;
}

export class InputBox extends Component<Props, State> {
    constructor(props: Props, scene: Scene) {
        super(props, scene);
        this.state = {
            focused: false,
            text: "",
        }
    }

    // public press = (): void => {
    //     this.setState({
    //         pressed: true
    //     });
    // }

    // public unpress = (): void => {
    //     this.setState({
    //         focused: false
    //     });
    // }
    public updateText = (): void => {
        this.setState({
            text: this.state.text + this.props.currentKey
        });

    }

    public focus = (): void => {
        this.setState({
            focused: true
        });
    }

    public blur = (): void => {
        if (this.state.focused) {
            this.setState({
                focused: false
            });
        }
    }

    public displayContents = (focused: boolean, currentKey: string): string => {
        // this.updateText();
        if (currentKey !== "") {
            // this.setState({
            //     text: this.state.text + this.props.currentKey
            // });
            tempText += currentKey;
        }

        if (focused) {
            if (this.state.text.length === 0) {
                return "|";
            }
            else {
                //return this.state.text + "|";
                return tempText + "|";
            }
        }
        else {
            if (this.state.text.length === 0) {
                return this.props.placeholder;
            }
            else {
                // return this.state.text;
                return tempText;
            }
        }
    }

    render(): JSXElement {
        return (
        // <panel height="35" width="310" color="#FFFFFF" top="400" left="640">
        //     <panel height="25" width="300" color="#000000"></panel>
        // </panel>
            <panel
                height={this.props.height + 10}
                width={this.props.width + 10}
                color={this.props.borderColor}
                top={this.props.top}
                left={this.props.left}
            >
                <panel
                    color={this.state.focused ? this.props.focusColor : this.props.blurColor}
                    height={this.props.height}
                    width={this.props.width}
                    onBlur={() => this.blur()}
                    onFocus={() => this.focus()}
                >
                    <label
                        // color={this.state.pressed ? this.props.pressedFontColor : this.props.unpressedFontColor}
                        color = {this.props.fontColor}
                        top={this.props.fontTop}
                        left={this.props.fontLeft}
                        contents={this.props.currentKey}//{this.displayContents(this.state.focused, this.props.currentKey)}//{this.state.focused ? this.state.text + "|" : this.state.text}
                        font={this.props.font}
                        font_size={this.props.fontSize}>
                    </label>
                </panel>
            </panel>
        )
    }
}