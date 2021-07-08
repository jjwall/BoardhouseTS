import { HitBoxComponent } from "./../../components/hitbox";
import { ControlComponent } from "../../components/control";
import { AnimationComponent } from "./../../components/animation";
import { PositionComponent } from "./../../components/position";
import { VelocityComponent } from "./../../components/velocity";
import { SpriteComponent } from "./../../components/sprite";
import { TimerComponent } from "./../../components/timer";
import { CooldownComponent } from "../../components/cooldown";
import { BehaviorComponent } from "src/components/behavior";

/**
 * Class to represent an entity in the game. No constructor as an entity can
 * comprise of as many or as little of the properties listed here. Each component
 * should have a corresponding system that handles the game logic needed to update
 * the properties within the component.
 */
export class Entity {
     public pos?: PositionComponent;
     public vel?: VelocityComponent;
     public sprite?: SpriteComponent;
     public anim?: AnimationComponent;
     public control?: ControlComponent;
     public hitBox?: HitBoxComponent;
     public timer?: TimerComponent;
     public cooldown?: CooldownComponent;
     public behavior?: BehaviorComponent;
}