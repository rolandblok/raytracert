class Camera {

    constructor (ortho, pos, up, look_at, back_color) {

        this.move_cam = "";
        this.ortho_camera = ortho
        this.z_rotation = 0;
        this.look_at = look_at

        this.fov = 45
        
        //THREE
        if (ortho) {
            //OrthographicCamera( left : Number, right : Number, top : Number, bottom : Number, near : Number, far : Number )
            //left — Camera frustum left plane.
            //right — Camera frustum right plane.
            //top — Camera frustum top plane.
            //bottom — Camera frustum bottom plane.
            //near — Camera frustum near plane.
            //far — Camera frustum far plane.
            this.THREEcamera = new THREE.OrthographicCamera(1, -1, 1, -1, 0.01 , 100)
        }
        else {
            //PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
            //fov — Camera frustum vertical field of view.
            //aspect — Camera frustum aspect ratio.
            //near — Camera frustum near plane.
            //far — Camera frustum far plane.
            this.THREEcamera = new THREE.PerspectiveCamera( this.fov, 1, 0.01, 2000 );
        }
        this.THREEcamera.up = up
        this.THREEcamera.position.copy(pos)
        this.THREEcamera.lookAt(look_at)

        this.back_color = back_color;
    }

    //look_at get/set
    get look_at_x() {
        return this.look_at.x
    }
    get look_at_y() {
        return this.look_at.y
    }
    get look_at_z() {
        return this.look_at.z
    }
    set look_at_x(x) {
        this.look_at.x = x
        this.THREEcamera.lookAt(this.look_at)
    }
    set look_at_y(y) {
        this.look_at.y = y
        this.THREEcamera.lookAt(this.look_at)

    }
    set look_at_z(z) {
        this.look_at.z = z
        this.THREEcamera.lookAt(this.look_at)
    }
    //position get/set
    get x() {
        return this.THREEcamera.position.x
    }
    get y() {
        return this.THREEcamera.position.y
    }
    get z() {
        return this.THREEcamera.position.z
    }
    set x(x) {
        this.THREEcamera.position.x = x
        this.THREEcamera.lookAt(this.look_at)
    }
    set y(y) {
        this.THREEcamera.position.y = y
        this.THREEcamera.lookAt(this.look_at)

    }
    set z(z) {
        this.THREEcamera.position.z = z
        this.THREEcamera.lookAt(this.look_at)
    }

    resize(width, height) {
        this.THREEcamera.aspect = width / height;
        this.THREEcamera.updateProjectionMatrix();
    }

    setViewPort(renderer){

        var left = Math.floor( 0  );
        var bottom = Math.floor( 0 );
        var width = Math.floor( window.innerHeight  );
        var height = Math.floor( window.innerHeight  );

        renderer.setViewport( left, bottom, width, height );
        renderer.setScissor( left, bottom, width, height );
        renderer.setScissorTest( true );
        renderer.setClearColor( this.back_color );

        this.resize(width, height);
    }

    update(d_time_ms){
        this.z_rotation += 0.01
        //if (!this.ortho_camera) {
        if(false){
            this.THREEcamera.position.x = this.pos.x * Math.cos(this.z_rotation) - this.pos.y * Math.sin(this.z_rotation);
            this.THREEcamera.position.y = this.pos.x * Math.sin(this.z_rotation) + this.pos.y * Math.cos(this.z_rotation);
            this.THREEcamera.lookAt(this.look_at)

        }
    }

    raytrace(model, width_pix, height_pix, ctx) {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, width_pix, height_pix);

        var aspect = 1.0 * width_pix / height_pix

        // create ray
        var look_dir_n = this.look_at.clone().sub(this.THREEcamera.position).normalize()
        var look_left_n = this.THREEcamera.up.clone().cross(look_dir_n).normalize()
        var look_up_n = look_dir_n.clone().cross(look_left_n)
        for (let x = 0; x < width_pix; x++) {
            for (let y = 0; y < height_pix; y++){
                var xx = 0.5 - (x/width_pix) 
                var yy = 0.5 - (y/height_pix)
                var dy = look_up_n.clone().multiplyScalar(yy)
                var dx = look_left_n.clone().multiplyScalar(xx*aspect);
                var dd = new THREE.Vector3().addVectors(dx, dy)
                var D  = new THREE.Vector3().addVectors( look_dir_n, dd )
                D.add(this.THREEcamera.position)

                var ray = new Ray(this.THREEcamera.position, D)
                var color = model.raytrace(ray)
                // insert color paiunt on ctx
                ctx.fillStyle = "#"+color.getHexString();
                ctx.fillRect(x, y, 1, 1);

            }
        }



    }

}