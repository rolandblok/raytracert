
class Editor {

    constructor(name) {

        this.canvas_raytracer = document.getElementById("canvas_raytrace");
        this.ctx_raytracer = this.canvas_raytracer.getContext("2d");

        this.name = name;
        this.canvas_gl = document.getElementById("canvas_gl");
        this.canvas_gl.addEventListener("mousedown", this, false);
        this.canvas_gl.addEventListener("mouseup", this, false);
        this.canvas_gl.addEventListener("mousemove", this, false);
        this.canvas_gl.addEventListener("click", this, false);
        this.canvas_gl.addEventListener("dblclick", this, false);
        this.canvas_gl.addEventListener("resize", this, false);
        window.addEventListener('resize', function bla(event){this.resize()})
        this.canvas_gl.addEventListener('keydown', this, false);
        this.canvas_gl.addEventListener('keyup', this, false);
        this.canvas_gl.addEventListener('wheel', this, false);
        //this.ctx = canvas.getContext("2d");

        // THREE / GL
        this.three_scene = new THREE.Scene();


        var pos, up, look_at, back_color;
        pos        = new THREE.Vector3(7, 7, 7);
        up         = new THREE.Vector3(0,   0,   1)
        look_at    = new THREE.Vector3(0,   0,  1)
        back_color = 0x000000
        this.camera = new Camera(false, pos, up, look_at, back_color)
        this.raycaster = new THREE.Raycaster(); 

                          
        // model
        this.model = new Model(this.three_scene);
        //this.model.addBlock(1, 1, 1, 0x009955 )

        // coor.sys
       // this.axis = new Axis(this.three_scene)

        this.renderer = new THREE.WebGLRenderer({canvas: this.canvas_gl, antialias: true, depth: true});
        this.renderer.setSize( window.innerHeight/2, window.innerHeight/2 );
        document.body.appendChild(this.renderer.domElement);

        //lights
        var light1_pos = new THREE.Vector3( 20, 0, 20)
        this.model.addLight(light1_pos)
        
        /*
        var light = new THREE.DirectionalLight( 0xffffff, 1 );
        light.position.set( 0, 0, 10 ).normalize();
        light.target.position.set( 0, 0, -10 ).normalize();
        this.three_scene.add( light );

        var lighthelper = new THREE.DirectionalLightHelper(light)
        this.three_scene.add(lighthelper)
        */

        this.stats = new Stats();
        document.body.appendChild(this.stats.dom);
        
        this.gui = new dat.GUI();
        var gui_raytrace = this.gui.addFolder('RayTracer')
        this.ray_trace_setting = new Set()
        this.ray_trace_setting.width = 640
        this.ray_trace_setting.height = 480
        gui_raytrace.add(this.ray_trace_setting, 'width')
        gui_raytrace.add(this.ray_trace_setting, 'height')
        gui_raytrace.add(this, 'raytrace')
        gui_raytrace.open();

        gui_raytrace.add(this, "load_default_model")

        var gui_new_primitive  = this.gui.addFolder('New primitive')
        this.new_primitive = new Set()
        this.new_primitive.type = 'sphere'
        this.new_primitive.x = 0
        this.new_primitive.y = 0
        this.new_primitive.z = 0
        this.new_primitive.r = 1
        this.new_primitive.color = "#ffffff"
        this.new_primitive.reflective = false
        gui_new_primitive.add(this.new_primitive, "type", ['sphere', 'plane'])
        gui_new_primitive.add(this.new_primitive, "x", -9, 9).step(0.1)
        gui_new_primitive.add(this.new_primitive, "y", -9, 9).step(0.1)
        gui_new_primitive.add(this.new_primitive, "z", -9, 9).step(0.1)
        gui_new_primitive.add(this.new_primitive, "r", -9, 9).step(0.1)
        gui_new_primitive.addColor(this.new_primitive, "color")
        gui_new_primitive.add(this.new_primitive, "reflective")

        gui_new_primitive.add(this, "addNewPrimitive")

        gui_new_primitive.open();

        var gui_camera = this.gui.addFolder('camera')
        gui_camera.add(this.camera, "x").step(0.5)
        gui_camera.add(this.camera, "y").step(0.5)
        gui_camera.add(this.camera, "z").step(0.5)
        gui_camera.add(this.camera, "look_at_x").step(0.5)
        gui_camera.add(this.camera, "look_at_x").step(0.5)
        gui_camera.add(this.camera, "look_at_z").step(0.5)
        gui_camera.open();

         
        this.primitive_gui = new dat.GUI();
        
        this.isDown = false;
        this.isDrag = false;
        this.mouse_down_position = {}
        this.mouse_position = new THREE.Vector2();
        this.last_update_time = null;



    }

