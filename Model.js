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

    update(d_time_ms) {
        for (let block of Object.values(this.blocks)) {
            block.update(d_time_ms)
        }
    }

    getKeys() {
        return this.blocks(keys())
    }

    _genID(x,y,z) {
        return "" + x + "_" + y + "_" + z
    }
}

class Block {
    constructor (three_scene, x, y, z, color) {
        this.x = x/10
        this.y = y/10
        this.z = z/10
        var geom_box = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
        var material = new THREE.MeshPhongMaterial( { color: color, emissive: 0x072534, side: THREE.DoubleSide, flatShading: true } );
        //var material = new THREE.MeshBasicMaterial( {color: color} );
        this.mesh_box = new THREE.Mesh( geom_box, material );
        this.mesh_box.position.set(this.x+0.05, this.y+0.05, this.z+0.05)
        three_scene.add( this.mesh_box );

    }

    update(d_time_ms) {
        
       // this.mesh_box.rotation.x += 0.004;
       // this.mesh_box.rotation.y += 0.008;

    }
}