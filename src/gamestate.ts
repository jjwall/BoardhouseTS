/// <reference path="./types/json.d.ts" />
import { State } from "./state";
import { Entity } from "./entity";
// import { renderSystem } from "./rendersystem";
import { BoardhouseUI } from "./boardhouseui";
import { controlSystem, renderSystem, collisionSystem, timerSystem, animationSystem, velocitySystem } from "./coresystems";
import { setSprite, setHitBoxGraphic, setHurtBoxGraphic } from "./helpers";
import { initializeControls, HurtTypes, initializeAnimation } from "./corecomponents";
import playerAnim from "../data/animations/player.json";

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
        player.anim = initializeAnimation("walk", playerAnim);
        player.vel = { left: false, right: false, up: false, down: false, speed: 2 };
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
        collider.vel = { left: true, right: false, up: false, down: false, speed: 1 };

        this.entities.push(collider);
        this.entities.push(player);
        this.rootWidget = new BoardhouseUI.Widget();
    }

    public update(stateStack: State[], stage: PIXI.Container) {
        // pull in all system free functions and call each in the proper order
        controlSystem(this.entities, stage);
        velocitySystem(this.entities);
        collisionSystem(this.entities);
        animationSystem(this.entities);
        timerSystem(this.entities);
    }

    public render(canvas: HTMLCanvasElement, stage: PIXI.Container) {
        renderSystem(this.entities, canvas);
        // check if children needs to be reconciled, then do so
        BoardhouseUI.ReconcilePixiDom(this.rootWidget, stage);
    }
}