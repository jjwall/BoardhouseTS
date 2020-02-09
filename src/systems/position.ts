import { PositionComponent } from "../components/position";
import { Mesh } from "three";

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

type Entity = {
    pos: PositionComponent;
    sprite: Mesh;
}