import Field from "@/components/automaton/field.js"
import Const from "@/components/automaton/mutators/const.js"

export default class CustomMutator {
    constructor(field, rules) {
        this.rules = rules
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
        this.field.iterate((x, y, value) => {
            this.bufferField.set(x, y, value)
        })

        this.field.iterate((x, y) => {
            this.processCell(x, y)
        })

        this.bufferField.iterate((x, y, value) => {
            this.field.set(x, y, value)
        })
    }

    processCell(x, y) {
        const liveNeighbors = this.liveNeighbors(x, y)
        const alive = this.field.get(x,y)
        for (let rule of this.rules) {
            switch (rule.condition.type) {
                case Const.condType.living:
                    if (liveNeighbors === rule.condition.aliveCount) {
                        this.bufferField.set(x, y, rule.action.populate)
                        return
                    }
                    break
                case Const.condType.state:
                    if (alive === rule.condition.populated) {
                        this.bufferField.set(x, y, rule.action.populate)
                    }
                    break
            }
        }
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
