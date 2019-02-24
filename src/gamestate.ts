import {
    Scene,
    Camera,
    WebGLRenderer,
    Vector3,
    Euler,
} from "three";
import { 
    positionSystem, 
    collisionSystem, 
    timerSystem, 
    animationSystem, 
    velocitySystem 
} from "./coresystems";
import { 
    initializeControls,
    initializeAnimation,
    initializeHurtBox,
    initializeHitBox
} from "./corecomponents";
import { controlSystem } from "./controlsystem";
import { Entity } from "./entity";
import { setSprite, setHurtBoxGraphic, playAudio, setHitBoxGraphic } from "./helpers";
import { playerAnim } from "../data/animations/player";
import { BaseState } from "./basestate";
import { HurtBoxTypes, SequenceTypes } from "./enums";
// import { BoardhouseUI } from "./boardhouseui";


/**
 * GameState that handles updating of all game-related systems.
 */
export class GameState extends BaseState {
    constructor(scene: Scene, stateStack: BaseState[]) {
        super(scene, stateStack);

        //playAudio("./data/audio/Pale_Blue.mp3", 0.3, true);

        // Set up player entity.
        let player = new Entity();
        player.pos = { loc: new Vector3(100, -100, 5), dir: new Vector3(1, 0, 0)};
        player.sprite = setSprite("./data/textures/msknight.png", scene, 4);
        player.control = initializeControls();
        player.vel = { positional: new Vector3(), rotational: new Euler() };
        player.anim = initializeAnimation(SequenceTypes.walk, playerAnim);
        player.hurtBox = initializeHurtBox(player.sprite, HurtBoxTypes.test, -50, -50);
        // player.timer = { ticks: 250, ontimeout: () => { this.removeEntity(player, scene); } };
        setHurtBoxGraphic(player.sprite, player.hurtBox);
        this.registerEntity(player);

        // Set up enemy entity.
        let enemy = new Entity()
        enemy.pos = { loc: new Vector3(-300, -100, 4), dir: new Vector3(1, 0, 0) };
        enemy.sprite = setSprite("./data/textures/cottage.png", scene, 4);
        enemy.hitBox = initializeHitBox(enemy.sprite, [HurtBoxTypes.test]);
        setHitBoxGraphic(enemy.sprite, enemy.hitBox);
        enemy.hitBox.onHit = function() {
            console.log("ouch!");
        }

        this.registerEntity(enemy);
    }

    public update() : void {
        // pull in all system free functions and call each in the proper order
        controlSystem(this.getControllableEnts());
        velocitySystem(this.getGlobalEnts());
        collisionSystem(this.getGlobalEnts());
        animationSystem(this.getGlobalEnts());
        timerSystem(this.getGlobalEnts());
    }

    public render(renderer: WebGLRenderer, camera: Camera, scene: Scene) : void {
        positionSystem(this.getGlobalEnts());

        renderer.render(scene, camera);
        // check if children needs to be reconciled, then do so
        // BoardhouseUI.ReconcilePixiDom(this.rootWidget, stage);
    }
}