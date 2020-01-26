// /** @jsx createJSXElement */
import { createJSXElement } from "../ui/createjsxelement";
import { JSXElement } from "../ui/interfaces";
import { Scene } from "THREE";
import { Component } from "../ui/component";

interface Props {
    ticks: number,
    clicks: number,
    color: string,
    hidden: boolean,
    hover: () => void,
    plunge: () => void,
    addClick: () => void,
    toggle: () => void,
}

interface State {
//     ticks: number;
//     clicks: number;
//     color: string;
}

export class Test extends Component<Props, State> {
    constructor(props: Props, scene: Scene) {
        super(props, scene);
    }

    render(): JSXElement {
        if (!this.props.hidden) {
            return(
                <panel height="70" width="300" color="#228B22" top="250" left="500" >
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel left="-100" height="50" width="50" color={this.props.color} img="./data/textures/cottage.png"
                        onHover={() => this.props.hover()}
                        onPlunge={() => this.props.plunge()}
                        onClick={() => this.props.toggle()}>
                    </panel>
                    <panel left="100" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png" onClick={()=> this.props.addClick()}>
                        <label z_index="2" top="10" color="#FF0000" contents={this.props.clicks.toString()}></label>
                    </panel>
                </panel>
            )
        }
        else {
            return(
                <panel height="70" width="300" color="#228B22" top="250" left="500" >
                    <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                        <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                    </panel>
                    <panel left="-100" height="50" width="50" color={this.props.color} img="./data/textures/cottage.png"
                        onHover={() => this.props.hover()}
                        onPlunge={() => this.props.plunge()}
                        onClick={() => this.props.toggle()}>
                    </panel>
                </panel>
            )
        }
    }
}