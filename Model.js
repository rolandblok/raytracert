class Model {

    constructor (three_scene) {
        this.primitives = {}
        this.primitive_counter = 0
        this.lights = []
        this.three_scene = three_scene;
    }

    raytrace(eye_ray){
        var total_color = new THREE.Color("black")

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
                    var color = hit_primitive.shade(inv_light_ray)
                    total_color = total_color.add(color)
                }

            }
        }

        return total_color
    }

    addLight(light) {
        this.lights.push(new Light(this.three_scene, light))

    }

    addPlane(normal, distance, color) {

        var plane = new Plane(this.three_scene, normal, distance,color)
        var id = this._genID(normal.x,normal.y,normal.z)
        this.primitives[id] = plane

        return id;
    }

    addSphere(pos, radius, color) {
        var sphere = new Sphere(this.three_scene, pos, radius, color)
        var id = this._genID(pos.x, pos.y, pos.z)
        this.primitives[id] = sphere

        return id;
    }


    update(d_time_ms) {

    }

    getKeys() {
        return this.blocks(keys())
    }

    _genID(x,y,z) {
        this.primitive_counter ++
        return "" +this.primitive_counter
    }
}





