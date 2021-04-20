import { BaseState } from "./../engine/basestate";
import { Entity } from "./../states/gameplay/entity";

// keyboard controls
// visit https://keycode.info/ for other key codes.
export let handleKeyDownEvent = (state: BaseState, e: KeyboardEvent) => {
    console.log(e);
    switch(e.keyCode) {
        case 37: // left
        case 65: // a
            state.getEntitiesByKey<Entity>("control").forEach(ent=> {
                if (ent.control) {
                    ent.control.left = true;
                }
            });
            break;

        case 39: // right
        case 68: // d
            state.getEntitiesByKey<Entity>("control").forEach(ent=> {
                if (ent.control) {
                    ent.control.right = true;
                }
            });
            break;

        case 38: // up
        case 87: // w
            state.getEntitiesByKey<Entity>("control").forEach(ent=> {
                if (ent.control) {
                    ent.control.up = true;
                }
            });
            break;
        
        case 40: // down
        case 83: // s
            state.getEntitiesByKey<Entity>("control").forEach(ent=> {
                if (ent.control) {
                    ent.control.down = true;
                }
            });
            break;

        case 32: // spacebar
        case 90: // z
            state.getEntitiesByKey<Entity>("control").forEach(ent=> {
                if (ent.control) {
                    ent.control.attack = true;
                }
            });
            break;
    }
}

export function handleKeyUpEvent(state: BaseState, e: KeyboardEvent) {
    switch(e.keyCode) {
        case 37: // left
        case 65: // a
            state.getEntitiesByKey<Entity>("control").forEach(ent=> {
                if (ent.control) {
                    ent.control.left = false;
                }
            });
            break;

        case 39: // right
        case 68: // d
            state.getEntitiesByKey<Entity>("control").forEach(ent=> {
                if (ent.control) {
                    ent.control.right = false;
                }
            });
            break;

        case 38: // up
        case 87: // w
            state.getEntitiesByKey<Entity>("control").forEach(ent=> {
                if (ent.control) {
                    ent.control.up = false;
                }
            });
            break;
        
        case 40: // down
        case 83: // s
            state.getEntitiesByKey<Entity>("control").forEach(ent=> {
                if (ent.control) {
                    ent.control.down = false;
                }
            });
            break;

        case 32: // spacebar
        case 90: // z
            state.getEntitiesByKey<Entity>("control").forEach(ent=> {
                if (ent.control) {
                    ent.control.attack = false;
                }
            });
            break;
    }
}