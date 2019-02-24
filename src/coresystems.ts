import {
    Scene,
    MeshBasicMaterial,
    NearestFilter,
} from "three";
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
export function velocitySystem(ents: ReadonlyArray<Entity>) : void {
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

/**
 * Animation System.
 * @param ents Lists of ents to run system with. Must have anim and sprite components.
 */
export function animationSystem(ents: ReadonlyArray<Entity>) : void {
    ents.forEach(ent => {
        if (ent.anim && ent.sprite) {
            ent.anim.ticks--;
            if (ent.anim.ticks <= 0) {
                ent.anim.frame = ent.anim.blob[ent.anim.sequence][ent.anim.frame].nextFrame;
                ent.anim.ticks = ent.anim.blob[ent.anim.sequence][ent.anim.frame].ticks;

                const newSpriteMap = Resources.instance.getTexture(ent.anim.blob[ent.anim.sequence][ent.anim.frame].texture);
                newSpriteMap.magFilter = NearestFilter;
                ent.sprite.material = new MeshBasicMaterial({ map: newSpriteMap, transparent: true });
            }
        }
    });
}

/**
 * Collision system.
 * @param ents List of ents to run system with. Hitting ents must have hitBox and pos components.
 * Hurting ents must have hurtBox and pos components.
 */
export function collisionSystem(ents: ReadonlyArray<Entity>) {
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

/**
 * Control system.
 * @param ents Set up special registry for ents with control system.
 */
export function controlSystem(ents: ReadonlyArray<Entity>){
    const posAccel: number = 0.1;

    ents.forEach(ent => {
        if (ent.control && ent.vel && ent.pos) {
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
                // attack.timer = { ticks: 15 };
                attack.pos.loc = ent.pos.loc;//x: ent.pos.x + 100, y: ent.pos.y + 50, z: 5};
                // attack.graphic = setHitBoxGraphic(stage, 50, 50);
                attack.hitBox = { 
                    collidesWith: [HurtTypes.test], 
                    height: 50, 
                    width: 50, 
                    onHit: function() { console.log("hit")
                }};
                //ents.push(attack);
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

/**
 * Position system.
 * @param ents
 */
export function positionSystem(ents: ReadonlyArray<Entity>) {
    ents.forEach(ent => {
        if (ent.sprite && ent.pos) {
            ent.sprite.position.copy(ent.pos.loc);
            ent.sprite.rotation.set(0, 0, Math.atan2(ent.pos.dir.y, ent.pos.dir.x));
        }
    });
}

/**
 * Timer system.
 * @param ents 
 */
export function timerSystem(ents: ReadonlyArray<Entity>) {
    ents.forEach(ent => {
        if (ent.timer) {
            ent.timer.ticks--;

            if (ent.timer.ticks <= 0) {
                // Trigger ontimeout callback function.
                ent.timer.ontimeout();

                // Remove timer component from the entity.
                ent.timer = undefined;
            }
        }
    });
}