class Ray {
    constructor(origin, point_2) {
        this.origin = origin;
        var direction  = new THREE.Vector3().subVectors( point_2, origin )

        this.direction = direction;
    }



    evaluate(lambda) {
        return new THREE.Vector3().addVectors(this.origin, this.direction.clone().multiplyScalar(lambda));
    }


}