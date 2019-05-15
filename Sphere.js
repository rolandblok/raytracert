class Sphere extends Primitive {
    constructor (three_scene, pos, color) {
        super(color);
        this.p = pos
        this.radius = 2;
        var geometry = new THREE.SphereGeometry( this.radius, 15, 15  );
        var material = new THREE.MeshPhongMaterial( {color:color} );
        this.mesh_sphere = new THREE.Mesh( geometry, material );
        this.mesh_sphere.position.set(this.p.x+0.5, this.p.y+0.5, this.p.z+0.5)

        three_scene.add( this.mesh_sphere )
    }

    hit2(ray) {
        // https://en.wikipedia.org/wiki/Line%E2%80%93sphere_intersection
        var r = this.radius
        var C = this.p;
        var L = ray.direction;
        var O = ray.origin

        var O_C = O.clone().sub(C)
        var a = L.dot(L)
        var b = 2.0*(L.dot(O_C))
        var c = O_C.dot(O_C) - r*r

        var disc = b*b - 4.0*a*c
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