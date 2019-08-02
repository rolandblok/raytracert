class Light {
    constructor(three_scene, position, color_arg) {

        this.three_light = new THREE.PointLight( color_arg, 1, 0 );
        this.three_light.position.set(position.x, position.y, position.z)
        
        three_scene.add( this.three_light );
        
        this.lighthelper = new THREE.PointLightHelper(this.three_light)
        three_scene.add(this.lighthelper)
        
    }

    get position() {
        return this.three_light.position.clone()
    }

    get x() {
        return this.three_light.position.x
    }
    get y() {
        return this.three_light.position.y
    }
    get z() {
        return this.three_light.position.z
    }
    set x(x) {
        this.three_light.position.x = x
    }
    set y(y) {
        this.three_light.position.y = y
    }
    set z(z) {
        this.three_light.position.z = z
    }
    get color() {
        return this.three_light.color.getHex()
    }
    set color(color_arg) {
        this.three_light.color.setHex(color_arg)
    }
    get three_color() {
        return this.three_light.color;
    }

}