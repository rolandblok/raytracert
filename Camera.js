class Camera {

    constructor (ortho, pos, up, look_at, back_color) {

        this.move_cam = "";
        this.ortho_camera = ortho
        this.z_rotation = 0;
        this.pos = pos
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

    raytrace(width_pix, height_pix, ctx) {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, width_pix, height_pix);
        var aspect = width_pix / height_pix
    }

}