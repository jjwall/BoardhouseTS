import { Entity } from "./../states/gameplay/entity";

export type Rect = {
    left: number;
    right: number;
    bottom: number;
    top: number;
};

export type Manifold = Rect & {
    width: number;
    height: number;
};

export const getHitbox = (e: Entity): Rect => ({
    left: e.pos.loc.x + e.hitBox.offsetX - e.hitBox.width / 2,
    right: e.pos.loc.x + e.hitBox.offsetX + e.hitBox.width / 2,
    bottom: e.pos.loc.y + e.hitBox.offsetY - e.hitBox.height / 2,
    top: e.pos.loc.y + e.hitBox.offsetY + e.hitBox.height / 2,
});

export const getManifold = (a: Rect, b: Rect): Manifold => {
    const rect = {
        left: Math.max(a.left, b.left),
        right: Math.min(a.right, b.right),
        bottom: Math.max(a.bottom, b.bottom),
        top: Math.min(a.top, b.top),
    };

    return {
        ...rect,
        width: rect.right - rect.left,
        height: rect.top - rect.bottom,
    };
};
