import { State } from "./state";
import { Entity } from "./entity";
// import { renderSystem } from "./rendersystem";
import { BoardhouseUI } from "./boardhouseui";
import { controlSystem, renderSystem, collisionSystem } from "./coresystems";
import { setSprite } from "./helpers";
import { initializeControls, Collidables } from "./corecomponents";

/**
 * GameState that handles updating of all game-related systems.
 */
export class GameState implements State {
    public entities: Entity[];
    public rootWidget: BoardhouseUI.Widget;
    constructor(stage: PIXI.Container){
        this.entities = [];
        // set up entities
        let player = new Entity();
        player.pos = { x: 0, y: 0 };
        player.sprite = setSprite("data/textures/ship.png", player.pos.x, player.pos.y, stage, 8);
        player.control = initializeControls();
        player.hitBox ={ collidesWith: [Collidables.test], height: 32, width: 64, onHit: function() { console.log("hit")}};

        let collider = new Entity();
        collider.pos = { x: 500, y: 30 }
        collider.sprite = setSprite("data/textures/ship.png", collider.pos.x, collider.pos.y, stage, 8);
        let ents = this.entities;
        collider.hurtBox = { collideType: Collidables.test, height: 32, width: 64, 
            onHurt: function() { 
                console.log("hurt");
                collider.sprite.destroy();
                ents.splice(ents.indexOf(collider), 1);
            }
        };
        this.entities.push(collider);


        this.entities.push(player);
        this.rootWidget = new BoardhouseUI.Widget();
    }
    public update(stateStack: State[], app: PIXI.Application) {
        // pull in all system free functions and call each in the proper order
        controlSystem(this.entities);
        collisionSystem(this.entities);
    }

    public render(canvas: HTMLCanvasElement, stage: PIXI.Container) {
        renderSystem(this.entities, canvas);
        // check if children needs to be reconciled, then do so
        BoardhouseUI.ReconcilePixiDom(this.rootWidget, stage);
    }
}