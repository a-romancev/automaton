import Field from "@/components/automaton/field.js"

export default class GOLMutator {
    constructor(field) {
        this.field = field
        this.bufferField = new Field(this.field.width, this.field.height)
        this.timer = null
    }
    
    start() {
        this.stop()
        this.timer = setInterval(this.process.bind(this), 100)
    }

    stop() {
        clearInterval(this.timer)
        this.timer = null
    }

    process() {
        this.field.iterate( (x, y, value) => {
            this.bufferField.set(x, y,value)
        })
        
        this.field.iterate((x, y) => {
            this.processCell(x, y)
        })

        this.bufferField.iterate( (x, y, value) => {
            this.field.set(x, y, value)
        })
    }

    processCell(x, y) {
        const alive = this.field.get(x, y)
        const neighbors = this.liveNeighbors(x, y)
        if (alive && (neighbors === 2 || neighbors === 3)) {
            return
        }
        if (!alive && neighbors === 3) {
            this.bufferField.set(x, y, true)
            return
        }

        this.bufferField.set(x, y, false)
    }

    liveNeighbors(x, y) {
        let count = 0
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) {
                    continue
                }
                if (this.field.get(x+i, y+j)) {
                    count++
                }
            }
        }
        return count
    }
}
