import {
    Vector3,
    Euler,
} from "three";
import { Entity } from "./entity";
import { AnimationSchema } from "./interfaces";
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
    acceleration: number;
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
    offsetX: number;
    offsetY: number;
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
    offsetX: number;
    offsetY: number;
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