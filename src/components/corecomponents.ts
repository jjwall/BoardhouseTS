import {
    Vector3,
    Euler,
    Mesh,
} from "three";
import { Entity } from "./../states/gameplay/entity";
import { AnimationSchema } from "./../engine/engineinterfaces";
import { SequenceTypes } from "./../engine/enums";

/**
 * Position component
 * Velocity component
 * Hitbox component
 * Hurtbox component
 * Animation component
 * Timeout timer
 */


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