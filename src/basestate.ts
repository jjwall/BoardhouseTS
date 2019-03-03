import { 
    Scene,
    Camera,
    WebGLRenderer,
    Mesh
} from "THREE";
import { RegistryKeyToSystemMap, RegistryKeyToEntityListMap } from "./interfaces";
import { ComponentKeys } from "./enums";

export abstract class BaseState {
    protected constructor(scene: Scene, stateStack: BaseState[]) {
        this.scene = scene;
        this.stateStack = stateStack;
    }
    public abstract update() : void;
    public abstract render(renderer: WebGLRenderer, camera: Camera, scene: Scene) : void;
    public scene: Scene;
    public stateStack: BaseState[];
    private ecsRegistrationKeys: Array<string> = [];
    private entityRegistry: RegistryKeyToEntityListMap = {};
    private systemRegistry: Array<RegistryKeyToSystemMap> = [];

    public getEntitiesByKey<T>(ecsRegistrationKey: string) {
        return this.entityRegistry[ecsRegistrationKey] as T[];
    }

    /**
     * Removes Entity from each Entity list it is registered to.
     * @param ent 
     */
    protected removeEntity(ent: object) {
        // Remove entity from global ent list if registered.
        if (this.entityRegistry["global"].indexOf(ent) !== -1) {
            this.entityRegistry["global"].splice(this.entityRegistry["global"].indexOf(ent), 1);
        }

        // Remove entity from each specified ent list if registered.
        this.ecsRegistrationKeys.forEach(key => {
            if (this.entityRegistry[key].indexOf(ent) !== -1) {
                this.entityRegistry[key].splice(this.entityRegistry[key].indexOf(ent), 1);
            }
        });
    }

    protected registerEntity(ent: object) {
        let entityComponents: Array<string> = [];

        for (var component in ent) {
            entityComponents.push(component);
        }

        this.ecsRegistrationKeys.forEach(key => {
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

    protected registerSystem(system: (ents: ReadonlyArray<object>, state: BaseState) => void, ecsRegistrationKey?: string) {
        if (ecsRegistrationKey) {
            if (ecsRegistrationKey === "global")
                throw Error (`"global" is a reserved keyword for non-specific entity component systems.`);

            this.systemRegistry.push({ [ecsRegistrationKey]: system });
            this.ecsRegistrationKeys.push(ecsRegistrationKey);
        }
        else {
            this.systemRegistry.push({ "global": system });
        }
    }

    protected runSystems() {
        this.systemRegistry.forEach(systemMap => {
            const key = Object.keys(systemMap)[0];

            systemMap[key](this.entityRegistry[key], this);
        });
    }

    // public rootWidget: BoardhouseUI.Widget;
}