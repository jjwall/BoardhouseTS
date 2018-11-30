import { Entity } from "./entity";

export function renderSystem(ents: Readonly<Entity>[], canvas: HTMLCanvasElement) {
    for (let i = 0; i < ents.length; i++) {
        if (ents[i].sprite !== undefined && ents[i].pos !== undefined) {
            ents[i].sprite.x = ents[i].pos.x;
            ents[i].sprite.y = ents[i].pos.y;

            // if we want to flip sprite's y coordinate
            // ents[i].sprite.y = canvas.height - ents[i].pos.y - ents[i].sprite.height;
        }
    }
}