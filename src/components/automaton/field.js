export default class Field {
    constructor() {
        this.data = []
    }

    width() {
        if (!this.height()) {
            return 0
        }
        return this.data[0].length
    }

    height() {
        return this.data.length
    }

    get(x, y) {
        const h = this.height()
        const w = this.width()
        if (!h) {
            return false
        }
        const p = getPoint(x, y, w, h)
        return this.data[p.y][p.x]
    }

    set(x, y, value) {
        const h = this.height()
        const w = this.width()
        if (!h) {
            return
        }
        const p = getPoint(x, y, w, h)
        this.data[p.y][p.x] = value
    }
}

function getPoint(x, y, w, h) {
    x = x % w
    y = y % h
    if (x < 0) {
        x = w + x
    }
    if (y < 0) {
        y = h + y
    }

    return {x: x, y: y}
}
