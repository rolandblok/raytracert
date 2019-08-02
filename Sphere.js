class Sphere extends Primitive {
    constructor (id, three_scene, pos, _radius, texture) {
        super(id, texture);
        this.type = "sphere"
        var geometry = new THREE.SphereGeometry( 1, 15, 15  );
        this.three_mesh = new THREE.Mesh( geometry, this.texture._three_material );
        this.three_mesh.position.set(pos.x, pos.y, pos.z)
        this.three_mesh.scale.x = _radius
        this.three_mesh.scale.y = _radius
        this.three_mesh.scale.z = _radius
        this.three_mesh.name = id;

        three_scene.add( this.three_mesh )
    }

    hit(ray)
    {
        var R = this.three_mesh.scale.x ;
        var center = this.three_mesh.position;
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
        var center = this.three_mesh.position;
        var normal = hit_point.clone().sub(center);
        return normal.normalize();
    }

    //get/set position
    get x() {
        return this.three_mesh.position.x
    }
    get y() {
        return this.three_mesh.position.y
    }
    get z() {
        return this.three_mesh.position.z
    }
    set x(x) {
        this.three_mesh.position.x = x
    }
    set y(y) {
        this.three_mesh.position.y = y
    }
    set z(z) {
        this.three_mesh.position.z = z
    }
    get radius() {
        return this.three_mesh.scale.x
    }
    set radius(R) {
        this.three_mesh.scale.x = R
        this.three_mesh.scale.y = R
        this.three_mesh.scale.z = R
    }

}