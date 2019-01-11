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
            throw new Error("Texture not found. Check url and ensure texture is being loaded.");
        }

        return this._textures[url];
    }

    public set textures(value: UrlToTextureMap) {
        this._textures = value;
    }
}

export async function loadTextures(urls: string[]) : Promise<UrlToTextureMap> {
    const loader = new THREE.TextureLoader();
    let cachedTextures: UrlToTextureMap = {};

    return new Promise((resolve: (value: UrlToTextureMap) => void, reject) => {
        for (let i = 0; i < urls.length; i++) {
            let texture = loader.load(urls[i], function(tex) {
                if (i === (urls.length - 1)) {
                    resolve(cachedTextures);
                }
            });

            cachedTextures[urls[i]] = texture;
        }
    });
}

export interface UrlToTextureMap {
    [url: string]: THREE.Texture;
}