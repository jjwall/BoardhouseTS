import {
    Vector3,
    Euler,
    Mesh,
} from "three";
import { Entity } from "./../states/gameplay/entity";
import { AnimationSchema } from "./../engine/engineinterfaces";
import { HitBoxTypes, HurtBoxTypes, SequenceTypes } from "./../engine/enums";
import { Manifold } from "./../engine/commontypes";

/**
 * Position component
 * Velocity component
 * Hitbox component
 * Hurtbox component
 * Animation component
 * Timeout timer
 */

/**
 * HitBox Component that represents the area that when colliding with
 * any of the "collidesWith" enum entries, entity will "hit" them.
 */
export interface HitBoxComponent {
    collideType: HitBoxTypes;
    collidesWithHurtbox: HurtBoxTypes[];
    collidesWith: HitBoxTypes[];
    height: number;
    width: number;
    offsetX: number;
    offsetY: number;
    onHit?: (self: Entity, other: Entity, manifold: Manifold) => void;
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
    onHit?: (self: Entity, other: Entity, manifold: Manifold) => void;
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