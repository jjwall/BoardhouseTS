// /** @jsx createJSXElement */
import { createJSXElement } from "./ui/createjsxelement";
import { JSXElement } from "./ui/interfaces";
import { renderWidget } from "./ui/renderwidget";
import { Scene } from "THREE";
import { Widget } from "./ui/widget";
import { Component } from "./ui/component";

export function createGameUi(scene: Scene, rootWidget: Widget) {
    /* example 1 */

    let testui = (
        <panel height="70" width="300" color="#228B22" top="50" left="500" onClick={()=> console.log("hello")}>
            <panel height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                <label top="10" color="#0000FF" contents="blah"></label>
            </panel>
            <panel left="-100" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
            </panel>
            <panel left="100" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
            </panel>
        </panel>
    );

    /* example 2 */

        // const rootWidget = new Widget("root");
        // let clockElement: JSXElement;

        // function tick() {
        //     const time = new Date().toLocaleTimeString();
        //     clockElement = <panel><label top="50" left="60" contents={time}></label></panel>;
        //     // clockElement = <label top="50" left="60" contents={time} />;
        //     renderWidget(clockElement, rootWidget, scene);
        // }

        // tick();
        // setInterval(tick, 1000);

        // return clockElement;

    /* example 3 */

        // const rootWidget = new Widget("root");
        // renderWidget(testui, rootWidget, scene);
        renderWidget(<Test name="world!" />, rootWidget, scene);


}

interface Props {
    name: string;
}

interface State {
    ticks: number;
    clicks: number;
}

class Test extends Component<Props, State> {
    constructor(props: Props, scene: Scene) {
        super(props, scene);
        this.state = { ticks: 50, clicks: 0};

        setInterval(() => this.tick(), 1000);
    }
    tick(): void {
        this.setState({
            ticks: this.state.ticks + 1
        });
    }
    doWork(): void {
        this.setState({
            clicks: this.state.clicks + 1
        });
    }
    render(): JSXElement {
        // const text = `Hello ${this.props.name}`;

        return(
            <panel height="70" width="300" color="#228B22" top="250" left="500" >
                <panel z_index="1" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                    <label z_index="2" top="10" color="#0000FF" contents={this.state.ticks.toString()}></label>
                </panel>
                <panel left="-100" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                </panel>
                <panel left="100" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png" onClick={()=> this.doWork()}>
                    <label z_index="2" top="10" color="#FF0000" contents={this.state.clicks.toString()}></label>
                </panel>
            </panel>
            // <panel>
            //     <label top="50" left="100" contents={this.state.ticks.toString()} />
            // </panel>
        )
    }
}