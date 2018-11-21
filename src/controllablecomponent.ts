/**
 * Controllable component. Class to maintain invariance between key presses.
 * Subject to change.
 */
export class ControllableComponent {
    public jump: boolean = false;
    private left: boolean = false;
    private right: boolean = false;
    public leftGet(): boolean {
        return this.left;
    }
    public leftSet(leftKey: boolean): void {
        if (!leftKey) {
            this.left = false;
        }
        else {
            if (!this.right) {
                this.left = true;
            }
        }
    }
    public rightGet(): boolean {
        return this.right;
    }
    public rightSet(rightKey: boolean): void {
        if (!rightKey) {
            this.right = false;
        }
        else {
            if (!this.left) {
                this.right = true;
            }
        }
    }
}