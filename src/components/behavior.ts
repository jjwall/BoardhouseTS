interface Entity<B = unknown> {
    behavior: BehaviorComponent<B>;
}

type UpdateFunc = (entity: Entity) => void;

/**
 * Behavior component.
 */
export interface BehaviorComponent<T = unknown> {
    /** Generic state. Presumably used by the update function. */
    state: T;
    /** Update function, called each frame. */
    update: UpdateFunc;
}

/**
 * Creates a simple behavior based on an update function.
 * @param initialState Initial state value.
 * @param updateFunc Update function.
 */
export function setBehavior<T>(initialState: T, updateFunc: UpdateFunc): BehaviorComponent<T> {
    return {
        state: initialState,
        update: updateFunc,
    };
}

/** Generator type required by setBehaviorGenerator. */
export type BehaviorGenerator = Generator<void, void, unknown>;

type GeneratorFunc = (entity: Entity) => BehaviorGenerator;

type GeneratorState = {
    generatorFunc: GeneratorFunc;
    generator: null | BehaviorGenerator;
}

/**
 * Updates a generator-based behavior.
 * @param entity Entity to update.
 */
function updateGenerator(entity: Entity<GeneratorState>) {
    const state = entity.behavior.state;

    if (!state.generator) {
        state.generator = state.generatorFunc(entity);
    }

    const result = state.generator.next();

    if (result.done) {
        state.generator = null;
    }
}

/**
 * Creates a behavior based on a generator function. The generator will be advanced once per update.
 * @param generatorFunc Generator function to use during update.
 */
export function setBehaviorGenerator(generatorFunc: GeneratorFunc): BehaviorComponent<GeneratorState> {
    return {
        state: {
            generatorFunc: generatorFunc,
            generator: null,
        },
        update: updateGenerator,
    };
}
