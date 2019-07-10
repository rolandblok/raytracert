class Texture {
    constructor (color1_arg, color2_arg, reflective_arg, checker_arg=false, ambient_factor = 0.0) {
        this._reflective = reflective_arg;
        this._three_material = new THREE.MeshPhongMaterial( {color:color1_arg} );
        this._color2 = color2_arg;
        this._checker = checker_arg;
        this._ambient_color =  this._three_material.color.clone().multiplyScalar(ambient_factor)
    }

    is_reflective() {
        return this.reflective;
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
    get ambientColor() {
        return this._ambient_color.getHex();
    }
}