import { 
    Scene,
    Camera,
    WebGLRenderer,
    Mesh
} from "THREE";
// import { Entity } from "./entity";
import { RegistryKeyToSystemMap, RegistryKeyToEntityListMap } from "./interfaces";
import { ComponentKeys } from "./enums";
import { DeepReadonly } from "./deepreadonly";
import { Entity } from "./entity";

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
    // public getEntReg() : DeepReadonly<EntityRegistry> {
    //     return this.entityRegistry;
    // }
    // public getGlobalEnts() : ReadonlyArray<Object> {
    //     return this.entityRegistry.globalEntities;
    // }
    public getControllableEnts() : ReadonlyArray<Entity> {
        // return this.entityRegistry.controllableEntities;
        return this.entityRegistry["control"] as Entity[];
    }

    /**
     * Removes an entity from each entity list it's registered to, and it's corresponding sprite component (if exists).
     * @param ent Entity to be removed.
     * @param scene Scene entity should be removed from.
     */
    protected removeEntity<T extends Object & { sprite: Mesh }>(ent: T, scene: Scene) {
        // Remove sprite from scene if exists.
        if (ent.sprite) {
            scene.remove(ent.sprite);
        }

        // Remove entity from global ent list if registered.
        if (this.entityRegistry.globalEntities.indexOf(ent) !== -1) {
            this.entityRegistry.globalEntities.splice(this.entityRegistry.globalEntities.indexOf(ent), 1);
        }

        for (var component in ent) {
            if (component === ComponentKeys.control) {
                // Remove entity from controllable ent list if registered.
                if (this.entityRegistry.controllableEntities.indexOf(ent) !== -1) {
                    this.entityRegistry.controllableEntities.splice(this.entityRegistry.controllableEntities.indexOf(ent), 1);
                }
            }
        }
    }

    // protected registerEntity(ent: Object) : void {
    //     let entityComponents: Array<string> = [];
    //     // Register Entity to global ent list if not already registered.
    //     if (this.entityRegistry.globalEntities.indexOf(ent) === -1) {
    //         this.entityRegistry.globalEntities.push(ent);
    //     }

    //     for (var component in ent) {
    //         entityComponents.push(component);
    //         if (component === ComponentKeys.control) {
    //             // Register Entity to controllable ent list if not already registered.
    //             if (this.entityRegistry.controllableEntities.indexOf(ent) === -1) {
    //                 this.entityRegistry.controllableEntities.push(ent);
    //             }
    //         }
    //     }

    //     // If control component is not one of Entity's components, remove entity from controllable ent list if registered.
    //     if (entityComponents.indexOf(ComponentKeys.control) === -1)  {
    //         if (this.entityRegistry.controllableEntities.indexOf(ent) !== -1) {
    //             this.entityRegistry.controllableEntities.splice(this.entityRegistry.controllableEntities.indexOf(ent), 1);
    //         }
    //     }
    // }

    protected registerEntity(ent: Object) {
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

    protected registerSystem(system: (ents: ReadonlyArray<Object>, state: BaseState) => void, ecsRegistrationKey?: string) {
        if (ecsRegistrationKey) {
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
            // systemMap[key[0]](this.entityRegistry[key], this);
            systemMap[key](this.entityRegistry[key], this);
        });
    }

    // public rootWidget: BoardhouseUI.Widget;
}