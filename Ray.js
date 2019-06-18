class Ray {
    constructor(origin, end_point) {
        this._origin = origin;
        this._end_point = end_point
        this._direction = new THREE.Vector3().subVectors( end_point, origin );
    }

    get origin() {
        return this._origin.clone();
    }

    get end_point() {
        return this._end_point.clone();
    }

    get direction() {
        return this._direction.clone()
    }

    evaluate(lambda) {
        return new THREE.Vector3().addVectors(this._origin, this._direction.clone().multiplyScalar(lambda));
    }




}