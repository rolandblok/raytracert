class Sphere extends Primitive {
    constructor (three_scene, pos, radius, color, reflective) {
        super(color, reflective);
        this.p = pos
        this.radius = radius;
        var geometry = new THREE.SphereGeometry( this.radius, 15, 15  );
        var material = new THREE.MeshPhongMaterial( {color:color} );
        this.mesh_sphere = new THREE.Mesh( geometry, material );
        this.mesh_sphere.position.set(this.p.x, this.p.y, this.p.z)

        three_scene.add( this.mesh_sphere )
    }

    hit(ray)
    {
        var R = this.radius ;
        var center = this.p;
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
        var normal = hit_point.clone().sub(this.p);
        return normal.normalize();
    }
}