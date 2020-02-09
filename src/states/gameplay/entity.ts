import { TimerComponent } from "./../../components/corecomponents";
import { ControlComponent } from "./../../components/controlcomponent";
import { Mesh } from "three";
import { HitBoxTypes } from "./../../components/hitbox";
import { PositionComponent } from "./../../components/position";
import { VelocityComponent } from "./../../components/velocity";
import { HitBoxComponent, HurtBoxComponent } from "./../../components/hitbox";
import { AnimationComponent } from "./../../components/animation";

/**
 * Class to represent an entity in the game. No constructor as an entity can
 * comprise of as many or as little of the properties listed here. Each component
 * should have a corresponding system that handles the game logic needed to update
 * the properties within the component.
 */
export class Entity {
     public hitBoxTypes: HitBoxTypes;
     public pos: PositionComponent;
     public vel: VelocityComponent;
     public sprite: Mesh;
     public anim: AnimationComponent;
     public control: ControlComponent;
     public hitBox: HitBoxComponent;
     public hurtBox: HurtBoxComponent;
     public timer: TimerComponent;
}