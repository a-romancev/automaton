import Field from "@/components/automaton/field.js"
import field from "../field";

export default class UserGenerator {

    constructor(width, height, component) {
        this.width = width
        this.height = height
        this.component = component
        this.field = new Field()
        this.isMousePressed = false

        window.onmousedown = function(event) {
            this.isMousePressed = true
            this.set(event)
        }.bind(this)

        window.onmouseup = function() {
            this.isMousePressed = false
        }.bind(this)

        component.$el.onmousemove = this.set.bind(this)

    }

    generate() {
        for (let y = 0; y < this.height; y++) {
            this.field.data.push([])
            for (let x = 0; x < this.width; x++) {
                this.field.data[y].push(false)
            }
        }
        return this.field
    }

    coordinate(x, y) {
        const cellWidth = this.component.$el.clientWidth / this.width
        const cellHeight = this.component.$el.clientHeight / this.height
        return {
            x: Math.floor(x / cellWidth),
            y: Math.floor(y / cellHeight),
        }
    }

    set(event) {
        if (Math.round(event.layerX) > 900 || Math.round(event.layerY) > 900) {
            return
        }
        if (!this.isMousePressed) {
            return
        }
        let p = this.coordinate(event.layerX, event.layerY)
        this.field.set(p.x, p.y, true)
    }

}
