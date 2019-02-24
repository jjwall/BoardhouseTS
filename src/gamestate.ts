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
import { Resources } from "./resourcemanager";
// import { BoardhouseUI } from "./boardhouseui";


/**
 * GameState that handles updating of all game-related systems.
 */
export class GameState extends BaseState {
    constructor(scene: Scene, stateStack: BaseState[]) {
        super(scene, stateStack);

        // const song = Resources.instance.getAudioElement("./data/audio/Pale_Blue.mp3");
        //const songPromise = 
        Resources.instance.getAudioElement("./data/audio/Pale_Blue.mp3").play()
            .catch(function(ex) {
                alert(`Your browser threw "${ex}". To resolve this on Chrome, go to chrome://flags/#autoplay-policy and set the Autoplay-policy to "No user gesture is required."`);
                console.log(ex);
            });
        // if (songPromise !== null) {
        //     songPromise.catch(() => {song.play()});
        // }

        // set up entities
        let player = new Entity();
        player.pos = { loc: new Vector3(100, -100, 5), dir: new Vector3(1, 0, 0)};
        player.sprite = setSprite("./data/textures/msknight.png", scene, 4);
        player.control = initializeControls();
        player.vel = { positional: new Vector3(), rotational: new Euler() };
        player.anim = initializeAnimation(SequenceTypes.walk, playerAnim);
        player.hurtBox = initializeHurtBox(player.sprite, HurtTypes.test);
        player.timer = { ticks: 250, ontimeout: () => { this.removeEntity(player, scene); } };
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
        timerSystem(this.getGlobalEnts());
    }

    public render(renderer: WebGLRenderer, camera: Camera, scene: Scene) : void {
        positionSystem(this.getGlobalEnts());

        renderer.render(scene, camera);
        // check if children needs to be reconciled, then do so
        // BoardhouseUI.ReconcilePixiDom(this.rootWidget, stage);
    }
}