class Primitive {
    constructor(id, texture) {
        this.type = "primitive"
        this.id = id
        this.texture = texture
        this.three_mesh = null
        this.three_scene = null
    }

    hit(ray) {
        throw new Error('Please implement Primitive.hit()');
    }

    delete () {
        this.three_scene.remove(this.three_mesh)
    }

}