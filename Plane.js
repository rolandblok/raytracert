class Plane extends Primitive {
    constructor (three_scene, normal, distance_to_origin, color) {
        super(color);
        this.normal = normal.clone().normalize();
        this.distance_to_origin = distance_to_origin
        var geometry = new THREE.PlaneGeometry( 200, 200, 32, 32  );
        var material = new THREE.MeshPhongMaterial( {color:color} );
        this.mesh_plane = new THREE.Mesh( geometry, material );

        var position = normal.clone().multiplyScalar(distance_to_origin);
        this.mesh_plane.position.set(position.x, position.y, position.z)
        this.mesh_plane.lookAt(position.clone().add(this.normal))
        three_scene.add( this.mesh_plane )
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
}