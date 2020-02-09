import { PositionComponent } from "../components/position";
import { VelocityComponent } from "../components/velocity";

/**
 * Velocity System.
 * @param ents 
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

type Entity = {
    pos: PositionComponent;
    vel: VelocityComponent;
}