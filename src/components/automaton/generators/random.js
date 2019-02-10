import Field from "@/components/automaton/field.js"

export default class RandomGenerator {
    constructor(width, height, density) {
        this.width = width
        this.height = height
        this.density = density
    }

    generate() {
        let field = new Field()
        for (let y = 0; y < this.height; y++) {
            field.data.push([])
            for (let x = 0; x < this.width; x++) {
                field.data[y].push(Math.random() < this.density)
            }
        }
        return field
    }
}
