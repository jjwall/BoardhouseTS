import { Scene, Camera, Color, WebGLRenderer, OrthographicCamera, FirstPersonControls } from "three";
import { playAudio } from "./../../engine/helpers";
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
import { HitBoxTypes, setHitBox, setHitBoxGraphic } from "./../../components/hitbox";
import { collisionSystem } from "./../../systems/collision";
import { setAnimation, SequenceTypes } from "./../../components/animation";
import { animationSystem } from "./../../systems/animation";
import { setTimer } from "./../../components/timer";
import { timerSystem } from "./../../systems/timer";
import { setSprite } from "./../../components/sprite";
import { setCooldown } from "./../../components/cooldown";
import { cooldownSystem } from "./../../systems/cooldown";

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
    
    constructor(stateStack: BaseState[]) {
        super(stateStack);
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

        playAudio("./data/audio/Pale_Blue.mp3", 0.3, true);

        // Set up player entity.
        let player = new Entity();
        this.playerEntity = player;
        player.pos = setPosition(150, 150, 5);
        player.sprite = setSprite("./data/textures/msknight.png", this.gameScene, 4);
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
        enemy.sprite = setSprite("./data/textures/cottage.png", this.gameScene, 8);
        enemy.hitBox = setHitBox(enemy.sprite, HitBoxTypes.ENEMY, [HitBoxTypes.PLAYER], 0, 0, 0, 0);
        if (this.turnOnHitboxes) setHitBoxGraphic(enemy.sprite, enemy.hitBox);
        enemy.hitBox.onHit = (self, other) => { 
            // TODO // Link this to player hurtbox for new hurtbox testing
            // this.registerEntity(other);
            // #228B22 -> green
        }

        this.registerEntity(enemy);
    }

    public addClicks: Function = () => { 
        this.clicks++;
        this.rootComponent.setClicks(this.clicks);
        playAudio("./data/audio/SFX_Bonk2.wav", 0.3, false, true);
    }

    public removeEntity(ent: Entity) {
        super.removeEntity(ent);
        if (ent.sprite) {
            this.gameScene.remove(ent.sprite);
        }

        // if (ent.health && ent.health.mesh) {
        //     this.gameScene.remove(ent.health.mesh);
        // }
    }

    public update() : void {
        this.runSystems(this);
    }

    public render(renderer: WebGLRenderer) : void {
        renderer.clear();
        renderer.render(this.gameScene, this.gameCamera);
        renderer.clearDepth();
        renderer.render(this.uiScene, this.uiCamera);

        // Render UI updates.
        layoutWidget(this.rootWidget);
    }
}