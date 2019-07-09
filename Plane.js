class Plane extends Primitive {
    constructor (id, three_scene, normal, distance_to_origin_arg, texture) {
        super(id, texture);
        this.type = "plane"
        this.normal = normal.clone().normalize();
        this._distance_to_origin = distance_to_origin_arg

        var geometry = new THREE.PlaneGeometry( 200, 200, 32, 32  );
        this.mesh = new THREE.Mesh( geometry, texture._three_material );

        this._updatePositionMesh()

        this.mesh.name = id
        three_scene.add( this.mesh )
    }

    _updatePositionMesh(){
        var position = this.normal.clone().multiplyScalar(this.distance_to_origin);
        this.mesh.position.set(position.x, position.y, position.z)
        this.mesh.lookAt(position.clone().add(this.normal))
    }

    hit(ray)
    {
        var direction = ray.direction
        var origin = ray.origin

        var denominator = direction.dot(this.normal)

        if (Math.abs(denominator) < FLOATING_POINT_ACCURACY) {
            return undefined
        }

        var numerator = this.distance_to_origin - this.normal.dot(origin)

        return numerator / denominator
    }

    get_normal(hit_point) {
        return this.normal.clone();
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