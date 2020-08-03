import { RegistryKeyToSystemMap, RegistryKeyToEntityListMap } from "./interfaces";
import { Engine } from "./engine"
import { Widget } from "../ui/widget";

export abstract class BaseState {
    protected constructor(engine: Engine, stateStack: BaseState[]) {
        this.engine = engine;
        this.stateStack = stateStack;
    }

    public abstract update() : void;

    public abstract render() : void;

    public rootWidget: Widget;

    protected stateStack: BaseState[];

    public engine: Engine;

    private ecsKeys: Array<string> = [];

    private entityRegistry: RegistryKeyToEntityListMap = {};

    private systemRegistry: Array<RegistryKeyToSystemMap> = [];

    /**
     * Get's an entity list by ecsKey. Will return undefined if a system hasn't been
     * registered under the provided key.
     * @param ecsKey 
     */
    public getEntitiesByKey<E>(ecsKey: keyof E) {
        return this.entityRegistry[ecsKey.toString()] as E[];
    }

    /**
     * Removes Entity from each Entity list it is registered to.
     * @param ent 
     */
    protected removeEntity<E>(ent: E) {
        // Remove entity from global ent list if registered.
        if (this.entityRegistry["global"].indexOf(ent) !== -1) {
            this.entityRegistry["global"].splice(this.entityRegistry["global"].indexOf(ent), 1);
        }

        // Remove entity from each specified ent list if registered.
        this.ecsKeys.forEach(key => {
            if (this.entityRegistry[key].indexOf(ent) !== -1) {
                this.entityRegistry[key].splice(this.entityRegistry[key].indexOf(ent), 1);
            }
        });
    }

    /**
     * Call after setting up an Entity's components. Will add Entity to global registry
     * and every specific registry for each ecsKey component match.
     * @param ent 
     */
    protected registerEntity<E extends {[index: string]: any}>(ent: E) {
        let entityComponents: Array<string> = [];

        for (var component in ent) {
            entityComponents.push(component);
        }

        this.ecsKeys.forEach(key => {
            // If Entity-Component-System registration key found in entity's components.
            if (entityComponents.indexOf(key) !== -1) {
                // Initialize ecsRegistrationKey's entity list if not already defined.
                if (!this.entityRegistry[key]) {
                    this.entityRegistry[key] = [];
                }

                // If not already registered, register entity to specified entity list.
                if (this.entityRegistry[key].indexOf(ent) === -1) {
                    this.entityRegistry[key].push(ent);
                }
            }

            // If registered to specified list, but component is undefined, remove entity from list due to re-registering.
            if (this.entityRegistry[key].indexOf(ent) !== -1 && !ent[key]) {
                this.entityRegistry[key].splice(this.entityRegistry[key].indexOf(ent), 1);
            }
        });

        // Initialize global entity list if not already defined.
        if (!this.entityRegistry["global"]) {
            this.entityRegistry["global"] = [];
        }

        // If not already registered, register entity to global entity list.
        if (this.entityRegistry["global"].indexOf(ent) === -1) {
            this.entityRegistry["global"].push(ent);
        }
    }

    /**
     * Should be called at the top of the state's constructor for each system used by the state.
     * Systems registered with provided ecsKeys will be given their own registry. Should provide
     * an ecsKey for systems that aren't shared among many entities.
     * @param system 
     * @param ecsKey Optional.
     */
    protected registerSystem<E>(system: (ents: ReadonlyArray<E>, state: BaseState) => void, ecsKey?: keyof E) {
        if (ecsKey) {
            const ecsKeyValue = ecsKey.toString();

            if (ecsKeyValue === "global")
                throw Error(`"global" is a reserved keyword for non-specific entity component systems.`);

            if (this.ecsKeys.indexOf(ecsKeyValue) !== -1) {
                throw Error(`"${ecsKeyValue}" is already being used to register a system.`);
            }

            this.systemRegistry.push({ [ecsKeyValue]: system });
            this.ecsKeys.push(ecsKeyValue);
        }
        else {
            this.systemRegistry.push({ "global": system });
        }
    }

    /**
     * Should be called by the state's update method.
     * @param state Passed in so subsystems have access to the state's public members.
     */
    protected runSystems(state: BaseState) {
        this.systemRegistry.forEach(systemMap => {
            const key = Object.keys(systemMap)[0];

            systemMap[key](this.entityRegistry[key], state);
        });
    }
}