// /** @jsx createElement */
import { createElement } from "./ui/createelement";
import { JSXElement } from "./ui/interfaces";
import { renderWidget } from "./ui/renderwidget";
import { Scene } from "THREE";
import { Widget } from "./ui/widget";

export function createGameUi(scene: Scene): JSXElement {
    // return (
        // <panel height="70" width="300" color="#228B22" top="50" left="500" onClick={()=> console.log("hello")}>
        //     <panel height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
        //         <label top="10" color="#0000FF">blah</label>
        //     </panel>
        //     <panel left="-100" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
        //     </panel>
        //     <panel left="100" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
        //     </panel>
        // </panel>
    // );
        const rootWidget = new Widget("root");
        let clockElement: JSXElement;

        function tick() {
            const time = new Date().toLocaleTimeString();
            // clockElement = <panel><label top="50" left="60">{time}</label></panel>;
            clockElement = <label top="50" left="60" contents={time} />;
            renderWidget(clockElement, rootWidget, scene);
        }

        tick();
        setInterval(tick, 1000);

        return clockElement;

        // return <label top="50" left="50">hey</label>
}
