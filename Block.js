class Block extends Primitive  {
    constructor (three_scene, x, y, z, color) {
        super();
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

    hit (ray)
    {
        
    }


}