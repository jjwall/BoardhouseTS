import * as THREE from "three";
import { SequenceTypes, AnimationSchema } from "./animationschema";

/**
 * Position component.
 */
export interface PositionComponent {
    x: number;
    y: number;
    z: number;
}

/**
 * Rudimentary velocity... will replace directions with
 * angle and magnitude later on
 */
export interface VelocityComponent {
    left: boolean;
    right: boolean;
    up: boolean;
    down: boolean;
    speed: number;
}

/**
 * Controllable component.
 */
export interface ControllableComponent {
    jump: boolean;
    attack: boolean;
    attackTimer: number;
    attacked: boolean;
    left: boolean;
    right: boolean;
}

/**
 * HitBox Component that represents the area that when colliding with
 * any of the "collidesWith" enum entries, entity will "hit" them.
 */
export interface HitBoxComponent {
    // collideType: Collidables;
    collidesWith: HurtTypes[];
    height: number;
    width: number;
    onHit: () => void;
}

/**
 * HurtBox Component that represents the area that when colliding with
 * any of the "collidesWith" enum entries, entity will "hurt" them.
 */
export interface HurtBoxComponent {
    type: HurtTypes;
    // collidesWith: Collidables[];
    height: number;
    width: number;
    onHurt?: () => void;
}

/**
 * Animation Component. Obj is to be set via a json file.
 * Change the sequence string to change which animation is
 * being played.
 */
export interface AnimationComponent {
    sequence: SequenceTypes;
    blob: AnimationSchema;
    ticks: number;
    frame: number;
}

/**
 * Timer for short-lived entities.
 */
export interface TimerComponent {
    ticks: number;
}

/**
 * List of all things that can collide with each other. Naming is arbitrary
 * as long as they are properly set in Hit/Hurt Box "collidesWith" property.
 */
export enum HurtTypes {
    test,
    // ..
}

/**
 * Free function to initialize ControllableComponent to maintain invariance
 * at creation of the object.
 */
export function initializeControls(): ControllableComponent {
    return {
        jump: false,
        attack: false,
        attackTimer: 0,
        attacked: false,
        left: false,
        right: false,
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
 * Helper for initializing an entity's hurt box.
 * Note: ``onHurt`` callback should be set independently.
 * @param entMesh An entity's mesh A.K.A. sprite to be set before calling this function.
 * @param hurtType HurtBox type.
 * @param offSetX (Default 0) Number of pixels to offset the hurtbox's x position from the entity's x position.
 * A positive number will result in a rightward shift of the hurtbox.
 * @param offSetY (Default 0) Number of pixels to offset the hurtbox's y position from the entity's y position.
 * A positive number will result in a downward shift of the hurtbox.
 * @param manualHeight (Optional) Exact number of pixels to set for the hurtBox's height.
 * Must also set ``manualWidth`` for this to take effect.
 * @param manualWidth (Optional) Exact number of pixels to set for the hurtBox's width.
 * Must also set ``manualHeight`` for this to take effect.
 */
export function initializeHurtBox(entMesh: THREE.Mesh, hurtType: HurtTypes, offSetX: number = 0, offSetY: number = 0, manualHeight?: number, manualWidth?: number) : HurtBoxComponent {
    let hurtBox: HurtBoxComponent = { type: hurtType, height: 0, width: 0 };

    if (manualHeight !== undefined && manualWidth !== undefined) {
        hurtBox.height = manualHeight - offSetY;
        hurtBox.width = manualWidth + offSetX;
    }
    else {
        const boundingBox = new THREE.Box3().setFromObject(entMesh);
        hurtBox.height = boundingBox.max.y - boundingBox.min.y - offSetY;
        hurtBox.width =  boundingBox.max.x - boundingBox.min.x + offSetX;
    }

    return hurtBox;
}