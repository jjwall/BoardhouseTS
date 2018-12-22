import * as THREE from "three";

export function loadTextures(urls: string[]) : UrlToTextureMap {
    let loader = new THREE.TextureLoader();
    let cachedTextures: UrlToTextureMap = {};

    for(let i = 0; i < urls.length; i++) {
        let texture = loader.load( urls[i], function(tex) {
            if (i === (urls.length - 1)) {
                return cachedTextures;
            }
            console.log( tex.image.width, tex.image.height );
        });

        cachedTextures[urls[i]] = texture;
    }

    return cachedTextures;
}

interface UrlToTextureMap {
    [url: string]: THREE.Texture;
}