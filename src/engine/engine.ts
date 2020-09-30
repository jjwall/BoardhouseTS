import { UrlToTextureMap, UrlToFontMap, UrlToAudioBufferMap } from "./interfaces";
import { BufferGeometry, ShapeBufferGeometry, WebGLRenderer, Audio, AudioListener, Scene, Camera} from "three";
import { loadFonts, loadTextures, loadAudioBuffers } from "./loaders";
import { BaseState } from "./basestate";

export interface EngineConfig {
    screenWidth: number;
    screenHeight: number;
    gameTicksPerSecond: number;
    displayFPS: boolean;
    displayHitBoxes: boolean;
    globalErrorHandling: boolean;
    fontUrls: string[];
    textureUrls: string[];
    audioUrls: string[];
}

export class Engine
{
    constructor(config: EngineConfig) {
        this.screenWidth = config.screenWidth;
        this.screenHeight = config.screenHeight;
        this.millisecondsPerGameTick = 1000 / config.gameTicksPerSecond;
        this.displayFPS = config.displayFPS;
        this.displayHitBoxes = config.displayHitBoxes;
        this.globalErrorHandling = config.globalErrorHandling;
        this.fontUrls = config.fontUrls;
        this.textureUrls = config.textureUrls;
        this.audioUrls = config.audioUrls;
    }

    public screenWidth: number;

    public screenHeight: number;

    public millisecondsPerGameTick: number;

    public displayFPS: boolean;

    public globalErrorHandling: boolean;

    public displayHitBoxes: boolean;

    public FPS: number;

    public renderer: WebGLRenderer;

    public stateStack: BaseState[] = [];

    // public stateStack: StateStack = new StateStack();

    public fontUrls: string[];

    public textureUrls: string[];

    public audioUrls: string[];
    
    private _textures: UrlToTextureMap = {};

    private _fonts: UrlToFontMap = {};

    private _audioBuffers: UrlToAudioBufferMap = {};

    private _textGeometries: { [k: string]: BufferGeometry } = {};

    private setFonts(value: UrlToFontMap) {
        this._fonts = value;
    }

    private setTextures(value: UrlToTextureMap) {
        this._textures = value;
    }

    private setAudioBuffers(value: UrlToAudioBufferMap) {
        this._audioBuffers = value;
    }

    public async loadAssets() {
        await Promise.all([
            loadFonts(this.fontUrls),
            loadTextures(this.textureUrls),
            loadAudioBuffers(this.audioUrls)
        ]).then((assets) => {
            this.setFonts(assets[0]);
            this.setTextures(assets[1]);
            this.setAudioBuffers(assets[2]);
        });
    }

    public getFont(url: string) {
        if (!this._fonts[url]) {
            throw new Error("Font not found. Check url and ensure font url is being passed in to loadFonts().");
        }

        return this._fonts[url];
    }

    public getTexture(url: string) {
        if (!this._textures[url]) {
            throw new Error("Texture not found. Check url and ensure texture url is being passed in to loadTextures().");
        }

        return this._textures[url];
    }

    public getAudioBuffer(url: string) {
        if (!this._audioBuffers[url]) {
            throw new Error("Audio element not found. Check url and ensure audio element url is being passed in to loadAudioElements().");
        }

        return this._audioBuffers[url];
    }

    public getTextGeometry(contents: string, fontUrl: string, font_size: number) {
        const key = `${contents}|${fontUrl}|${font_size}`;
        const geom = this._textGeometries[key];
        if (geom) {
            return geom;
        } else {
            const font = this.getFont(fontUrl);
            const shapes = font.generateShapes(contents, font_size);
            const geometry = new ShapeBufferGeometry(shapes);

            // Ensure font is centered on (parent) widget.
            geometry.computeBoundingBox();
            const xMid = - 0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
            geometry.translate(xMid, 0, 0);

            this._textGeometries[key] = geometry;

            return geometry;
        }
    }

    public playAudio(url: string, scene: Scene, camera: Camera, volume?: number, loop?: boolean) {
        const audioListener = new AudioListener();
        const audio = new Audio(audioListener);

        // add the listener to the camera
        camera.add(audioListener);

        // add the audio object to the scene
        scene.add(audio);

        audio.setBuffer(this.getAudioBuffer(url));

        if (volume) {
            if (volume < 0 || volume > 1)
                throw Error("volume can't be a value less than 0 or greater than 1.");
            
            audio.setVolume(volume);
        }

        if (loop)
            audio.loop = loop;

        audio.play();
    }
}

/**
 * StateStack is a modified version of Array<T> so that pop() and push()
 * can be overriden to call states' activateEvents and deactivateEvents methods
 * for easier transition between states by automatically handling event changes.
 * Idea: scene transitions could happen here too.
 */
// class StateStack extends Array<BaseState> {
//     public pop(): BaseState | undefined {
//         const poppedElement = super.pop();
//         // Deactivate events on popped state.
//         poppedElement.deactivateEvents();
//         // Activate events on last state in stateStack.
//         if (this.length > 0)
//             last(this).activateEvents();

//         return poppedElement;
//     }

//     public push(...items: BaseState[]): number {
//         // Deactivate events on current state.
//         if (this.length > 0)
//             last(this).deactivateEvents();

//         const newLength = super.push(...items);
//         // Activate events on newly pushed state.
//         last(this).activateEvents();

//         return newLength;
//     }
// }