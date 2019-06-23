class Texture {
    constructor (color_arg, reflective_arg) {
        this._reflective = reflective_arg;
        this.three_material = new THREE.MeshPhongMaterial( {color:color_arg} );
        
    }

    is_reflective() {
        return this.reflective;
    }

    get reflective() {
        return this._reflective;
    }
    set reflective(reflective_arg) {
        this._reflective = reflective_arg;
    }
    get color () {
        return this.three_material.color.getHex()
    }
    set color(color_arg) {
        this.three_material.color.setHex(color_arg)
    }

}