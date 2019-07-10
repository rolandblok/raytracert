class Model {

    constructor (three_scene) {
        this.primitives = {}
        this.primitive_counter = 0
        this.lights = []
        this.three_scene = three_scene;
    }

    raytrace(eye_ray, depth){
        let pixel_color = new THREE.Color("black")
        
        if (depth <= 0){
            return new THREE.Color("black");
        }

        // loop over primitives heen voor intersects
        var labda_min = undefined
        var hit_primitive = undefined
        var hit_point = undefined
        for (var primitive of Object.values(this.primitives)) {
            var labda = primitive.hit(eye_ray)
            if ((labda != undefined) && (labda > 0)) {
                if ((labda_min == undefined) || (labda_min > labda)) {
                    labda_min = labda
                    hit_primitive = primitive;
                }
            }
        }

        // kleinste labra is hit --> hitpoint
        if (labda_min != undefined) {
            hit_point = eye_ray.evaluate(labda_min)

            var ambient_color = new Color(hit_primitive.texture.ambientColor);

            var diffuse_color = new THREE.Color("black");
            // vind ray hitpoint tot lamp --> labda
            for(var light of this.lights) {
                var light_ray = new Ray(light.loc, hit_point)
                var inv_light_ray = new Ray(hit_point, light.loc)

                // zoek obstructies 
                var obstruction_detected = false
                for (var primitive of Object.values(this.primitives)) {
                    var lambda = primitive.hit(light_ray)
                    if ((lambda > FLOATING_POINT_ACCURACY) && (lambda < 1.0 - FLOATING_POINT_ACCURACY)) {
                        obstruction_detected = true
                        break
                    }
                }

                // als geen obstructie
                if (!obstruction_detected) {
                    var color = hit_primitive.shade(inv_light_ray, light.three_color)
                    diffuse_color = diffuse_color.add(color)
                }

            }

            var reflective_color = new THREE.Color("black");
            if (hit_primitive.texture.is_reflective()) {
                // Notation as in https://math.stackexchange.com/a/13263
                var d = eye_ray.direction;
                var n = hit_primitive.get_normal(hit_point);
                var r = new THREE.Vector3().subVectors(d, n.multiplyScalar(2.0*d.dot(n)))
                var new_point = new THREE.Vector3().addVectors( hit_point, r );
                var new_ray = new Ray(hit_point, new_point);

                reflective_color = this.raytrace(new_ray, depth-1);
            }

            ambient_color = ambient_color.add(diffuse_color);
            ambient_color = ambient_color.add(reflective_color);
            return ambient_color;
        }

        return new THREE.Color("black");
    }

    addLight(light_pos, color) {
        this.lights.push(new Light(this.three_scene, light_pos, color))
        return this.lights.length - 1
    }
    get no_lights() {
        return this.lights.length
    }

    addPlane(normal, distance, texture) {
        var id = this._genID(normal.x,normal.y,normal.z)
        var plane = new Plane(id, this.three_scene, normal, distance, texture)
        this.primitives[id] = plane

        return plane;
    }

    addSphere(pos, radius, texture) {
        var id = this._genID( pos.x, pos.y, pos.z)
        var sphere = new Sphere(id, this.three_scene, pos, radius, texture)
        this.primitives[id] = sphere

        return sphere;
    }

    getPrimitive(id) {
        return this.primitives[id]
    }

    update(d_time_ms) {

    }

    getKeys() {
        return this.blocks(keys())
    }

    _genID(type,x,y,z) {
        this.primitive_counter ++
        return this.primitive_counter 
    }
}





