import { 
    Scene,
    Camera,
    WebGLRenderer
} from "THREE";
import { Entity } from "./entity";
import { EntityRegistry } from "./interfaces";
import { ComponentKeys } from "./enums";
import { DeepReadonly } from "./deepreadonly";

export abstract class BaseState {
    protected constructor(scene: Scene, stateStack: BaseState[]) {
        this.scene = scene;
        this.stateStack = stateStack;
        this.entityRegistry = {
            globalEntities: [],
            controllableEntities: [],
        };

        for (var prop in this.entityRegistry) {
            if (!prop)
                throw new Error(`${prop} is not being defined.`);
        }
    }
    public abstract update() : void;
    public abstract render(renderer: WebGLRenderer, camera: Camera, scene: Scene) : void;
    public scene: Scene;
    public stateStack: BaseState[];
    private entityRegistry: EntityRegistry;
    public getEntReg() : DeepReadonly<EntityRegistry> {
        return this.entityRegistry;
    }
    public getGlobalEnts() : ReadonlyArray<Entity> {
        return this.entityRegistry.globalEntities;
    }
    public getControllableEnts() : ReadonlyArray<Entity> {
        return this.entityRegistry.controllableEntities;
    }

    /**
     * Removes an entity from each entity list it's registered to, and it's corresponding sprite component (if exists).
     * @param ent Entity to be removed.
     * @param scene Scene entity should be removed from.
     */
    protected removeEntity(ent: Entity, scene: Scene) {
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

    protected registerEntity(ent: Entity) : void {
        let entityComponents: Array<string> = [];
        // Register Entity to global ent list if not already registered.
        if (this.entityRegistry.globalEntities.indexOf(ent) === -1) {
            this.entityRegistry.globalEntities.push(ent);
        }

        for (var component in ent) {
            entityComponents.push(component);
            if (component === ComponentKeys.control) {
                // Register Entity to controllable ent list if not already registered.
                if (this.entityRegistry.controllableEntities.indexOf(ent) === -1) {
                    this.entityRegistry.controllableEntities.push(ent);
                }
            }
        }

        // If control component is not one of Entity's components, remove entity from controllable ent list if registered.
        if (entityComponents.indexOf(ComponentKeys.control) === -1)  {
            if (this.entityRegistry.controllableEntities.indexOf(ent) !== -1) {
                this.entityRegistry.controllableEntities.splice(this.entityRegistry.controllableEntities.indexOf(ent), 1);
            }
        }
    }

    // public rootWidget: BoardhouseUI.Widget;
}