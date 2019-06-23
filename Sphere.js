class Sphere extends Primitive {
    constructor (id, three_scene, pos, _radius, texture) {
        super(id, texture);
        this.type = "sphere"
        var geometry = new THREE.SphereGeometry( 1, 15, 15  );
        this.mesh = new THREE.Mesh( geometry, this.texture.three_material );
        this.mesh.position.set(pos.x, pos.y, pos.z)
        this.mesh.scale.x = _radius
        this.mesh.scale.y = _radius
        this.mesh.scale.z = _radius
        this.mesh.name = id;

        three_scene.add( this.mesh )
    }

    hit(ray)
    {
        var R = this.mesh.scale.x ;
        var center = this.mesh.position;
        var origin = ray.origin;
        var direction = ray.direction;

        var t = origin.clone().sub(center);
        var a = direction.dot(direction);
        var b = 2.0*direction.dot(t);
        var c = t.dot(t) - R*R;

        var discriminant = b*b - 4.0*a*c;

        if (discriminant < 0) {
            return undefined;
        } else if (discriminant > 0) {
            var lambda1 = (-b+Math.sqrt(discriminant))/(2.0*a); 
            var lambda2 = (-b-Math.sqrt(discriminant))/(2.0*a);
            return Math.min(lambda1, lambda2);
        } 

        return -b/(2.0*a);
    }

    get_normal(hit_point) {
        var center = this.mesh.position;
        var normal = hit_point.clone().sub(center);
        return normal.normalize();
    }

    //get/set position
    get x() {
        return this.mesh.position.x
    }
    get y() {
        return this.mesh.position.y
    }
    get z() {
        return this.mesh.position.z
    }
    set x(x) {
        this.mesh.position.x = x
    }
    set y(y) {
        this.mesh.position.y = y
    }
    set z(z) {
        this.mesh.position.z = z
    }
    get radius() {
        return this.mesh.scale.x
    }
    set radius(R) {
        this.mesh.scale.x = R
        this.mesh.scale.y = R
        this.mesh.scale.z = R
    }

}