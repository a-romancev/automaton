export default class Field {
    constructor(width, height) {
        this.data = []
        this.width = width
        this.height = height

        for (let y = 0; y < this.height; y++) {
            this.data.push([])
            for (let x = 0; x < this.width; x++) {
                this.data[y].push(false)
            }
        }
    }

    get(x, y) {
        const h = this.height
        const w = this.width
        if (!h) {
            return false
        }
        const p = getPoint(x, y, w, h)
        return this.data[p.y][p.x]
    }

    set(x, y, value) {
        const p = getPoint(x, y, this.width, this.height)
        this.data[p.y][p.x] = value
    }

    iterate(callback) {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                callback(x, y, this.data[y][x])
            }
        }
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