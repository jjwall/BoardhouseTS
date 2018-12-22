import * as THREE from "three";

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

interface UrlToTextureMap {
    [url: string]: THREE.Texture;
}