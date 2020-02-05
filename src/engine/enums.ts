/**
 * Enums
 */

/**
 * Enum for all possible types of HurtBoxes. Naming is arbitrary
 * as long as they are properly set in HitBox "collidesWith" property
 * and HurtBox "type" property.
 */
export const enum HitBoxTypes {
    PLAYER,
    ENEMY,
}

/**
 * Enum for all possible types of HurtBoxes. Naming is arbitrary
 * as long as they are properly set in HitBox "collidesWith" property
 * and HurtBox "type" property.
 */
export const enum HurtBoxTypes {
    test,
    // ..
}

/**
 * List of all possible animation sequences.
 */
export const enum SequenceTypes {
    idle,
    walk,
    run,
    attack
}