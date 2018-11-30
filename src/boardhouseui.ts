export namespace BoardhouseUI {
    class Component<Props, State> {
        state: Readonly<State>;
        props: Readonly<Props>;
        constructor(props: Props){
            this.props = props;
            this.state = this.state;
        };
        setState(newState: State) {
            this.state = newState;
            // Render(this);
        }
        componentDidMount(){};
        componentWillUnmount(){};
        render(){};
    }

    interface Element {
        type: WidgetTypes
        props: BaseProps;
    }

    interface BaseProps {
        children: Element[]; 
    }

    interface Style {
        color: number;
        height: number;
        width: number;
        // left: number;
        // top: number;
        lineWidth: number;
        lineColor: number;
    }

    export class Widget {
        selfContainer: PIXI.Container;
        style: Style;
        left: number;
        top: number;
        text: string;
        type: WidgetTypes | Component<BaseProps, object>;
        attributes: {}[];
        parent: Widget;
        children: Widget[];
        onClick: () => void;
        // text: string;
        constructor(widgetType: WidgetTypes | Component<BaseProps, object>) {
            this.type = widgetType;
            // set default attributes based on type;
            // if type label... this.attributes = 
            this.children = [];
            this.selfContainer = new PIXI.Container();
            this.left = 0;
            this.top = 0;
        }
        appendChild(child: Widget) {
            child.parent = this;
            this.children.push(child);
        }
        addEventListener(eventType: string, event: () => void) {
            if (eventType === "click") {
                this.onClick = event;
            }
        }
        setAttributes(key: string, val: string){

        }
        renderTo(outerContainer: PIXI.Container) {
            // if type is sprite // if type is box?

            outerContainer.addChild(this.selfContainer);
            this.selfContainer.position.set(this.left, this.top);

            // fix layering
            if (this.style !== undefined) {
                let rectangle = new PIXI.Graphics();
                rectangle.lineStyle(this.style.lineWidth, this.style.lineColor, 1);
                rectangle.beginFill(this.style.color);
                rectangle.drawRect(0,0, this.style.width, this.style.height);
                rectangle.endFill();
                this.selfContainer.addChild(rectangle);
            }

            if (this.text !== undefined) {
                let message = new PIXI.Text(this.text);
                message.x += 5;
                message.y += 5;
                this.selfContainer.addChild(message);
            }
        }
    }

    export enum WidgetTypes {
        Div,
        Button,
        Input,
    }

    export function CreateWidget(elementType: WidgetTypes) : Widget {
        return new Widget(elementType);
    }

    /**
     * Function for creating virtual dom elements.
     * @param type 
     * @param config 
     * @param children 
     */
    export function CreateElement(type: WidgetTypes, config: {}, ...args: Element[]) : Element{
        const props: BaseProps = {...config, children: []};

        if (args.length > 0) {
            props.children = [].concat(...args);
        }

        return { type, props };
    }

    // PIXI DOM Implementation details:

    /**
     * Reconciler for Pixi DOM.
     * @param parentWidget 
     * @param stage 
     */
    export function ReconcilePixiDom(parentWidget: Widget, stage: PIXI.Container) {
        parentWidget.renderTo(stage);

        if (parentWidget.children !== undefined && parentWidget.children.length > 0) {
            parentWidget.children.forEach(child => {
                reconcileChildren(child, parentWidget.selfContainer);
            });
        }

        function reconcileChildren(widget: Widget, container: PIXI.Container) {
            widget.renderTo(container);
            if (widget.children !== undefined && widget.children.length > 0) {
                widget.children.forEach(child => {
                    reconcileChildren(child, widget.selfContainer);
                });
            }
        }
    }
}