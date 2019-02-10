import CloneGenerator from "@/components/automaton/generators/clone.js"

export default class Evolution {
    constructor(field) {
        this.readField = field
        this.writeField = null
        this.timer = null
    }
    start() {
        this.timer = setInterval(this.process.bind(this), 100)
    }

    stop() {
        clearInterval(this.timer)
    }

    process() {
        this.writeField = new CloneGenerator(this.readField).generate()

        for (let y = 0; y < this.readField.height(); y++) {
            for (let x = 0; x < this.readField.width(); x++) {
                this.processCell(x, y)
            }
        }

        this.readField.data = this.writeField.data
    }

    processCell(x, y) {
        const alive = this.readField.get(x, y)
        const neighbors = this.liveNeighbors(x, y)
        if (alive && (neighbors === 2 || neighbors === 3)) {
            return
        }
        if (!alive && neighbors === 3) {
            this.writeField.set(x, y, true)
            return
        }

        this.writeField.set(x, y, false)
    }

    liveNeighbors(x, y) {
        let count = 0
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) {
                    continue
                }
                if (this.readField.get(x+i, y+j)) {
                    count++
                }
            }
        }
        return count
    }
}
