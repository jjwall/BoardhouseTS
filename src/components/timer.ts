/**
 * Timer to call events after time expires.
 */
export interface TimerComponent {
    ticks: number;
    onTimeout: () => void;
}

/**
 * Helper to initialize timer component for an entity.
 * @param ticksUntilTimeout 
 * @param ontimeout 
 */
export function setTimer(ticksUntilTimeout: number, onTimeout: () => void): TimerComponent {
    return { ticks: ticksUntilTimeout, onTimeout: onTimeout };
}