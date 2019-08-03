export default class RandomGenerator {
    constructor(field, density) {
        this.density = density
        this.field = field
    }

    generate() {
        this.field.iterate((x, y) => {
            this.field.set(x, y, Math.random() < this.density)
        })
    }
}
