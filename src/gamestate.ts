import * as THREE from "three";
import { State } from "./state";
import { Entity } from "./entity";
// import { BoardhouseUI } from "./boardhouseui";
import { 
    controlSystem, 
    positionSystem, 
    collisionSystem, 
    timerSystem, 
    animationSystem, 
    velocitySystem 
} from "./coresystems";
import { setSprite, setHurtBoxGraphic } from "./helpers";
import { initializeControls, HurtTypes, initializeAnimation, initializeHurtBox } from "./corecomponents";
import { playerAnim } from "../data/animations/player";
import { SequenceTypes } from "./animationschema";


/**
 * GameState that handles updating of all game-related systems.
 */
export class GameState implements State {
    public entities: Entity[];
    // public rootWidget: BoardhouseUI.Widget;
    constructor(scene: THREE.Scene){
        this.entities = [];
        // set up entities
        let player = new Entity();
        player.pos = { x: -100, y: -100, z: 5 };
        player.sprite = setSprite("./data/textures/msknight.png", scene, 4);
        player.control = initializeControls();
        player.vel = { left: false, right: false, up: false, down: false, speed: 2 };
        player.anim = initializeAnimation(SequenceTypes.walk, playerAnim);
        player.hurtBox = initializeHurtBox(player.sprite, HurtTypes.test);
        setHurtBoxGraphic(player.sprite, player.hurtBox);
        
        this.entities.push(player);
        // this.rootWidget = new BoardhouseUI.Widget();
    }

    public update(){
        // pull in all system free functions and call each in the proper order
        controlSystem(this.entities);
        velocitySystem(this.entities);
        collisionSystem(this.entities);
        animationSystem(this.entities);
        timerSystem(this.entities);
    }

    public render(renderer: THREE.WebGLRenderer, camera: THREE.Camera, scene: THREE.Scene) {
        positionSystem(this.entities);

        renderer.render(scene, camera);
        // check if children needs to be reconciled, then do so
        // BoardhouseUI.ReconcilePixiDom(this.rootWidget, stage);
    }
}