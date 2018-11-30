import { Entity } from "./entity";

export function controlSystem(ents: Readonly<Entity>[]) {
    for (let i = 0; i < ents.length; i++) {
        if (ents[i].control !== undefined && ents[i].pos !== undefined) {
            if (ents[i].control.left) {
                ents[i].pos.x--;
            }
            if (ents[i].control.right) {
                ents[i].pos.x++;
            }
        }
    }
}

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