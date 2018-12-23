import * as THREE from "three";

export class Resources
{
    private static _current: Resources;

    private _textures: UrlToTextureMap = {};

    private constructor() {}

    public static get current() {
        return this._current || (this._current = new this());
    }

    public get textures() {
        return this._textures;
    }

    public set textures(value: UrlToTextureMap) {
        this._textures = value;
    }
}

export async function loadTextures(urls: string[]) : Promise<UrlToTextureMap> {
    let loader = new THREE.TextureLoader();
    let cachedTextures: UrlToTextureMap = {};

    return new Promise((resolve: (value: UrlToTextureMap) => void, reject) => {
        for(let i = 0; i < urls.length; i++) {
            let texture = loader.load( urls[i], function(tex) {
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