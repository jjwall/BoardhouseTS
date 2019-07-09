import { Scene, Camera, Color, WebGLRenderer, OrthographicCamera } from "three";
import { BaseState } from "../basestate";
import { layoutWidget } from "../ui/layoutwidget";
import { Widget, createWidget } from "../ui/widget";
import { GameState } from "./gamestate";
import { renderMainMenuUi, MainMenuRoot } from "./rootmainmenuui";

export class MainMenuState extends BaseState {
    public uiScene: Scene;
    public uiCamera: Camera;
    public rootWidget: Widget;
    constructor(stateStack: BaseState[]) {
        super(stateStack);

        // Set up ui scene.
        this.uiScene = new Scene();
        this.uiScene.background = new Color("#FFFFFF");

        // Set up ui camera.
        this.uiCamera = new OrthographicCamera(0, 1280, 0, -720, -1000, 1000);

        // Set up ui widget and instance.
        this.rootWidget = createWidget("root");
        //let rootComponent = 
        renderMainMenuUi(this.uiScene, this.rootWidget, this.startGame);
    }

    private startGame = (): void => {
        let gameState = new GameState(this.stateStack);
        this.stateStack.push(gameState);
    }

    public update(): void {}

    public render(renderer: WebGLRenderer) : void {
        renderer.clear();
        renderer.clearDepth();
        renderer.render(this.uiScene, this.uiCamera);

        // Render UI updates.
        layoutWidget(this.rootWidget);
    }
}