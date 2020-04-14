import { CooldownComponent } from "../components/cooldown";

/**
 * Cooldown system. 60 cooldown ticks is roughly 1 second
 * @param ents 
 */
export function cooldownSystem(ents: ReadonlyArray<Entity>) {
    ents.forEach(ent => {
        if (ent.cooldown && ent.cooldown.cooldownRemaining > 0) {
            ent.cooldown.cooldownRemaining--;
        }
    });
}

type Entity = {
    cooldown: CooldownComponent;
}