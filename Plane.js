class Plane extends Primitive {
    constructor (id, three_scene, normal, distance_to_origin_arg, texture) {
        super(id, texture);
        this.type = "plane"
        this.normal = normal.clone().normalize();
        this._distance_to_origin = distance_to_origin_arg

        var geometry = new THREE.PlaneGeometry( 200, 200, 32, 32  );
        this.three_mesh = new THREE.Mesh( geometry, texture._three_material );

        this._updatePositionMesh()

        this.three_mesh.name = id

        this.three_scene = three_scene
        this.three_scene.add( this.three_mesh )
    }

    _updatePositionMesh(){
        var position = this.normal.clone().multiplyScalar(this.distance_to_origin);
        this.three_mesh.position.set(position.x, position.y, position.z)
        this.three_mesh.lookAt(position.clone().add(this.normal))
    }

    hit(ray)
    {
        return Plane.planehit(ray, this.normal, this.distance_to_origin)
        
    }

    // made this helper, so cube can also use it :-)
    // https://en.wikipedia.org/wiki/Line%E2%80%93plane_intersection
    static planehit(ray, normal, distance_to_origin) {
        var direction = ray.direction
        var origin = ray.origin

        var denominator = direction.dot(normal)

        if (Math.abs(denominator) < FLOATING_POINT_ACCURACY) {
            return undefined
        }

        var numerator = distance_to_origin - normal.dot(origin)

        let labda =  numerator / denominator
        let hit_position = ray.evaluate(labda)
        let hit_normal = normal.clone();

        return new Hitpoint(labda, hit_position, hit_normal)
    }

    //get/set position
    get normal_x() {
        return this.normal.x
    }
    get normal_y() {
        return this.normal.y
    }
    get normal_z() {
        return this.normal.z
    }
    set normal_x(x) {
        this.normal.x = x
        this._updatePositionMesh()
    }
    set normal_y(y) {
        this.normal.y = y
        this._updatePositionMesh()
    }
    set normal_z(z) {
        this.normal.z = z
        this._updatePositionMesh()
    }
    get distance_to_origin() {
        return this._distance_to_origin
        
    }
    set distance_to_origin(distance_to_origin_arg) {
        this._distance_to_origin = distance_to_origin_arg
        this._updatePositionMesh()
    }
}