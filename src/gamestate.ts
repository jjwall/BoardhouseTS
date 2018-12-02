import { State } from "./state";
import { Entity } from "./entity";
// import { renderSystem } from "./rendersystem";
import { BoardhouseUI } from "./boardhouseui";
import { controlSystem, renderSystem, collisionSystem, timerSystem } from "./coresystems";
import { setSprite, setHitBoxGraphic, setHurtBoxGraphic } from "./helpers";
import { initializeControls, HurtTypes } from "./corecomponents";

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
        player.sprite = setSprite("data/textures/girl.png", player.pos.x, player.pos.y, stage, 8);
        player.control = initializeControls();
        // player.hitBox ={ collidesWith: [HurtTypes.test], height: player.sprite.height, width: player.sprite.width, onHit: function() { console.log("hit")}};
        // player.graphic = setHitBoxGraphic(stage, player.sprite.width, player.sprite.height)

        let collider = new Entity();
        collider.pos = { x: 500, y: 30 }
        collider.sprite = setSprite("data/textures/ship.png", collider.pos.x, collider.pos.y, stage, 8);
        let ents = this.entities;
        collider.hurtBox = { type: HurtTypes.test, height: collider.sprite.height, width: collider.sprite.width, 
            onHurt: function() { 
                console.log("hurt");
                collider.sprite.destroy();
                collider.graphic.destroy();
                ents.splice(ents.indexOf(collider), 1);
            }
        };
        collider.graphic = setHurtBoxGraphic(stage, collider.sprite.width, collider.sprite.height);

        this.entities.push(collider);
        this.entities.push(player);
        this.rootWidget = new BoardhouseUI.Widget();
    }
    public update(stateStack: State[], app: PIXI.Application) {
        // pull in all system free functions and call each in the proper order
        controlSystem(this.entities, app.stage);
        collisionSystem(this.entities);
        timerSystem(this.entities);
    }

    public render(canvas: HTMLCanvasElement, stage: PIXI.Container) {
        renderSystem(this.entities, canvas);
        // check if children needs to be reconciled, then do so
        BoardhouseUI.ReconcilePixiDom(this.rootWidget, stage);
    }
}