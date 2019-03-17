export default class RandomGenerator {
    constructor(field, density) {
        this.density = density
        this.field = field
    }

    generate() {
        this.field.iterate((x, y, value) => {
            this.field.set(x, y, Math.random() < this.density)
        })
    }
}
