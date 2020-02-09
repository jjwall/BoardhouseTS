import { Rect, Manifold, getHitbox, getManifold, HitBoxComponent, HurtBoxComponent, HitBoxTypes } from "./../components/hitbox";
import { PositionComponent } from "./../components/position";

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

type Entity = {
    pos: PositionComponent;
    hitBox: HitBoxComponent;
    hurtBox: HurtBoxComponent;
    hitBoxTypes: HitBoxTypes;
}