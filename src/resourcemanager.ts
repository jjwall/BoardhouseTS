import * as THREE from "three";

export class Resources
{
    private static _instance: Resources;

    private _textures: UrlToTextureMap = {};

    private constructor() {}

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    public getTexture(url: string) {
        if (this._textures[url] === undefined) {
            throw new Error("Texture not found. Check url and ensure texture url is being passed in to loadTextures().");
        }

        return this._textures[url];
    }

    public set textures(value: UrlToTextureMap) {
        this._textures = value;
    }
}

export async function loadTextures(urls: string[]) : Promise<UrlToTextureMap> {
    const loader = new THREE.TextureLoader();

    const promises = urls.map((url) =>
        new Promise<THREE.Texture>((resolve) => {
            loader.load(url, (tex) => resolve(tex));
        })
    );

    const textures = await Promise.all(promises);

    const cachedTextures: UrlToTextureMap = {};
    
    textures.forEach((tex, i) => {
        cachedTextures[urls[i]] = tex
    });

    return cachedTextures;
}

export interface UrlToTextureMap {
    [url: string]: THREE.Texture;
}