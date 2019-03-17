export default class DrawMutator {

    constructor(field, component) {
        this.component = component
        this.field = field
        this.isMousePressed = false

        this.onMouseDown = (event) => {
            this.isMousePressed = true
            this.set(event)
        }
        this.onMouseUp = () => {
            this.isMousePressed = false
        }
        this.onMouseMove = (event) => {
            this.set(event)
        }
    }

    start() {
        this.component.$el.addEventListener(
            "mousedown",
            this.onMouseDown
        )
        window.addEventListener(
            "mouseup",
            this.onMouseUp
        )
        this.component.$el.addEventListener(
            "mousemove",
            this.onMouseMove
        )
    }

    stop() {
        this.component.$el.removeEventListener(
            "mousedown",
            this.onMouseDown
        )
        window.removeEventListener(
            "mouseup",
            this.onMouseUp
        )
        this.component.$el.removeEventListener(
            "mousemove",
            this.onMouseMove
        )
    }

    coordinate(x, y) {
        const cellWidth = this.component.$el.clientWidth / this.field.width
        const cellHeight = this.component.$el.clientHeight / this.field.height
        return {
            x: Math.floor(x / cellWidth),
            y: Math.floor(y / cellHeight),
        }
    }

    set(event) {
        if (!this.isMousePressed) {
            return
        }
        let p = this.coordinate(event.layerX, event.layerY)
        this.field.set(p.x, p.y, true)
    }

}
