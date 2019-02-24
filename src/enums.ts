 /**
  * List of component keys from the Entity class.
  * Add components' keys to this enum for components
  * that warrant special entity registration. String
  * must match up with key from Entity object.
  */
 export const enum ComponentKeys {
      control = "control",
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