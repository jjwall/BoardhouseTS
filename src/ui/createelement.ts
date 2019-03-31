import { JSX } from "./interfaces";

export function createElement(type: string, config: object, ...args: JSX.Element[]): JSX.Element {
    const props = Object.assign({}, config);
    const hasChildren = args.length > 0;
    const children = hasChildren ? [].concat(...args) : [];

    return { type, props, children };
}