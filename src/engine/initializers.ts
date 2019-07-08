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
    TimerComponent,
} from "./corecomponents";
import { Resources } from "../resourcemanager";
import { ControlComponent } from "./controlcomponent";
import { AnimationSchema } from "./engineinterfaces";

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
 * Helper for initializing an entity's hit box component.
 * Note: ``onHit`` callback should be set independently.
 * @param entMesh An entity's mesh A.K.A. sprite to be set before calling this function.
 * @param collidesWith List of HurtBox types the HitBox can collide with.
 * @param heightOverride (Optional) Exact number of pixels to set for the hurtBox's height.
 * Must also set ``widthOverride`` for this to take effect.
 * @param widthOverride (Optional) Exact number of pixels to set for the hurtBox's width.
 * Must also set ``heightOverride`` for this to take effect.
 * @param offsetX (Default 0) Number of pixels to offset the hurtbox's x position.
 * @param offsetY (Default 0) Number of pixels to offset the hurtbox's y position.
 */
export function initializeHitBox(entMesh: Mesh, collidesWith: HurtBoxTypes[], heightOverride?: number, widthOverride?: number, offsetX: number = 0, offsetY: number = 0) : HitBoxComponent {
    let hitBox: HitBoxComponent = { collidesWith: collidesWith, height: 0, width: 0, offsetX: offsetX, offsetY: offsetY };

    if (heightOverride && widthOverride) {
        if (heightOverride <= 0 || widthOverride <= 0)
            throw Error("overrides can't be less than or equal to 0.");
        hitBox.height = heightOverride;
        hitBox.width = widthOverride;
    }
    else {
        const boundingBox = new Box3().setFromObject(entMesh);

        hitBox.height = boundingBox.max.y - boundingBox.min.y;
        hitBox.width =  boundingBox.max.x - boundingBox.min.x;
    }

    return hitBox;
}

/**
 * Helper for initializing an entity's hurt box component.
 * Note: ``onHurt`` callback should be set independently.
 * @param entMesh An entity's mesh A.K.A. sprite to be set before calling this function.
 * @param hurtType HurtBox type.
 * @param heightOverride (Optional) Exact number of pixels to set for the hurtBox's height.
 * Must also set ``widthOverride`` for this to take effect.
 * @param widthOverride (Optional) Exact number of pixels to set for the hurtBox's width.
 * Must also set ``heightOverride`` for this to take effect.
 * @param offsetX (Default 0) Number of pixels to offset the hurtbox's x position.
 * @param offsetY (Default 0) Number of pixels to offset the hurtbox's y position.
 */
export function initializeHurtBox(entMesh: Mesh, hurtType: HurtBoxTypes, heightOverride?: number, widthOverride?: number, offsetX: number = 0, offsetY: number = 0) : HurtBoxComponent {
    let hurtBox: HurtBoxComponent = { type: hurtType, height: 0, width: 0, offsetX: offsetX, offsetY: offsetY };

    if (heightOverride && widthOverride) {
        if (heightOverride <= 0 || widthOverride <= 0)
            throw Error("overrides can't be less than or equal to 0.");
        hurtBox.height = heightOverride;
        hurtBox.width = widthOverride;
    }
    else {
        const boundingBox = new Box3().setFromObject(entMesh);

        hurtBox.height = boundingBox.max.y - boundingBox.min.y;
        hurtBox.width =  boundingBox.max.x - boundingBox.min.x;
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

/**
 * Helper to intialize velocity component for any entity.
 * @param acceleration 
 * @param positionalVel 
 * @param rotationalVel 
 * @param friction 
 */
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