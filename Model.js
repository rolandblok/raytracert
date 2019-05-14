class Model {

    constructor (three_scene) {
        this.primitives = {}
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
            console.log("labda = " + labda)
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
                var inv_light_ray = new Ray(hit_point, light.loc)

                // zoek obstructies 
                // # todo schaduw

                // als geen obstructie
                var color = hit_primitive.shade(inv_light_ray)
                total_color = total_color.add(color)

            }
        }

        return total_color
    }

    addLight(light) {
        this.lights.push(new Light(this.three_scene, light))

    }

    addBlock(x,y,z,color) {

        var blokje = new Block(this.three_scene, x,y,z,color)
        var id = this._genID(x,y,z)
        this.primitives[id] = blokje

        return id;
    }

    addSphere(pos, color) {
        var sphere = new Sphere(this.three_scene, pos, color)
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
        return "" + x + "_" + y + "_" + z
    }
}





