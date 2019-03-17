export default class CloneGenerator {
    constructor(from, to) {
        this.from = from
        this.to = to
    }

    generate() {
        this.from.iterate((x, y, value) => {
            this.to.set(x, y, value)
        })
    }

}
