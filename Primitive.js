class Primitive {
    constructor(id, texture) {
        this.type = "primitive"
        this.id = id
        this.texture = texture
    }

    hit(ray) {
        throw new Error('Please implement Primitive.hit()');
    }

    get_normal(hit_point) {
        throw new Error('Please implement Primitive.get_normal()');
    }


    shade(inverse_light_ray) {
        var hit_point = inverse_light_ray.origin;
        var normal = this.get_normal(hit_point);
        var intensity_fraction = normal.dot(inverse_light_ray.direction.clone().normalize());
        return this.texture._three_material.color.clone().multiplyScalar(intensity_fraction);
    }
}