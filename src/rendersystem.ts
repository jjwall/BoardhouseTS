import { Entity } from "./entity";

export function renderSystem(app: PIXI.Application, ents: Readonly<Entity>[]) {
    for (let i = 0; i < ents.length; i++) {
        if (ents[i].sprite !== undefined) {
            // render...
        }
    }
}