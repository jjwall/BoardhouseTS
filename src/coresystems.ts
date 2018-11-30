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