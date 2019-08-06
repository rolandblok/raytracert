class Texture {
    constructor (color1H_arg, color2H_arg, reflective_arg, ambient_factor = 0.0, phong = false, phong_size = 25) {
        this._reflective = reflective_arg;
        this._three_material = new THREE.MeshPhongMaterial( {color:color1H_arg} );
        this._color1 = new Color(color1H_arg)
        this._color2 = new Color(color2H_arg)
        this._checker = false;
        this._marble = false
        this._ambient_color =  this.color1.clone().multiplyScalar(ambient_factor)
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
        return this._checker;
    }
    set checker(checker_arg) {
        this._marble = false;
        this._checker = checker_arg;
    }
    get marble() {
        return this._marble
    }
    set marble(marble_arg) {
        this._checker = false
        this._marble = marble_arg
    }
    get reflective() {
        return this._reflective;
    }
    set reflective(reflective_arg) {
        this._reflective = reflective_arg;
    }
    get color1() {
        return this._color1.clone()
    }
    get color1H () {
        return this._color1.getHex()
    }
    set color1H(color_arg) {
        this._color1.setHex(color_arg)
        this._three_material.color.setHex(color_arg)
    }

    get color2() {
        return this._color2.clone()
    }
    get color2H () {
        return this._color2.getHex()
    }
    set color2H(color_arg) {
        this._color2.setHex(color_arg)
    }

    set ambientColorH(color_arg) {
        this._ambient_color.setHex(color_arg)
    }

    /** ambientColo
     * 
     */
    get ambientColorH() {
        return this._ambient_color.getHex();
    }
    get ambientColor() {
        return this._ambient_color.clone();
    }

    threeColorAt(position) {
        if (this.checker ) {
            let x = Math.round(Math.abs(position.x))
            let y = Math.round(Math.abs(position.y))
            let z = Math.round(Math.abs(position.z))
            
            if ((x+y+z)%2 == 0) {
                return this.color1
            } else {
                return this.color2
            }
        } else if (this.marble) {
            let x = position.x * Math.PI * 2.0
            let y = position.y * Math.PI * 2.0
            let z = position.z * Math.PI * 2.0

            let scale = 1
            let turbulence = .5
            let xx = x-scale*Math.sin(x/turbulence);
            let yy = y+ scale*Math.cos(y/turbulence);

            let v = 0.5*(Math.sin(xx+yy)+1.0)
            let c1 = this.color1.multiplyScalar(v)
            let c2 = this.color2.multiplyScalar(1-v)
            let gradient_color = c1.add(c2)
            
            return gradient_color
        }
        else {
            return this.color1
        }
    }

    /** shade the surface          */
    shade(eye_ray, inverse_light_ray, light_color, N, position) {

        // diffuse : 
        var intensity_fraction = N.dot(inverse_light_ray.direction.clone().normalize());
        let mix_color = light_color.clone().multiply(this.threeColorAt(position))
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