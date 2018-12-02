import { Entity } from "./entity";
import { setHitBoxGraphic } from "./helpers";
import { HurtTypes } from "./corecomponents";

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

export function controlSystem(ents: Readonly<Entity>[], stage: PIXI.Container) {
    ents.forEach(ent => {
        if (ent.control !== undefined && ent.pos !== undefined) {
            if (ent.control.left) {
                ent.pos.x--;
            }
            if (ent.control.right) {
                ent.pos.x++;
            }
            // test attack
            if (ent.control.attack && !ent.control.attacked) {
                ent.control.attacked = true;
                let attackAnim = new Entity();
                attackAnim.pos = {x: ent.pos.x + 100, y: ent.pos.y + 50};
                attackAnim.graphic = setHitBoxGraphic(stage, 50, 50);
                attackAnim.hitBox = { 
                    collidesWith: [HurtTypes.test], 
                    height: 50, 
                    width: 50, 
                    onHit: function() { console.log("hit")
                }};
                ents.push(attackAnim);
                console.log("attack!");
            }

            if (ent.control.attacked) {
                ent.control.attackTimer++;
            }

            if (ent.control.attackTimer > 75) {
                ent.control.attacked = false;
                ent.control.attackTimer = 0;
            }
        }
    });
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