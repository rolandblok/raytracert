class Sphere extends Primitive {
    constructor (three_scene, pos, color) {
        super();
        this.p = pos
        var geometry = new THREE.SphereGeometry( 1, 15, 15  );
        var material = new THREE.MeshPhongMaterial( {color:color} );
        this.mesh_sphere = new THREE.Mesh( geometry, material );
        this.mesh_sphere.position.set(this.p.x+0.5, this.p.y+0.5, this.p.z+0.5)

        three_scene.add( this.mesh_sphere )
    }

    hit(ray)
    {
        var R = this.geometry.radius ;
        var center = this.p;
        var origin = ray.origin;
        var direction = ray.direction;

        var t = origin.clone().sub(center);
        var c2 = direction.dot(direction);
        var c1 = direction.dot(t);
        var c0 = t.dot(t) - R*R;

        var discriminant = c1*c1 - 4.0*c2*c0;

        if (discriminant < 0) {
            return undefined;
        } else if (discriminant > 0) {
            var lambda1 = (-c1+sqrt(discriminant))/(2.0*c2); 
            var lambda2 = (-c1-sqrt(discriminant))/(2.0*c2);
            return min(lambda1, lambda2);
        } 

        return -c1/(2.0*c2);
    }

    get_normal(hit_point) {
        var normal = hit_point.clone().sub(this.p);
        return normal.normalize();
    }
}