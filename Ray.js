class Ray {
    constructor(origin, direction) {
        this.origin = origin;
        this.direction = direction;
    }

    evaluate(lambda) {
        return THREE.Vector3.addVectors(this.origin, this.direction.copy().multiplyScalar(lambda));
    }


}