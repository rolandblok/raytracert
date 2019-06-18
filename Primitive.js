class Primitive {
    constructor(color, reflective) {
        this.color = new THREE.Color(color);
        this.reflective = reflective;
    }

    hit(ray) {
        throw new Error('Please implement Primitive.hit()');
    }

    get_normal(hit_point) {
        throw new Error('Please implement Primitive.get_normal()');
    }

    is_reflective() {
        return this.reflective;
    }

    shade(inverse_light_ray) {
        var hit_point = inverse_light_ray.origin;
        var normal = this.get_normal(hit_point);
        var intensity_fraction = normal.dot(inverse_light_ray.direction.clone().normalize());
        return this.color.clone().multiplyScalar(intensity_fraction);
    }
}