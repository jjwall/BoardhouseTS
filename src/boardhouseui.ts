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
        render(){};
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
        sprite: PIXI.Sprite;
        left: number;
        top: number;
        private text: string;
        private message: PIXI.Text;
        attr: {}[];
        parent: Widget;
        children: Widget[];
        /**
         * style must be set for this to trigger.
         */
        onClick: (e?: any) => void;
        /**
         * offHover and style must be set for this to trigger.
         */
        onHover: (e?: any) => void;
        /**
         * onHover and style must be set for this to trigger.
         */
        offHover: (e?: any) => void;
        // text: string;
        constructor() {
            this.children = [];
            this.selfContainer = new PIXI.Container();
            this.left = 0;
            this.top = 0;
        }
        appendChild(child: Widget) {
            child.parent = this;
            this.children.push(child);
        }

        setText(text: string, style: PIXI.TextStyle = null) {
            if (this.message === undefined) {
                if (style !== null) {
                    this.message = new PIXI.Text(text, style);
                }
                else {
                    this.message = new PIXI.Text(text);
                }
            }
            else if (style !== null) {
                this.message.style = style;
            }
            
            this.text = text;
        }
        addEventListener(eventType: string, event: () => void) {
            if (eventType === "click") {
                this.onClick = event;
            }
        }
        setAttributes(key: string, val: string){
            // TODO: Implement
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

            if (this.message !== undefined) {
                this.message.text = this.text;
                // message.x += 5;
                // message.y += 5;
                this.selfContainer.addChild(this.message);
            }
        }
    }

    export enum WidgetTypes {
        Div,
        Button,
        Input,
    }

    export function CreateWidget(style: Style = null, sprite: PIXI.Sprite = null) : Widget {
        let widget = new Widget();

        if (style !== null) {
            widget.style = style;
        }

        if (sprite !== null) {
            widget.sprite = sprite
        }

        return widget;
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