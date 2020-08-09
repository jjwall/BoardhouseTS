import { UrlToTextureMap, UrlToFontMap, UrlToAudioMap } from "./interfaces";
import { BufferGeometry, ShapeBufferGeometry, WebGLRenderer} from "three";
import { BaseState } from "./basestate";

export class Engine
{
    public renderer: WebGLRenderer;

    public stateStack: BaseState[] = [];
    
    private _textures: UrlToTextureMap = {};

    private _fonts: UrlToFontMap = {};

    private _audioElements: UrlToAudioMap = {};

    private _textGeometries: { [k: string]: BufferGeometry } = {};

    public getTexture(url: string) {
        if (!this._textures[url]) {
            throw new Error("Texture not found. Check url and ensure texture url is being passed in to loadTextures().");
        }

        return this._textures[url];
    }

    public setTextures(value: UrlToTextureMap) {
        this._textures = value;
    }

    public getFont(url: string) {
        if (!this._fonts[url]) {
            throw new Error("Font not found. Check url and ensure font url is being passed in to loadFonts().");
        }

        return this._fonts[url];
    }

    public setFonts(value: UrlToFontMap) {
        this._fonts = value;
    }

    public getAudioElement(url: string) {
        if (!this._audioElements[url]) {
            throw new Error("Audio element no found. Check url and ensure audio element url is being passed in to loadAudioElements().");
        }

        return this._audioElements[url];
    }

    public setAudioElements(value: UrlToAudioMap) {
        this._audioElements = value;
    }

    public getTextGeometry(contents: string, fontUrl: string, font_size: number) {
        const key = `${contents}|${fontUrl}|${font_size}`;
        const geom = this._textGeometries[key];
        if (geom) {
            return geom;
        } else {
            const font = this.getFont(fontUrl);
            const shapes = font.generateShapes(contents, font_size, 0);
            const geometry = new ShapeBufferGeometry(shapes);

            // Ensure font is centered on (parent) widget.
            geometry.computeBoundingBox();
            const xMid = - 0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
            geometry.translate(xMid, 0, 0);

            this._textGeometries[key] = geometry;

            return geometry;
        }
    }

    public playAudio(url: string, volume?: number, loop?: boolean, clone?: boolean) : void {
        let audio = clone ?
            this.getAudioElement(url).cloneNode(true) as HTMLAudioElement :
            this.getAudioElement(url);
    
        if (volume) {
            if (volume < 0 || volume > 1)
                throw Error("volume can't be a value less than 0 or greater than 1.");
    
            audio.volume = volume;
        }
    
        if (loop) {
            audio.loop = loop;
        }
    
        audio.play()
            .catch(function(ex) {
                throw Error(`Your browser threw "${ex}". To resolve this on Chrome, go to chrome://flags/#autoplay-policy and set the Autoplay-policy to "No user gesture is required."`);
            });
    }
}