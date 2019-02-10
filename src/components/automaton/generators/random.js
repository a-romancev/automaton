export default class RandomGenerator {
    generate(width, height, density) {
        let field = {
            data:[]
        }
        for (let y = 0; y < height; y++) {
            field.data.push([])
            for (let x = 0; x < width; x++) {
                field.data[y].push(Math.random() < density)
            }
        }
        return field
    }


}