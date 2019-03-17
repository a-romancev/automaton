export default class Renderer {
    constructor (canvasElement, field) {
        this.element = canvasElement
        this.field = field
        this.id = null
    }

    start () {
        this.stop()
        this.nextFrame()
    }

    stop () {
        window.cancelAnimationFrame(this.id)
    }

    render () {
        this.element.width = this.element.clientWidth
        this.element.height = this.element.clientHeight
        const ctx = this.element.getContext('2d')
        ctx.fillStyle = "#49A078"

        let height = this.element.clientHeight / this.field.height
        let width = this.element.clientWidth / this.field.width
        for (let y in this.field.data) {
            for (let x in this.field.data[y]) {
                if(this.field.data[y][x]) {
                    ctx.fillRect(x*width, y*height, width, height)
                }
            }
        }

        this.nextFrame()
    }

    nextFrame () {
        this.id = window.requestAnimationFrame(this.render.bind(this))
    }
}