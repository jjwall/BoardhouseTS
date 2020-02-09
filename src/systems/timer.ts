import { TimerComponent } from "./../components/timer";

/**
 * Timer system.
 * @param ents 
 */
export function timerSystem(ents: ReadonlyArray<Entity>) {
    ents.forEach(ent => {
        if (ent.timer) {
            ent.timer.ticks--;

            if (ent.timer.ticks <= 0) {
                // Trigger ontimeout callback function.
                ent.timer.onTimeout();

                // Remove timer component from the entity.
                ent.timer = undefined;
            }
        }
    });
}

type Entity = {
    timer: TimerComponent;
}