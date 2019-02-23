import {
    Scene,
    Camera,
    WebGLRenderer,
    Vector3,
    Euler,
} from "three";
import { 
    controlSystem, 
    positionSystem, 
    collisionSystem, 
    timerSystem, 
    animationSystem, 
    velocitySystem 
} from "./coresystems";
import { 
    initializeControls,
    HurtTypes,
    initializeAnimation,
    initializeHurtBox
} from "./corecomponents";
import { Entity } from "./entity";
import { setSprite, setHurtBoxGraphic } from "./helpers";
import { playerAnim } from "../data/animations/player";
import { SequenceTypes } from "./animationschema";
import { BaseState } from "./basestate";
// import { BoardhouseUI } from "./boardhouseui";


/**
 * GameState that handles updating of all game-related systems.
 */
export class GameState extends BaseState {
    constructor(scene: Scene, stateStack: BaseState[]) {
        super(scene, stateStack);
        // set up entities
        let player = new Entity();
        player.pos = { loc: new Vector3(100, -100, 5), dir: new Vector3(1, 0, 0)};
        player.sprite = setSprite("./data/textures/msknight.png", scene, 4);
        player.control = initializeControls();
        player.vel = { positional: new Vector3(), rotational: new Euler() };
        player.anim = initializeAnimation(SequenceTypes.walk, playerAnim);
        player.hurtBox = initializeHurtBox(player.sprite, HurtTypes.test);
        this.registerEntity(player);
        setHurtBoxGraphic(player.sprite, player.hurtBox);

        // this.rootWidget = new BoardhouseUI.Widget();
    }

    public update() : void {
        // pull in all system free functions and call each in the proper order
        controlSystem(this.getControllableEnts());
        velocitySystem(this.getGlobalEnts());
        collisionSystem(this.getGlobalEnts());
        animationSystem(this.getGlobalEnts());
        timerSystem(this.getGlobalEnts(), this.removeEntity, this.scene);
    }

    public render(renderer: WebGLRenderer, camera: Camera, scene: Scene) : void {
        positionSystem(this.getGlobalEnts());

        renderer.render(scene, camera);
        // check if children needs to be reconciled, then do so
        // BoardhouseUI.ReconcilePixiDom(this.rootWidget, stage);
    }
}