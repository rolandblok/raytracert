class Light {
    constructor(three_scene, location) {
        this.loc = location

        this.three_light = new THREE.PointLight( 0xffffff, 1, 0 );
        this.three_light.position.set(location.x, location.y, location.z)
        
        three_scene.add( this.three_light );
        
        this.lighthelper = new THREE.PointLightHelper(this.three_light)
        three_scene.add(this.lighthelper)
        
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

}