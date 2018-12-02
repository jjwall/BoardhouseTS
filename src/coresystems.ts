import { Entity } from "./entity";
import { setHitBoxGraphic } from "./helpers";
import { HurtTypes } from "./corecomponents";

export function animationSystem(ents: Readonly<Entity>[]) : void {
    ents.forEach(ent => {
        if (ent.anim !== undefined && ent.sprite !== undefined) {
            ent.anim.ticks--;
            if (ent.anim.ticks <= 0) {
                ent.anim.frame = ent.anim.animObj[ent.anim.animation][ent.anim.frame]["nextFrame"];
                ent.anim.ticks = ent.anim.animObj[ent.anim.animation][ent.anim.frame]["ticks"];
                ent.sprite.texture = PIXI.utils.TextureCache[ent.anim.animObj[ent.anim.animation]["texture"]];
            }
        }
    });
}

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
                let attack = new Entity();
                attack.timer = { ticks: 15 };
                attack.pos = {x: ent.pos.x + 100, y: ent.pos.y + 50};
                attack.graphic = setHitBoxGraphic(stage, 50, 50);
                attack.hitBox = { 
                    collidesWith: [HurtTypes.test], 
                    height: 50, 
                    width: 50, 
                    onHit: function() { console.log("hit")
                }};
                ents.push(attack);
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

export function timerSystem(ents: Entity[]) {
    ents.forEach(ent => {
        if (ent.timer !== undefined) {
            ent.timer.ticks--;

            if (ent.timer.ticks <= 0) {
                // remove ent for ent list
                ents.splice(ents.indexOf(ent), 1);

                // destroy sprite if ent has one
                if (ent.sprite !== undefined) {
                    ent.sprite.destroy();
                }

                // destroy graphic if ent has one
                if (ent.graphic !== undefined) {
                    ent.graphic.destroy();
                }
            }
        }
    });
}