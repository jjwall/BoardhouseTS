import { Entity } from "./entity";
import { setHitBoxGraphic } from "./helpers";
import { HurtTypes } from "./corecomponents";

/**
 * Rudimentary velocity implementation... will replace directions with
 * angle and magnitude later on
 */
export function velocitySystem(ents: Readonly<Entity>[]) : void {
    ents.forEach(ent => { 
        if (ent.vel !== undefined && ent.pos !== undefined) {
            if (ent.vel.left) {
                ent.pos.x -= ent.vel.speed;
            }

            if (ent.vel.right) {
                ent.pos.x += ent.vel.speed;
            }

            if (ent.vel.up) {
                ent.pos.y -= ent.vel.speed;
            }

            if (ent.vel.down) {
                ent.pos.y += ent.vel.speed;
            }
        }
    });
}

export function animationSystem(ents: Readonly<Entity>[]) : void {
    ents.forEach(ent => {
        if (ent.anim !== undefined && ent.sprite !== undefined) {
            ent.anim.ticks--;
            if (ent.anim.ticks <= 0) {
                ent.anim.frame = ent.anim.obj[ent.anim.sequence][ent.anim.frame]["nextFrame"];
                ent.anim.ticks = ent.anim.obj[ent.anim.sequence][ent.anim.frame]["ticks"];
                ent.sprite.texture = PIXI.utils.TextureCache[ent.anim.obj[ent.anim.sequence][ent.anim.frame]["texture"]];
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
        if (ent.control !== undefined && ent.vel !== undefined && ent.pos !== undefined) {
            if (ent.control.left) {
                ent.vel.left = true;
            }
            else {
                ent.vel.left = false;
            }
            if (ent.control.right) {
                ent.vel.right = true;
            }
            else {
                ent.vel.right = false;
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