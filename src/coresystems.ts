import { Entity } from "./entity";

export function collisionSystem(ents: Readonly<Entity>[]) {
    ents.forEach(hittingEnt => {
        if (hittingEnt.hitBox !== undefined && hittingEnt.pos !== undefined) {
            ents.forEach(hurtingEnt => {
                if (hurtingEnt.hurtBox !== undefined && hurtingEnt.pos !== undefined) {
                    if (hittingEnt.hitBox.collidesWith.indexOf(hurtingEnt.hurtBox.type) > -1) {
                        if (hittingEnt.pos.x < hurtingEnt.pos.x + hurtingEnt.hurtBox.width &&
                            hittingEnt.pos.x + hittingEnt.hitBox.width > hurtingEnt.pos.x &&
                            hittingEnt.pos.y < hurtingEnt.pos.y + hurtingEnt.hurtBox.height &&
                            hittingEnt.hitBox.height + hittingEnt.pos.y > hurtingEnt.pos.y)
                        {
                            hittingEnt.hitBox.onHit();
                            hurtingEnt.hurtBox.onHurt();
                        }
                    }
                }
            });
        }
    });
}

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

        if (ents[i].graphic !== undefined && ents[i].pos !== undefined) {
            ents[i].graphic.x = ents[i].pos.x;
            ents[i].graphic.y = ents[i].pos.y;
        }
    }
}