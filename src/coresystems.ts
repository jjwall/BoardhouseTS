import * as THREE from "three";
import { Entity } from "./entity";
// import { setHitBoxGraphic } from "./helpers";
import { HurtTypes } from "./corecomponents";
import { Resources } from "./resourcemanager";
import { changeSequence } from "./helpers";
import { SequenceTypes } from "./animationschema";

/**
 * Rudimentary velocity implementation... will replace directions with
 * angle and magnitude later on
 */
export function velocitySystem(ents: Readonly<Entity>[]) : void {
    ents.forEach(ent => { 
        if (ent.vel && ent.pos) {
            if (ent.vel.friction) {
                ent.vel.positional.multiplyScalar(ent.vel.friction);
            }
            ent.pos.loc.add(ent.vel.positional);
            ent.pos.dir.applyEuler(ent.vel.rotational);
        }
    });
}

export function animationSystem(ents: Readonly<Entity>[]) : void {
    ents.forEach(ent => {
        if (ent.anim !== undefined && ent.sprite !== undefined) {
            ent.anim.ticks--;
            if (ent.anim.ticks <= 0) {
                ent.anim.frame = ent.anim.blob[ent.anim.sequence][ent.anim.frame].nextFrame;
                ent.anim.ticks = ent.anim.blob[ent.anim.sequence][ent.anim.frame].ticks;
                const newSpriteMap = Resources.instance.getTexture(ent.anim.blob[ent.anim.sequence][ent.anim.frame].texture);
                newSpriteMap.magFilter = THREE.NearestFilter;
                ent.sprite.material = new THREE.MeshBasicMaterial({ map: newSpriteMap, transparent: true });
            }
        }
    });
}

export function collisionSystem(ents: Readonly<Entity>[]) {
    ents.forEach(hittingEnt => {
        if (hittingEnt.hitBox && hittingEnt.pos) {
            ents.forEach(hurtingEnt => {
                if (hurtingEnt.hurtBox && hurtingEnt.pos) {
                    if (hittingEnt.hitBox.collidesWith.indexOf(hurtingEnt.hurtBox.type) > -1) {
                        if (hittingEnt.pos.loc.x - hittingEnt.hitBox.width / 2 < hurtingEnt.pos.loc.x + hurtingEnt.hurtBox.width/2 &&
                            hittingEnt.pos.loc.x + hittingEnt.hitBox.width / 2 > hurtingEnt.pos.loc.x - hurtingEnt.hurtBox.width/2 &&
                            hittingEnt.pos.loc.y - hittingEnt.hitBox.height / 2 < hurtingEnt.pos.loc.y + hurtingEnt.hurtBox.height/2 &&
                            hittingEnt.pos.loc.y + hittingEnt.hitBox.height / 2 > hurtingEnt.pos.loc.y - hurtingEnt.hurtBox.height/2) {
                            if (hittingEnt.hitBox.onHit) {
                                hittingEnt.hitBox.onHit(hittingEnt, hurtingEnt);
                            }

                            if (hurtingEnt.hurtBox.onHurt) {
                                hurtingEnt.hurtBox.onHurt(hurtingEnt, hittingEnt);
                            }
                        }
                    }
                }
            });
        }
    });
}

export function controlSystem(ents: Entity[]) {//ents: Readonly<Entity>[]){
    const posAccel: number = 0.1;

    ents.forEach(ent => {
        if (ent.control !== undefined && ent.vel !== undefined && ent.pos !== undefined) {
            if (ent.control.left) {
                ent.vel.positional.add(ent.pos.dir.clone().multiplyScalar(-posAccel));
                // test change seq
                ent.anim = changeSequence(SequenceTypes.attack, ent.anim);
            }
            if (ent.control.right) {
                ent.vel.positional.add(ent.pos.dir.clone().multiplyScalar(posAccel));
                // test change seq
                ent.anim = changeSequence(SequenceTypes.walk, ent.anim);
            }
            // test attack
            if (ent.control.attack && !ent.control.attacked) {
                ent.control.attacked = true;
                let attack = new Entity();
                attack.timer = { ticks: 15 };
                attack.pos.loc = ent.pos.loc;//x: ent.pos.x + 100, y: ent.pos.y + 50, z: 5};
                // attack.graphic = setHitBoxGraphic(stage, 50, 50);
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

export function positionSystem(ents: Readonly<Entity>[]) {
    for (let i = 0; i < ents.length; i++) {
        ents.forEach(ent => {
            if (ent.sprite && ent.pos) {
                ent.sprite.position.copy(ent.pos.loc);
                ent.sprite.rotation.set(0, 0, Math.atan2(ent.pos.dir.y, ent.pos.dir.x));
            }
        });
    }
}

export function timerSystem(ents: Entity[]) {
    ents.forEach(ent => {
        if (ent.timer !== undefined) {
            ent.timer.ticks--;

            if (ent.timer.ticks <= 0) {
                // remove ent for ent list
                ents.splice(ents.indexOf(ent), 1);

                // // destroy sprite if ent has one
                // if (ent.sprite !== undefined) {
                //     ent.sprite.destroy();
                // }

                // // destroy graphic if ent has one
                // if (ent.graphic !== undefined) {
                //     ent.graphic.destroy();
                // }
            }
        }
    });
}