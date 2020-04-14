/**
 * Cooldown to delay actions until cooldown completes.
 */
export interface CooldownComponent {
    cooldown: number;
    cooldownRemaining: number;

    /**
     * Returns true and starts cooldown only if not currently on cooldown, otherwise returns false
     */
    restartCooldown: () => boolean;
}

/**
 * Helper to initialize cooldown component for an entity.
 * @param cooldown: Cooldown delay in in-game ticks
 */
export function setCooldown(cooldown: number): CooldownComponent {
    return { cooldown: cooldown, cooldownRemaining: 0, restartCooldown: restartCooldown };
}

export function restartCooldown(): boolean {
    if (this.cooldownRemaining === 0)
    {
        // We're off cooldown, can start it again.
        this.cooldownRemaining = this.cooldown;
        return true;
    }

    return false;
}