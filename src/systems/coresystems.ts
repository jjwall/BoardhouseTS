import {
    MeshBasicMaterial,
    NearestFilter,
    PlaneGeometry,
} from "three";
import { Entity } from "./../states/gameplay/entity";
import { Resources } from "./../engine/resourcemanager";
import { Rect, Manifold, getManifold, getHitbox } from "./../components/hitbox";

/**
 * Animation System
 * Collision System
 * Position System
 * Timer System
 */

/**
 * Animation System.
 * @param ents Lists of ents to run system with. Must have anim and sprite components.
 */
export function animationSystem(ents: ReadonlyArray<Entity>) : void {
    ents.forEach(ent => {
        if (ent.anim && ent.sprite) {
            ent.anim.ticks--;
            if (ent.anim.ticks <= 0) {
                ent.anim.frame = ent.anim.blob[ent.anim.sequence][ent.anim.frame].nextFrame;
                ent.anim.ticks = ent.anim.blob[ent.anim.sequence][ent.anim.frame].ticks;

                const newSpriteMap = Resources.instance.getTexture(ent.anim.blob[ent.anim.sequence][ent.anim.frame].texture);
                newSpriteMap.magFilter = NearestFilter;
                ent.sprite.material = new MeshBasicMaterial({ map: newSpriteMap, transparent: true });
            }
        }
    });
}

/**
 * Collision system.
 * @param ents List of ents to run system with. Hitting ents must have hitBox and pos components.
 * Hurting ents must have hurtBox and pos components.
 */
export function collisionSystem(ents: ReadonlyArray<Entity>) {
    type Body = {
        ent: Entity;
        rect: Rect;
    };

    const tryOnHit = (a: Entity, b: Entity, m: Manifold) => {
        if (a.hitBox.onHit && a.hitBox.collidesWith.includes(b.hitBox.collideType)) {
            a.hitBox.onHit(a, b, m);
        }
    };

    const allBodies = ents
        .filter(e => e.hitBox && e.pos)
        .map((e): Body => ({ ent: e, rect: getHitbox(e) }));

    allBodies.sort((a, b) => a.rect.left - b.rect.left);

    let bodyWindow = [] as Body[];

    for (const body of allBodies) {
        bodyWindow = bodyWindow.filter(otherBody => body.rect.left <= otherBody.rect.right);

        for (const otherBody of bodyWindow) {
            const manifold = getManifold(body.rect, otherBody.rect);

            if (manifold.width > 0 && manifold.height > 0) {
                // console.log('hit');
                tryOnHit(body.ent, otherBody.ent, manifold);
                tryOnHit(otherBody.ent, body.ent, manifold);
            }
        }

        bodyWindow.push(body);
    }
}

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
                ent.timer.ontimeout();

                // Remove timer component from the entity.
                ent.timer = undefined;
            }
        }
    });
}