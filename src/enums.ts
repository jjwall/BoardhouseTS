
/**
 * List of all things that can collide get hurt. Naming is arbitrary
 * as long as they are properly set in HitBox "collidesWith" property
 * and HurtBox "type" property.
 */
export enum HurtTypes {
    test,
    // ..
}

/**
 * List of all possible animation sequences.
 */
export enum SequenceTypes {
    idle,
    walk,
    run,
    attack
}