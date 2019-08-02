class Primitive {
    constructor(id, texture) {
        this.type = "primitive"
        this.id = id
        this.texture = texture
        this.three_mesh = null
    }

    hit(ray) {
        throw new Error('Please implement Primitive.hit()');
    }

    get_normal(hit_point) {
        throw new Error('Please implement Primitive.get_normal()');
    }


}