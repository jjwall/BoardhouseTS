// /** @jsx createJSXElement */
import { createJSXElement } from "./../../ui/createjsxelement";
import { JSXElement, ComponentInstance } from "./../../ui/interfaces";
import { renderWidget } from "./../../ui/renderwidget";
import { Scene } from "THREE";
import { Widget } from "./../../ui/widget";
import { Component } from "./../../ui/component";

export function renderLoadUi(scene: Scene, rootWidget: Widget): LoadRoot {
    let rootInstance = renderWidget(<LoadRoot/>, rootWidget, scene);

    return rootInstance.component as LoadRoot;
}

interface Props {}

interface State {
    loadProgress: number;
}

export class LoadRoot extends Component<Props, State> {
    constructor(props: Props, scene: Scene) {
        super(props, scene);
        this.state = {
            loadProgress: 0,
        }

        // setInterval(() => this.updateLoadBar(), 1000);
    }

    // public updateLoadBar = (): void => {
    //     this.setState({
    //         loadProgress: this.state.loadProgress + 10
    //     });
    // }

    render(): JSXElement {
        return(
            <div>
                <panel height="120" width="600" top="300" left="640">
                    <label top="50" color="#FFFFFF" font_size="20" contents="Loading..."></label>
                </panel>
                {/* <panel height="35" width="310" color="#FFFFFF" top="400" left="640">
                    <panel height="25" width="300" color="#000000"></panel>
                </panel>
                <panel height="25" width={this.state.loadProgress} color="#FFFFFF" top="400" left="640"></panel> */}
            </div>
        )
    }
}