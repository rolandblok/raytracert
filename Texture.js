class Texture {
    constructor (color1_arg, color2_arg, reflective_arg, checker_arg=false, ambient_factor = 0.0, phong = false, phong_size = 25) {
        this._reflective = reflective_arg;
        this._three_material = new THREE.MeshPhongMaterial( {color:color1_arg} );
        this._color2 = color2_arg;
        this._checker = checker_arg;
        this._ambient_color =  this._three_material.color.clone().multiplyScalar(ambient_factor)
        this._phong = phong
        this._phong_size = phong_size
    }

    is_reflective() {
        return this.reflective;
    }

    get phong() {
        return this._phong
    }
    set phong(phong_on) {
        this._phong = phong_on
    }
    get phong_size() {
        return this._phong_size;
    }
    set phong_size(val) {
        this._phong_size = val
    }
    get checker() {
        return this._reflective;
    }
    set checker(checker_arg) {
        this._checker = checker_arg;
    }
    get reflective() {
        return this._reflective;
    }
    set reflective(reflective_arg) {
        this._reflective = reflective_arg;
    }
    get color1 () {
        return this._three_material.color.getHex()
    }
    set color1(color_arg) {
        this._three_material.color.setHex(color_arg)
    }

    get color2 () {
        return this._color2
    }
    set color2(color_arg) {
        this._color2 = color_arg
    }

    set ambientColor(color_arg) {
        this._ambient_color.setHex(color_arg)
    }
    /** ambientColo
     * 
     */
    get ambientColor() {
        return this._ambient_color.getHex();
    }

    /** shade the surface          */
    shade(eye_ray, inverse_light_ray, light_color, N) {

        // diffuse : 
        var intensity_fraction = N.dot(inverse_light_ray.direction.clone().normalize());
        let mix_color = light_color.clone().multiply(this._three_material.color)
        mix_color = mix_color.multiplyScalar(intensity_fraction)

        // specular  https://en.wikipedia.org/wiki/Phong_reflection_model
        if (this.phong) {
            let L = inverse_light_ray.direction_n
            let R = (N.clone().multiplyScalar(2.0*(L.dot(N))).sub(L))
            let ph = Math.pow(Math.abs(eye_ray.direction_n.dot(R)), this.phong_size)
            let phong_color = light_color.clone().multiplyScalar(ph)
            mix_color.add(phong_color)
        }

        return mix_color;
    }


}