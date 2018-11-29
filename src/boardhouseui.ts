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
        // id: string;
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
    }

    function CreateWidget(elementType: WidgetTypes) : Widget {
        return new Widget(elementType);
    }

    function Render(element: Element, parentWidget: Widget) : void {
        const type: WidgetTypes = element.type;
        const props: BaseProps = element.props;

        // Create Widget.
        const widget: Widget = CreateWidget(type);

        Object.keys(props).forEach(propName => {
            // Add event listeners.
            if (propName.substring(0,2) === "on") {
                const eventType = propName.toLowerCase().substring(2);
                widget.addEventListener(eventType, props[propName]);
            }
            // Set properties.
            if (propName !== "children") {
                widget.attributes.push({propName: props[propName]})
            }
        });

        // Render children
        const childElements: Element[] = props.children || [];
        childElements.forEach(childElement => Render(childElement, widget));
        
        // Append to parent.
        parentWidget.appendChild(widget);
    }

    // function Instantiate(element: Element, parentWidget) {
    //     const type = element.type;
    //     const props = element.props;
    //     const childElements = props.children || [];
    // }

    // PIXI DOM Implementation details:

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