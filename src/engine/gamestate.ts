import { initializeAnimation, initializeControls, initializeHitBox, initializeHurtBox, initializeSprite, initializePosition, initializeVelocity, initializeTimer } from "./initializers";
import { positionSystem, collisionSystem, timerSystem, animationSystem, velocitySystem } from "./coresystems";
import { Scene, Camera, Color, WebGLRenderer, OrthographicCamera } from "three";
import { setHurtBoxGraphic, playAudio, setHitBoxGraphic } from "./helpers";
import { HitBoxTypes, HurtBoxTypes, SequenceTypes } from "./enums";
import { controlSystem } from "./controlsystem";
import { Entity } from "./entity";
import { playerAnim } from "../../data/animations/player";
import { BaseState } from "./basestate";
import { Widget } from "../ui/widget";
import { createWidget } from "../ui/widget";
import { layoutWidget } from "../ui/layoutwidget";
import { renderGameUi, Root } from "./rootgameui";

/**
 * GameState that handles updating of all game-related systems.
 */

export class GameState extends BaseState {
    public gameScene: Scene;
    public gameCamera: Camera;
    public uiScene: Scene;
    public uiCamera: Camera;

    public playerEntity: Entity;
    public turnOnHitboxes = true; // turn this off when done testing

    public rootWidget: Widget;
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

        let rootComponent = renderGameUi(this.uiScene, this.rootWidget);

        // Register systems.
        this.registerSystem(controlSystem, "control");
        this.registerSystem(velocitySystem);
        this.registerSystem(collisionSystem);
        this.registerSystem(animationSystem);
        this.registerSystem(timerSystem);
        this.registerSystem(positionSystem);

        playAudio("./data/audio/Pale_Blue.mp3", 0.3, true);

        // Set up player entity.
        let player = new Entity();
        player.HitBoxTypes = HitBoxTypes.PLAYER;
        this.playerEntity = player;
        player.pos = initializePosition(150, 150, 5);
        player.sprite = initializeSprite("./data/textures/msknight.png", this.gameScene, 4);
        player.control = initializeControls();
        player.vel = initializeVelocity(1);
        player.vel.friction = 0.9;
        player.anim = initializeAnimation(SequenceTypes.walk, playerAnim);
        player.hurtBox = initializeHurtBox(player.sprite, HurtBoxTypes.test, 50, 50, -300, -100);
        player.timer = initializeTimer(250, () => {
            // this.removeEntity(player);
            // Remove player sprite from scene.
            // this.gameScene.remove(player.sprite);
            // this.stateStack.pop();
        });
        player.hitBox = initializeHitBox(player.sprite, HitBoxTypes.PLAYER, [HitBoxTypes.ENEMY], [], 50, 50, 100, -10);
        if (this.turnOnHitboxes) setHitBoxGraphic(player.sprite, player.hitBox);
        if (this.turnOnHitboxes) setHurtBoxGraphic(player.sprite, player.hurtBox);
        player.hitBox.onHit = function(player, other) {
            if (other.HitBoxTypes == HitBoxTypes.ENEMY) {
                //playAudio("./data/audio/SFX_Bonk2.wav", 0.3, false);
                //player.vel.positional.copy(other.vel.positional.clone().multiplyScalar(8));
            }
        }

        this.registerEntity(player);

        // Set up enemy entity.
        let enemy = new Entity();
        enemy.pos = initializePosition(750, 200, 4);
        enemy.sprite = initializeSprite("./data/textures/cottage.png", this.gameScene, 8);
        enemy.hitBox = initializeHitBox(enemy.sprite, HitBoxTypes.ENEMY, [HitBoxTypes.PLAYER], [], 0, 0, 0, 0);
        if (this.turnOnHitboxes) setHitBoxGraphic(enemy.sprite, enemy.hitBox);
        enemy.hitBox.onHit = function() {
            rootComponent.addClick();
            playAudio("./data/audio/SFX_Bonk2.wav", 0.3, false);
        }

        this.registerEntity(enemy);
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