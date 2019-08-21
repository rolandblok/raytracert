class Cube extends Primitive {
    constructor (id, three_scene, A, B, texture) {
        super(id, texture);
        this.type = "cube"
        var geometry = new THREE.BoxGeometry( 1, 1, 1  );
        this.three_mesh = new THREE.Mesh( geometry, this.texture._three_material );
        this.three_mesh.name = id;
        this.three_scene = three_scene
        this.three_scene.add( this.three_mesh )
        this.updateCubePos(A, B)
        

    }

    hit(ray)
    {
        let l = null
        let lr = null
        l = Plane.planehit(ray, this.XF_n, this.XF_d)
        if ((lr == null) || (l < lr)) { lr = l } 
        l = Plane.planehit(ray, this.XB_n, this.XB_d)
        if ((lr == null) || (l < lr)) { lr = l } 
        l = Plane.planehit(ray, this.YF_n, this.YF_d)
        if ((lr == null) || (l < lr)) { lr = l } 
        l = Plane.planehit(ray, this.YB_n, this.YB_d)
        if ((lr == null) || (l < lr)) { lr = l } 
        l = Plane.planehit(ray, this.ZF_n, this.ZF_d)
        if ((lr == null) || (l < lr)) { lr = l } 
        l = Plane.planehit(ray, this.ZB_n, this.ZB_d)
        if ((lr == null) || (l < lr)) { lr = l } 

        return lr
    }

    get_normal(hit_point) {
        return new THREE.Vector3(1,1,1)
    }

    updateCubePos(A, B){
        this._A = A.clone()
        this._B = B.clone()
        this._scale = B.clone().sub(A)
        this._translate = A.clone().add(this._scale.clone().multiplyScalar(0.5))
        this.three_mesh.position.set(this._translate.x, this._translate.y, this._translate.z)
        this.three_mesh.scale.x = this._scale.x
        this.three_mesh.scale.y = this._scale.y
        this.three_mesh.scale.z = this._scale.z

        // 6 planes to be defined: distance orig + normal for : XFront, XBack, YFront ,.. etc
        this.XF_n = new THREE.Vector3(1,0,0)
        this.XF_d = this._A.x > this._B.x ? this._A.x : this._B.x
        this.XB_n = new THREE.Vector3(-1,0,0)
        this.XB_d = this._A.x < this._B.x ? this._A.x : this._B.x
        this.YF_n = new THREE.Vector3(1,0,0)
        this.YF_d = this._A.y > this._B.y ? this._A.y : this._B.y
        this.YB_n = new THREE.Vector3(-1,0,0)
        this.YB_d = this._A.y < this._B.y ? this._A.y : this._B.y
        this.ZF_n = new THREE.Vector3(1,0,0)
        this.ZF_d = this._A.z > this._B.z ? this._A.z : this._B.z
        this.ZB_n = new THREE.Vector3(-1,0,0)
        this.ZB_d = this._A.z < this._B.z ? this._A.z : this._B.z
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