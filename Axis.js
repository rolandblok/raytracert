
class Axis {

    constructor(three_scene) {
        this.three_scene = three_scene
        this.draw_axes()
    }


    draw_axes() {
        this.draw_axis(0xff0000, 1, 0, 0)
        this.draw_axis(0x00ff00, 0, 1, 0)
        this.draw_axis(0x0000ff, 0, 0, 1)

        var x
        x = this.draw_x(0xff0000) 
        x.position.x = 1
        x.position.y = 0.1
        x = this.draw_x(0xff0000) 
        x.rotateX(Math.PI/2)
        x.position.x = 1
        x.position.z = 0.1

        var y
        y = this.draw_y(0x00ff00) 
        y.position.y = 1
        y.position.x = 0.1
        y = this.draw_y(0x00ff00) 
        y.rotateY(Math.PI/2)
        y.position.y = 1
        y.position.z = 0.1
    }
    draw_axis(color_arg, x, y, z) {
        var material = new THREE.LineBasicMaterial( { color: color_arg } );
        var geom_axis = new THREE.Geometry();
        geom_axis.vertices.push(new THREE.Vector3( 0, 0, 0) );
        geom_axis.vertices.push(new THREE.Vector3( x, y, z) );
        var axis = new THREE.Line( geom_axis, material );
        this.three_scene.add(axis)

        var geom_tic
        var line_tic
        var ts = 0.05 //tic size
        geom_tic = new THREE.Geometry();
        for (var i = 0.1; i <= 1 ; i+=0.1 ) {
            geom_tic.vertices.push(new THREE.Vector3( x*i, y*i, z*i) );
            geom_tic.vertices.push(new THREE.Vector3( x*i+ z*ts, y*i+x*ts, z*i + y*ts) );

            geom_tic.vertices.push(new THREE.Vector3( x*i, y*i, z*i) );
            geom_tic.vertices.push(new THREE.Vector3( x*i + y*ts, y*i + z*ts, z*i + x*ts) );
        }
        line_tic = new THREE.LineSegments( geom_tic, material );
        this.three_scene.add(line_tic)
    }

    draw_x(color_arg) {
        var material = new THREE.LineBasicMaterial( { color: color_arg } );
        var geom_pen
        var line_pen

    //        var parent= new THREE.Object3D()
    //        this.three_scene.add(parent)

        geom_pen = new THREE.Geometry();
        geom_pen.vertices.push(new THREE.Vector3(  0,     0,    0) );
        geom_pen.vertices.push(new THREE.Vector3(  0.04,  0.04, 0) );
        geom_pen.vertices.push(new THREE.Vector3(  0,     0.04, 0) );
        geom_pen.vertices.push(new THREE.Vector3(  0.04,  0,    0) );
        line_pen = new THREE.LineSegments( geom_pen, material );
        this.three_scene.add(line_pen)

        return line_pen
    }
    draw_y(color_arg) {
        var material = new THREE.LineBasicMaterial( { color: color_arg } );
        var geom_pen
        var line_pen

    //        var parent= new THREE.Object3D()
    //        this.three_scene.add(parent)

        geom_pen = new THREE.Geometry();
        geom_pen.vertices.push(new THREE.Vector3(  0,     0.04, 0) );
        geom_pen.vertices.push(new THREE.Vector3(  0.02,  0.02, 0) );
        geom_pen.vertices.push(new THREE.Vector3(  0,     0,    0) );
        geom_pen.vertices.push(new THREE.Vector3(  0.04,  0.04, 0) );
        line_pen = new THREE.LineSegments( geom_pen, material );
        this.three_scene.add(line_pen)

        return line_pen
    }
}