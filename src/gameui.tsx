import { JSX } from "./ui/interfaces";
import { createElement } from "./ui/createelement";

export function createGameUi() : JSX.Element {
    return createElement(
        "panel",
        {
            height: 70,
            width: 300,
            color: "#228B22",
            onClick: () => console.log("event!!!"),
            img: "./data/textures/cottage.png",
            top: 50,
            left: 500,
        },
        createElement("panel",
            {
                height: 50,
                width: 50,
                color: "#00FFFF",
                img: "./data/textures/cottage.png",
                // top: 0,
                // left: 0,
                z_index: 1,
            },
            createElement(
                    "label",
                    {
                        nodeValue: "blah",
                        top: 10,
                        color: "#0000FF",
                        // font_size: 30,
                    }
            )
        )
    );
}