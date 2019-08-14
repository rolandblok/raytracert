class Cube extends Primitive {
    constructor (id, three_scene, A, B, texture) {
        super(id, texture);
        this.type = "box"
        this._A = A.clone()
        this._B = B.clone()
        let scale = B.clone().sub(A)
        let translate = A.clone().add(scale.clone().multiplyScalar(0.5))
        var geometry = new THREE.BoxGeometry( translate.x, translate.y, translate.z  );
        this.three_mesh = new THREE.Mesh( geometry, this.texture._three_material );
        this.three_mesh.position.set(pos.x, pos.y, pos.z)
        this.three_mesh.name = id;

        three_scene.add( this.three_mesh )
    }

    hit(ray)
    {

    }

    get_normal(hit_point) {

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
        this.three_mesh.position.x = x
        this._A.x = x
    }
    set Ay(y) {
        this.three_mesh.position.y = y
        this._A.y = y
    }
    set Az(z) {
        this.three_mesh.position.z = z
        this._A.z = z
    }