class Model {

    constructor (three_scene) {
        this.blocks = {}
        this.three_scene = three_scene;
    }

    addBlock(x,y,z,color) {

        var blokje = new Block(this.three_scene, x,y,z,color)
        var id = this._genID(x,y,z)
        this.blocks[id] = blokje

        return id;
    }

    addSphere(pos, color) {
        var sphere = new Sphere(this.three_scene, pos, color)
        var id = this._genID(pos.x, pos.y, pos.z)
        this.blocks[id] = sphere

        return id;
    
    }

    update(d_time_ms) {

    }

    getKeys() {
        return this.blocks(keys())
    }

    _genID(x,y,z) {
        return "" + x + "_" + y + "_" + z
    }
}

class Sphere {
    constructor (three_scene, pos, color) {
        this.p = pos
        var geometry = new THREE.SphereGeometry( 1, 15, 15  );
        var material = new THREE.MeshPhongMaterial( {color:color} );
        this.mesh_sphere = new THREE.Mesh( geometry, material );
        this.mesh_sphere.position.set(this.p.x+0.5, this.p.y+0.5, this.p.z+0.5)

        three_scene.add( this.mesh_sphere )
    }
}

class Block {
    constructor (three_scene, x, y, z, color) {
        this.x = x
        this.y = y
        this.z = z
        var geom_box = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshPhongMaterial( { color: color, emissive: 0x072534, side: THREE.DoubleSide, flatShading: true } );
        //var material = new THREE.MeshBasicMaterial( {color: color} );
        this.mesh_box = new THREE.Mesh( geom_box, material );
        this.mesh_box.position.set(this.x+0.5, this.y+0.5, this.z+0.5)
        three_scene.add( this.mesh_box );

    }


}