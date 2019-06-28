// /** @jsx createJSXElement */
import { createJSXElement } from "./ui/createjsxelement";
import { JSXElement } from "./ui/interfaces";
import { Scene } from "THREE";
import { Component } from "./ui/component";

interface Props {
    ticks,
    clicks,
    color,
    hover,
    plunge,
    doWork,
}

// interface State {
//     ticks: number;
//     clicks: number;
//     color: string;
// }

export class Test extends Component<Props, {}> {
    constructor(props: Props, scene: Scene) {
        super(props, scene);
    }

    render(): JSXElement {
        return(
            <panel height="70" width="300" color="#228B22" top="250" left="500" >
                <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                    <label z_index="2" top="10" color="#0000FF" contents={this.props.ticks.toString()}></label>
                </panel>
                <panel left="-100" height="50" width="50" color={this.props.color} img="./data/textures/cottage.png"
                onHover={() => this.props.hover()}
                onPlunge={() => this.props.plunge()}>
                </panel>
                <panel left="100" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png" onClick={()=> this.props.doWork()}>
                    <label z_index="2" top="10" color="#FF0000" contents={this.props.clicks.toString()}></label>
                </panel>
            </panel>
        )
    }
}