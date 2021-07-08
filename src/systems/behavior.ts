import { MeshBasicMaterial, NearestFilter, Mesh } from "three";
import { BehaviorComponent } from "./../components/behavior";
import { BaseState } from "../engine/basestate";

type Entity = {
    behavior: BehaviorComponent<unknown>;
};

/**
 * Animation System.
 * @param ents Lists of ents to run system with. Must have anim and sprite components.
 */
export function behaviorSystem(ents: ReadonlyArray<Entity>, state: BaseState) : void {
    ents.forEach(ent => {
        if (ent.behavior) {
            ent.behavior.update(ent);
        }
    });
}
