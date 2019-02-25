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
    HurtBoxTypes,
    SequenceTypes,
} from "./enums";
import {
    AnimationComponent,
    HitBoxComponent,
    HurtBoxComponent,
    PositionComponent,
    VelocityComponent,
} from "./corecomponents";
import { Resources } from "./resourcemanager";
import { ControlComponent } from "./controlcomponent";
import { AnimationSchema } from "./interfaces";

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
    };
}

/**
 * See initializeHurtBox comments.
 * @param entMesh 
 * @param collidesWith 
 * @param xShift 
 * @param yShift 
 * @param manualHeight 
 * @param manualWidth 
 */
export function initializeHitBox(entMesh: Mesh, collidesWith: HurtBoxTypes[], xShift: number = 0, yShift: number = 0, manualHeight?: number, manualWidth?: number) : HitBoxComponent {
    let hitBox: HitBoxComponent = { collidesWith: collidesWith, height: 0, width: 0 };

    if (manualHeight !== undefined && manualWidth !== undefined) {
        hitBox.height = manualHeight - yShift;
        hitBox.width = manualWidth + xShift;
    }
    else {
        const boundingBox = new Box3().setFromObject(entMesh);
        hitBox.height = boundingBox.max.y - boundingBox.min.y - yShift;
        hitBox.width =  boundingBox.max.x - boundingBox.min.x + xShift;
    }

    return hitBox;
}

/**
 * Helper for initializing an entity's hurt box component.
 * Note: ``onHurt`` callback should be set independently.
 * @param entMesh An entity's mesh A.K.A. sprite to be set before calling this function.
 * @param hurtType HurtBox type.
 * @param xShift (Default 0) Number of pixels to change the hurtbox's x-axis by.
 * @param yShift (Default 0) Number of pixels to change the hurtbox's y-axis by.
 * @param manualHeight (Optional) Exact number of pixels to set for the hurtBox's height.
 * Must also set ``manualWidth`` for this to take effect.
 * @param manualWidth (Optional) Exact number of pixels to set for the hurtBox's width.
 * Must also set ``manualHeight`` for this to take effect.
 */
export function initializeHurtBox(entMesh: Mesh, hurtType: HurtBoxTypes, xShift: number = 0, yShift: number = 0, manualHeight?: number, manualWidth?: number) : HurtBoxComponent {
    let hurtBox: HurtBoxComponent = { type: hurtType, height: 0, width: 0 };

    if (manualHeight !== undefined && manualWidth !== undefined) {
        hurtBox.height = manualHeight + yShift;
        hurtBox.width = manualWidth + xShift;
    }
    else {
        const boundingBox = new Box3().setFromObject(entMesh);
        hurtBox.height = boundingBox.max.y - boundingBox.min.y + yShift;
        hurtBox.width =  boundingBox.max.x - boundingBox.min.x + xShift;
    }

    return hurtBox;
}

/**
 * Helper for initializing an entity's position.
 * @param xPos 
 * @param yPos 
 * @param zPos 
 * @param startingDirection optional param. If not specified, direction will be: Vector3(1, 0, 0).
 */
export function initializePosition(xPos: number, yPos: number, zPos: number, startingDirection?: Vector3): PositionComponent {
    let position: PositionComponent = { loc: new Vector3(xPos, yPos, zPos), dir: null };

    if (startingDirection) {
        position.dir = startingDirection;
    }
    else {
        position.dir = new Vector3(1, 0, 0);
    }
      
    return position;
}

/**
 * Helper method to add a sprite to the stage.
 * @param url Path to texture file.
 * @param scene THREE.Scene.
 * @param pixelRatio Number of pixels to scale texture's height and width by.
 */
export function initializeSprite(url: string, scene: Scene, pixelRatio: number) : Mesh {
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

export function initializeVelocity(acceleration: number, positionalVel?: Vector3, rotationalVel?: Euler, friction?: number): VelocityComponent {
    let velocity: VelocityComponent = { 
        acceleration: acceleration,
        positional: null,
        rotational: null,
        friction: undefined
    };

    if (positionalVel) {
        velocity.positional = positionalVel;
    }
    else {
        velocity.positional = new Vector3();
    }

    if (rotationalVel) {
        velocity.rotational = rotationalVel;
    }
    else {
        velocity.rotational = new Euler();
    }

    if (friction) {
        velocity.friction = friction;
    }

    return velocity;
}