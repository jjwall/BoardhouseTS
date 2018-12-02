import { 
     PositionComponent,
     VelocityComponent,
     AnimationComponent,
     ControllableComponent,
     HitBoxComponent,
     HurtBoxComponent,
     TimerComponent,
} from "./corecomponents";

/**
 * Class to represent an entity in the game. No constructor as an entity can
 * comprise of as many or as little of the properties listed here. Each component
 * should have a corresponding system that handles the game logic needed to update
 * the properties within the component.
 */
export class Entity {
     public pos: PositionComponent;
     public vel: VelocityComponent;
     public sprite: PIXI.Sprite;
     public anim: AnimationComponent;
     public graphic: PIXI.Graphics;
     public control: ControllableComponent;
     public hitBox: HitBoxComponent;
     public hurtBox: HurtBoxComponent;
     public timer: TimerComponent;
}