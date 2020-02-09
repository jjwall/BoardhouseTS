import {
    Box3,
    Mesh,
    Scene,
    Euler,
    NearestFilter,
    PlaneGeometry,
    MeshBasicMaterial,
    Vector3,
} from "three";
import { 
    SequenceTypes,
} from "./../engine/enums";
import {
    AnimationComponent,
    TimerComponent,
} from "./corecomponents";
import { Resources } from "./../engine/resourcemanager";
import { ControlComponent } from "./controlcomponent";
import { AnimationSchema } from "./../engine/engineinterfaces";
import { Entity } from "./../states/../states/gameplay/entity";

/**
 * Initializes sprites, velocities, animations, etc.
 */

/**
 * Helper for intializing an entity's animation blob and starting sequence.
 * @param startingSequence 
 * @param animBlob 
 */
export function initializeAnimation(startingSequence: SequenceTypes, animBlob: AnimationSchema) : AnimationComponent {
    return {
        sequence: startingSequence,
        blob: animBlob,
        ticks: animBlob[startingSequence][0].ticks,
        frame: 0,
    }
}

/**
 * Helper for initializing ControlComponent with starting values.
 * at creation of the object.
 */
export function initializeControls(): ControlComponent {
    return {
        jump: false,
        attack: false,
        attackTimer: 0,
        attacked: false,
        left: false,
        right: false,
        up: false,
        down: false,
        camera: null,
        mousePos: null,
    };
}


/**
 * Helper method to initialize sprite component for an entity. Also adds sprite to stage.
 * @param url Path to texture file.
 * @param scene THREE.Scene.
 * @param pixelRatio Number of pixels to scale texture's height and width by.
 */
export function initializeSprite(url: string, scene: Scene, pixelRatio?: number) : Mesh {
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

/**
 * Helper to initialize timer component for an entity.
 * @param ticksUntilTimeout 
 * @param ontimeout 
 */
export function initializeTimer(ticksUntilTimeout: number, ontimeout: () => void): TimerComponent {
    return { ticks: ticksUntilTimeout, ontimeout: ontimeout };
}
