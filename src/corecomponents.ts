import {
    Vector3,
    Euler,
    Mesh,
    Box3
} from "three";
import { Entity } from "./entity";
import { AnimationSchema } from "./animationschema";
import { ControlComponent } from "./controlcomponent";
import { HurtBoxTypes, SequenceTypes } from "./enums";

/**
 * Position component.
 */
export interface PositionComponent {
    /** Location vector. */
    loc: Vector3;
    /** Direction vector. */
    dir: Vector3;
}

/**
 * Velocity component.
 */
export interface VelocityComponent {
    positional: Vector3;
    rotational: Euler;
    friction?: number;
}

/**
 * HitBox Component that represents the area that when colliding with
 * any of the "collidesWith" enum entries, entity will "hit" them.
 */
export interface HitBoxComponent {
    // collideType: Collidables;
    collidesWith: HurtBoxTypes[];
    height: number;
    width: number;
    onHit?: (hittingEnt: Entity, hurtingEnt: Entity) => void;
}

/**
 * HurtBox Component that represents the area that when colliding with
 * any of the "collidesWith" enum entries, entity will "hurt" them.
 */
export interface HurtBoxComponent {
    type: HurtBoxTypes;
    // collidesWith: Collidables[];
    height: number;
    width: number;
    onHurt?: (hurtingEnt: Entity, hittingEnt: Entity) => void;
}

/**
 * Animation Component.
 */
export interface AnimationComponent {
    sequence: SequenceTypes;
    blob: AnimationSchema;
    ticks: number;
    frame: number;
}

/**
 * Timer to call events after time expires.
 */
export interface TimerComponent {
    ticks: number;
    ontimeout: () => void;
}

/**
 * Free function to initialize ControllableComponent to maintain invariance
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