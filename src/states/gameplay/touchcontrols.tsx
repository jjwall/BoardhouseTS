// /** @jsx createJSXElement */
import { createJSXElement } from "./../../ui/createjsxelement";
import { JSXElement } from "./../../ui/interfaces";
import { Scene } from "THREE";
import { Component } from "./../../ui/component";
import { TouchControlButton } from "./../../ui/corecomponents/touchcontrolbutton";

interface Props {
    top?: string | number;
    left?: string | number;
    upPress: () => void;
    upUnpress: () => void;
    leftPress: () => void;
    leftUnpress: () => void;
    rightPress: () => void;
    rightUnpress: () => void;
    downPress: () => void;
    downUnpress: () => void;
}

export class TouchControls extends Component<Props, {}> {
    constructor(props: Props, scene: Scene) {
        super(props, scene);
    }
    render(): JSXElement {
        return (
            <panel top={this.props.top} left={this.props.left}>
                <TouchControlButton
                    height="150"
                    width="150"
                    top="75"
                    left="225"
                    pressedLayout="#3439FF"
                    unpressedLayout="#1f22dc"
                    contents="^"
                    fontSize="150"
                    pressedFontColor="#C9CFFF"
                    unpressedFontColor="#ffffff"
                    fontTop="130"
                    fontLeft="-25"
                    press={this.props.upPress}
                    unpress={this.props.upUnpress}
                />
                <TouchControlButton
                    height="150"
                    width="150"
                    top="225"
                    left="75"
                    pressedLayout="#3439FF"
                    unpressedLayout="#1f22dc"
                    contents="<"
                    fontSize="75"
                    pressedFontColor="#C9CFFF"
                    unpressedFontColor="#ffffff"
                    fontTop="35"
                    fontLeft="-10"
                    press={this.props.leftPress}
                    unpress={this.props.leftUnpress}
                />
                <TouchControlButton
                    height="150"
                    width="150"
                    top="225"
                    left="375"
                    pressedLayout="#3439FF"
                    unpressedLayout="#1f22dc"
                    contents=">"
                    fontSize="75"
                    pressedFontColor="#C9CFFF"
                    unpressedFontColor="#ffffff"
                    fontTop="35"
                    press={this.props.rightPress}
                    unpress={this.props.rightUnpress}
                />
                <TouchControlButton
                    height="150"
                    width="150"
                    top="375"
                    left="225"
                    pressedLayout="#3439FF"
                    unpressedLayout="#1f22dc"
                    contents="v"
                    fontSize="75"
                    pressedFontColor="#C9CFFF"
                    unpressedFontColor="#ffffff"
                    fontTop="35"
                    press={this.props.downPress}
                    unpress={this.props.downUnpress}
                />
            </panel>
        );
    }
}