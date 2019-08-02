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
        const calcValues = {
            liveNeighbors: this.liveNeighbors(x, y),
            alive: this.field.get(x,y)
        }
        for (let rule of this.rules) {
            if (checkCondition(calcValues, rule.condition)) {
                this.bufferField.set(x, y, rule.action.populate)
            }
        }
    }


    liveNeighbors(x, y) {
        let color_count = {}
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) {
                    continue
                }
                const color = this.field.get(x+i, y+j)
                if (!color_count[color]) {
                    color_count[color] = 0
                }
                color_count[color]++
            }
        }
        return color_count
    }
}

function checkCondition(calcValues, condition) {
    switch (condition.type) {

        case Const.condType.any:
            for (let c of condition.child.conditions) {
                if (checkCondition(calcValues, c)) {
                    return true
                }
            }
            return false

        case Const.condType.and:
            for (let c of condition.child.conditions) {
                if (!checkCondition(calcValues, c)) {
                    return false
                }
            }
            return true

        case Const.condType.living:
            let val = calcValues.liveNeighbors[condition.child.color]
            if (!val) {
                val = 0
            }
            if (operator(condition.child.operator, val, condition.child.aliveCount)) {
                return true
            }
            break

        case Const.condType.state:
            if (calcValues.alive === condition.child.populated) {
                return true
            }
            break
    }

    return false
}

function operator(operator, left, right) {
    switch (operator) {
        case Const.operType.eq:
            return left === right
        case Const.operType.neq:
            return left !== right
        case Const.operType.gt:
            return left > right
        case Const.operType.lt:
            return left < right
        case Const.operType.lte:
            return left <= right
        case Const.operType.gte:
            return left >= right
    }
}