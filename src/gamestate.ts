import { State } from "./state";
import { Entity } from "./entity";
import { renderSystem } from "./rendersystem";
import { BoardhouseUI } from "./boardhouseui";

/**
 * GameState that handles updating of all game-related systems.
 */
export class GameState implements State {
    public entities: Entity[];
    public rootWidget: BoardhouseUI.Widget;
    constructor(){
        this.entities = [];
    }
    public update(stateStack: State[], app: PIXI.Application) {
        // pull in all system free functions and call each in the proper order
        // renderSystem(this.entities);
    }

    public render(canvas: HTMLCanvasElement, stage: PIXI.Container) {
        renderSystem(this.entities, canvas);
        // check if children needs to be reconciled, then do so
        BoardhouseUI.ReconcilePixiDom(this.rootWidget, stage);
    }
}