    addNewPrimitive() {
        var vec = new THREE.Vector3(this.new_primitive.x, this.new_primitive.y, this.new_primitive.z);
        var primitive 
        if (this.new_primitive.type == 'sphere') {
           primitive = this.model.addSphere(vec, this.new_primitive.r, this.new_primitive.color, this.new_primitive.reflective)
        } else if (this.new_primitive.type == 'plane') {
            primitive = this.model.addPlane(vec, this.new_primitive.r, this.new_primitive.color, this.new_primitive.reflective)
        }
        this.model_gui.add(primitive, "id")
    }

    load_default_model() {
        var vec = new THREE.Vector3(-2, 0, 2);
        var r = 1 
        var color = "#ff0000"
        var refl = false
        this.model.addSphere(vec, r, color, refl)
        
        var vec = new THREE.Vector3(2, 0, 2);
        var r = 1 
        var color = "#00ff00"
        var refl = false
        this.model.addSphere(vec, r, color, refl)
        
        var vec = new THREE.Vector3(0, 2, 2);
        var r = 1 
        var color = "#0000ff"
        var refl = false
        this.model.addSphere(vec, r, color, refl)
        
        var vec = new THREE.Vector3(0, -2, 2);
        var r = 1 
        var color = "#ff00ff"
        var refl = true
        this.model.addSphere(vec, r, color, refl)
        
        var vec = new THREE.Vector3(0, 0, 1);
        var r = 0 
        var color = "#ffffff"
        var refl = false
        this.model.addPlane(vec, r, color, refl)
        
    }

    resize() {
        console.log("resise")
        this.renderer.setSize(window.innerHeight/2, window.innerHeight/2);

    }

    animLoop(cur_time_ms) {
        var me = this; // https://stackoverflow.com/questions/4586490/how-to-reference-a-function-from-javascript-class-method
        
        this.stats.begin();

        //update
        if(this.last_update_time_ms != null) {
            var d_time_ms = cur_time_ms - this.last_update_time_ms

            this.camera.update(d_time_ms);

            this.model.update(d_time_ms)    

        }
        this.last_update_time_ms = cur_time_ms;

        // draw
        window.requestAnimationFrame(function (cur_time) { me.animLoop(cur_time); });
        this.render();

        this.stats.end();

    }

    render() {
        this.renderer.render(this.three_scene, this.camera.THREEcamera)
            
    }

    raytrace() {
        this.canvas_raytracer.width  = this.ray_trace_setting.width
        this.canvas_raytracer.height = this.ray_trace_setting.height
        this.camera.raytrace(this.model, this.ray_trace_setting.width, this.ray_trace_setting.height, this.ctx_raytracer)
    }

    _raycastMouseToTile(e){
    }

    onmousemove(e) {
    };

    onmousedown(e) {
    }

    onmouseup(e) {
        var rect = this.canvas_gl.getBoundingClientRect();
        var x_pos = e.clientX - rect.left
        var y_pos = e.clientY - rect.top
        console.log("click "+ x_pos +" "+  y_pos)
        
            // some raycasting to deterimine the active tile.
            this.mouse_position.x = ( x_pos / this.canvas_gl.width ) * 2 - 1;
            this.mouse_position.y = - ( y_pos / this.canvas_gl.height ) * 2 + 1;
            this.raycaster.setFromCamera( this.mouse_position, this.camera.THREEcamera);
            var intersects = this.raycaster.intersectObjects( this.three_scene.children );
    
            var objects_ids =  intersects.map(x => x.object.name);
            for (let object_id of objects_ids) {
                console.log("id"+ object_id)
            }
                
        
    
    }

    keyDown(e){
    }

    keyUp(e){
    }

    wheel(e){
    }

    handleEvent(evt) {
        console.log("event type " + evt.type)
        switch (evt.type) {
            case "wheel":
                this.wheel(evt);
                break;
            case "keydown":
                this.keyDown(evt)
                break;
            case "resize":
                this.resize()
                break;
            case "mousemove":
                //mouse move also fires at click...
                this.onmousemove(evt);
                break;
            case "mousedown":
                this.onmousedown(evt);
                break;
            case "mouseup":
                this.onmouseup(evt);
                break;
            case "dblclick":
                break;
            case "keydown":
                this.keyDown(evt);
                break;
            case "keyup":
                this.keyUp(evt);
                break;
            default:
                return;
        }
    }
    
    
}
