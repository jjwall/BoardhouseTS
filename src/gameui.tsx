import { JSX } from "./ui/interfaces";
// /** @jsx createElement */
import { createElement } from "./ui/createelement";

export function createGameUi() : JSX.Element {
    return (
        <panel height="70" width="300" color="#228B22" top="50" left="500">
            <panel height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
                <label top="10" color="#0000FF">blah</label>
            </panel>
            <panel left="-100" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
            </panel>
            <panel left="100" height="50" width="50" color="#00FFFF" img="./data/textures/cottage.png">
            </panel>
        </panel>
    );
}