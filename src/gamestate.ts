import * as THREE from "three";
import { Entity, EntityRegistry } from "./entity";
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
import { BaseState } from "./basestate";


/**
 * GameState that handles updating of all game-related systems.
 */
export class GameState extends BaseState {
    constructor(scene: THREE.Scene, stateStack: BaseState[]){
        super(scene, stateStack);
        // set up entities
        let player = new Entity();
        player.pos = { loc: new THREE.Vector3(100, -100, 5), dir: new THREE.Vector3(1, 0, 0)};
        player.sprite = setSprite("./data/textures/msknight.png", scene, 4);
        player.control = initializeControls();
        player.vel = { positional: new THREE.Vector3(), rotational: new THREE.Euler() };
        player.anim = initializeAnimation(SequenceTypes.walk, playerAnim);
        player.hurtBox = initializeHurtBox(player.sprite, HurtTypes.test);
        this.registerEntity(player);
        setHurtBoxGraphic(player.sprite, player.hurtBox);

        // this.rootWidget = new BoardhouseUI.Widget();
    }

    public update(){
        // pull in all system free functions and call each in the proper order
        controlSystem(this.getControllableEnts());
        velocitySystem(this.getGlobalEnts());
        collisionSystem(this.getGlobalEnts());
        animationSystem(this.getGlobalEnts());
        timerSystem(this.getGlobalEnts(), this.removeEntity, this.scene);
    }

    public render(renderer: THREE.WebGLRenderer, camera: THREE.Camera, scene: THREE.Scene) {
        positionSystem(this.getGlobalEnts());

        renderer.render(scene, camera);
        // check if children needs to be reconciled, then do so
        // BoardhouseUI.ReconcilePixiDom(this.rootWidget, stage);
    }
}