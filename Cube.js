class Cube extends Primitive {
    constructor (id, three_scene, A, B, texture) {
        super(id, texture);
        this.type = "cube"
        var geometry = new THREE.BoxGeometry( 1, 1, 1  );
        this.three_mesh = new THREE.Mesh( geometry, this.texture._three_material );
        this.three_mesh.name = id;
        this.three_scene = three_scene
        this.three_scene.add( this.three_mesh )

        this._A = new THREE.Vector3(0,0,0)
        this._B = new THREE.Vector3(0,0,0)
        this.planes = {}
        this.planes["XF"]   = new Set()
        this.planes["XF"].n = new THREE.Vector3( 1, 0, 0)
        this.planes["XB"]   = new Set()
        this.planes["XB"].n = new THREE.Vector3(-1, 0, 0)
        this.planes["YF"]   = new Set()
        this.planes["YF"].n = new THREE.Vector3( 0, 1, 0)
        this.planes["YB"]   = new Set()
        this.planes["YB"].n = new THREE.Vector3( 0,-1, 0)
        this.planes["ZF"]   = new Set()
        this.planes["ZF"].n = new THREE.Vector3( 0, 0, 1)
        this.planes["ZB"]   = new Set()
        this.planes["ZB"].n = new THREE.Vector3( 0, 0,-1)
        this.updateCubePos(A, B)

    }

    hit(ray)
    {
        let hit_labda = null
        for (const [plane_id, plane] of Object.entries(this.planes)) {
            let labda = Plane.planehit(ray, plane.n, plane.d)
            let hitpoint = ray.evaluate(labda)
            if ( (hitpoint.x < this.planes["XF"].d) &&
                 (hitpoint.y < this.planes["YF"].d) &&
                 (hitpoint.z < this.planes["ZF"].d) &&
                 (hitpoint.x > this.planes["XB"].d) &&
                 (hitpoint.y > this.planes["YB"].d) &&
                 (hitpoint.z > this.planes["ZB"].d)    ) {
                    if ((hit_labda == null) || (labda < hit_labda)) {
                        hit_labda = labda
                    } 
                }
        }

        return hit_labda
    }

    get_normal(hit_point) {
       return new THREE.Vector3(1,0,0)
    }

    updateCubePos(A, B){
        this._A = A.clone()
        this._B = B.clone();
        
        this.planes["XF"].d = Math.max(A.x, B.x); 
        this.planes["XB"].d = Math.min(A.x, B.x)
        this.planes["YF"].d = Math.max(A.y, B.y); 
        this.planes["YB"].d = Math.min(A.y, B.y)
        this.planes["ZF"].d = Math.max(A.z, B.z);
        this.planes["ZB"].d = Math.min(A.z, B.z)

        this._scale = this._B.clone().sub(this._A)
        this._translate = this._A.clone().add(this._scale.clone().multiplyScalar(0.5))
        this.three_mesh.position.set(this._translate.x, this._translate.y, this._translate.z)
        this.three_mesh.scale.x = this._scale.x
        this.three_mesh.scale.y = this._scale.y
        this.three_mesh.scale.z = this._scale.z
    }

    //get/set position
    get Ax() {
        return this._A.x
    }
    get Ay() {
        return this._A.y
    }
    get Az() {
        return this._A.z
    }
    set Ax(x) {
        this._A.x = x
        this.updateCubePos(this._A, this._B)
    }
    set Ay(y) {
        this._A.y = y
        this.updateCubePos(this._A, this._B)
    }
    set Az(z) {
        this._A.z = z
        this.updateCubePos(this._A, this._B)
    }
    get Bx() {
        return this._B.x
    }
    get By() {
        return this._B.y
    }
    get Bz() {
        return this._B.z
    }
    set Bx(x) {
        this._B.x = x
        this.updateCubePos(this._A, this._B)
    }
    set By(y) {
        this._B.y = y
        this.updateCubePos(this._A, this._B)
    }
    set Bz(z) {
        this._B.z = z
        this.updateCubePos(this._A, this._B)
    }
}