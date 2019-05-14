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





