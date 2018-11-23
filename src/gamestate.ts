import { State } from "./state";
import { Entity } from "./entity";
import { renderSystem } from "./rendersystem";

/**
 * GameState that handles updating of all game-related systems.
 */
export class GameState implements State {
    public entities: Entity[];
    constructor(){
        this.entities = [];
    }
    public update(stateStack: State[], app: PIXI.Application) {
        // pull in all system free functions and call each in the proper order
        renderSystem(app, this.entities);
    }
}