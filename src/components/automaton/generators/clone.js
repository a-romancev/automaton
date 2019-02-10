import Field from "@/components/automaton/field.js"

export default class CloneGenerator {
    constructor(field) {
        this.field = field
    }

    generate() {
        let field = new Field()
        for (let y = 0; y < this.field.width(); y++) {
            field.data.push([])
            for (let x = 0; x < this.field.height(); x++) {
                field.data[y].push(this.field.data[y][x])
            }
        }
        return field
    }
}
