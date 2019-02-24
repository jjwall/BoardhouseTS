import { 
     PositionComponent,
     VelocityComponent,
     AnimationComponent,
     ControllableComponent,
     HitBoxComponent,
     HurtBoxComponent,
     TimerComponent,
} from "./corecomponents";
import { Mesh } from "three";

/**
 * Class to represent an entity in the game. No constructor as an entity can
 * comprise of as many or as little of the properties listed here. Each component
 * should have a corresponding system that handles the game logic needed to update
 * the properties within the component.
 */
export class Entity {
     public pos: PositionComponent;
     public vel: VelocityComponent;
     public sprite: Mesh;
     public anim: AnimationComponent;
     public control: ControllableComponent;
     public hitBox: HitBoxComponent;
     public hurtBox: HurtBoxComponent;
     public timer: TimerComponent;
}

/**
 * Entity Registry.
 */
export interface EntityRegistry {
     globalEntities: Entity[];
     controllableEntities: Entity[];
 }

 /**
  * Components that warrant special entity registration.
  */
 export const Components = {
      control: "control",
 }