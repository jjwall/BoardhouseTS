import { Mesh, Scene, NearestFilter, PlaneGeometry, MeshBasicMaterial } from "three";
import { Resources } from "./../engine/resourcemanager";

export type SpriteComponent = Mesh;

/**
 * Helper method to initialize sprite component for an entity. Also adds sprite to stage.
 * @param url Path to texture file.
 * @param scene THREE.Scene.
 * @param pixelRatio Number of pixels to scale texture's height and width by.
 */
export function setSprite(url: string, scene: Scene, pixelRatio?: number) : SpriteComponent {
    if (!pixelRatio) {
        pixelRatio = 1;
    }
    
    // get texture from cached resources
    let spriteMap = Resources.instance.getTexture(url);
    // load geometry (consider caching these as well)
    var geometry = new PlaneGeometry(spriteMap.image.width*pixelRatio, spriteMap.image.height*pixelRatio);
    // set magFilter to nearest for crisp looking pixels
    spriteMap.magFilter = NearestFilter;
    var material = new MeshBasicMaterial( { map: spriteMap, transparent: true });
    var sprite = new Mesh(geometry, material);
    scene.add(sprite);

    return sprite;
}