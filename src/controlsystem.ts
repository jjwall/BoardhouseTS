import { Entity } from "./entity";
import { changeSequence } from "./helpers";
import { HurtBoxTypes, SequenceTypes } from "./enums";

/**
 * Control system.
 * @param ents Ents from the controllableEntities registry.
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
                    collidesWith: [HurtBoxTypes.test], 
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