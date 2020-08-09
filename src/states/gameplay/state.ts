import { Scene, Camera, Color, WebGLRenderer, OrthographicCamera } from "three";
import { HitBoxTypes, setHitBox, setHitBoxGraphic } from "./../../components/hitbox";
import { setAnimation, SequenceTypes } from "./../../components/animation";
import { setControl } from "./../../components/control";
import { controlSystem } from "../../systems/control";
import { Entity } from "./entity";
import { playerAnim } from "./../../animations/player";
import { BaseState } from "./../../engine/basestate";
import { Widget } from "./../../ui/widget";
import { createWidget } from "../../ui/widget";
import { layoutWidget } from "../../ui/layoutwidget";
import { renderGameUi, Root } from "./rootui";
import { setPosition } from "./../../components/position";
import { positionSystem } from "./../../systems/position";
import { setVelocity } from "./../../components/velocity";
import { velocitySystem } from "./../../systems/velocity";
import { collisionSystem } from "./../../systems/collision";
import { animationSystem } from "./../../systems/animation";
import { setTimer } from "./../../components/timer";
import { timerSystem } from "./../../systems/timer";
import { setSprite } from "./../../components/sprite";
import { setCooldown } from "./../../components/cooldown";
import { cooldownSystem } from "./../../systems/cooldown";
import { Engine } from "../../engine/engine";

export class GamePlayState extends BaseState {
    public gameScene: Scene;
    public gameCamera: Camera;
    public uiScene: Scene;
    public uiCamera: Camera;
    public playerEntity: Entity;
    public turnOnHitboxes = true; // turn this off when done testing
    public rootWidget: Widget;
    public rootComponent: Root;

    // Set up game state.
    public clicks: number = 0;
    
    constructor(engine: Engine) {
        super(engine);
        // Set up game scene.
        this.gameScene = new Scene();
        this.gameScene.background = new Color("#FFFFFF");

        // Set up game camera.
        this.gameCamera = new OrthographicCamera(0, 1280, 720, 0, -1000, 1000);

        // Set up ui scene.
        this.uiScene = new Scene();

        // Set up ui camera.
        this.uiCamera = new OrthographicCamera(0, 1280, 0, -720, -1000, 1000);

        // Set up ui widget and instance.
        this.rootWidget = createWidget("root");

        this.uiScene.add(this.rootWidget);

        this.rootComponent = renderGameUi(this.uiScene, this.rootWidget, { addClicks: this.addClicks });

        // Register systems.
        this.registerSystem(controlSystem, "control");
        this.registerSystem(velocitySystem);
        this.registerSystem(collisionSystem);
        this.registerSystem(animationSystem);
        this.registerSystem(timerSystem);
        this.registerSystem(positionSystem);
        this.registerSystem(cooldownSystem);

        this.engine.playAudio("./data/audio/Pale_Blue.mp3", 0.3, true);

        // Set up player entity.
        let player = new Entity();
        this.playerEntity = player;
        player.pos = setPosition(150, 150, 5);
        player.sprite = setSprite("./data/textures/msknight.png", this.gameScene, this.engine, 4);
        player.control = setControl();
        player.vel = setVelocity(1);
        player.vel.friction = 0.9;
        player.anim = setAnimation(SequenceTypes.walk, playerAnim);
        player.timer = setTimer(250, () => {
            // this.removeEntity(player);
            // Remove player sprite from scene.
            // this.gameScene.remove(player.sprite);
            // this.stateStack.pop();
        });
        player.hitBox = setHitBox(player.sprite, HitBoxTypes.PLAYER, [HitBoxTypes.ENEMY], 50, 50, 100, -10);
        if (this.turnOnHitboxes) setHitBoxGraphic(player.sprite, player.hitBox);
        player.cooldown = setCooldown(20);
        player.hitBox.onHit = (self, other) => {
            if (other.hitBox.collideType === HitBoxTypes.ENEMY) {
                if (player.cooldown.restartCooldown()) {
                    this.addClicks(other);
                }
    
                if (this.clicks === 100) {
                    this.removeEntity(other);
                }
            }
        }

        this.registerEntity(player);

        // Set up enemy entity.
        let enemy = new Entity();
        enemy.pos = setPosition(750, 200, 4);
        enemy.sprite = setSprite("./data/textures/cottage.png", this.gameScene, this.engine, 8);
        enemy.hitBox = setHitBox(enemy.sprite, HitBoxTypes.ENEMY, [HitBoxTypes.PLAYER], 0, 0, 0, 0);
        if (this.turnOnHitboxes) setHitBoxGraphic(enemy.sprite, enemy.hitBox, "#228B22");
        enemy.hitBox.onHit = (self, other) => {
            // if (other.hitBox.collideType === HitBoxTypes.PLAYER) {
            //     this.removeEntity(other);
            // }
        }

        this.registerEntity(enemy);
    }

    public addClicks: Function = () => { 
        this.clicks++;
        this.rootComponent.setClicks(this.clicks);
        this.screenShake(false);
        this.engine.playAudio("./data/audio/SFX_Bonk2.wav", 0.3, false, true);
    }

    /**
     * Triggers a screen shake to the game camera.
     * @param shakeUi Param to shake UI camera as well. Defaults to true.
     */
    private screenShake(shakeUi: boolean = true) {
        for (let i = 1; i < 10; i++) {
            let randomYVal = Math.floor(Math.random() * (8 - 0 + 1)) + 0;
            let randomXVal = Math.floor(Math.random() * (8 - 0 + 1)) + 0;
            randomYVal *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
            randomXVal *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
            this.gameCamera.translateX(randomXVal);
            this.gameCamera.translateY(randomYVal);

            if (shakeUi) {
                this.uiCamera.translateX(randomXVal);
                this.uiCamera.translateY(randomYVal);
            }

            let timer = new Entity();
            timer.timer = setTimer(2 * i, () => {
                this.gameCamera.translateX(randomXVal * -1);
                this.gameCamera.translateY(randomYVal * -1);

                if (shakeUi) {
                    this.uiCamera.translateX(randomXVal * -1);
                    this.uiCamera.translateY(randomYVal * -1);
                }
            });
            this.registerEntity(timer);
        }
    }

    /**
     * Overriden method from base state to remove an ent's sprite from scene as well.
     * @param ent 
     */
    public removeEntity(ent: Entity) {
        super.removeEntity(ent);
        if (ent.sprite) {
            this.gameScene.remove(ent.sprite);
        }

        // if (ent.health && ent.health.mesh) {
        //     this.gameScene.remove(ent.health.mesh);
        // }
    }

    public activateEvents() : void {
        console.log("activate gameplay events!!");
    }

    public deactivateEvents() : void {
        console.log("deactivate gameplay events!!");
    }

    public update() : void {
        this.runSystems(this);
    }

    public render() : void {
        this.engine.renderer.clear();
        this.engine.renderer.render(this.gameScene, this.gameCamera);
        this.engine.renderer.clearDepth();
        this.engine.renderer.render(this.uiScene, this.uiCamera);

        // Render UI updates.
        layoutWidget(this.rootWidget, this.engine);
    }
}