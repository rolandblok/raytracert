
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

        let GL_width = 640
        let GL_height = 480
        let pos        = new THREE.Vector3(10, 10, 8);
        let up         = new THREE.Vector3(0,   0,   1)
        let look_at    = new THREE.Vector3(0,   0,  2.5)
        let back_color = 0x000000
        this.camera = new Camera(false, GL_width, GL_height, pos, up, look_at, back_color)
        this.raycaster = new THREE.Raycaster(); 
                          
        // model
        this.model = new Model(this.three_scene);
        // coor.sys
        //this.axis = new Axis(this.three_scene)
 
        this.renderer = new THREE.WebGLRenderer({canvas: this.canvas_gl, antialias: true, depth: true});
        this.renderer.setSize( GL_width, GL_height );
        
        
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
        gui_raytrace.add(this, "clear_model")
        gui_raytrace.add(this, "load_default_model")
        gui_raytrace.add(this, 'raytrace')
        gui_raytrace.add(this.camera, "ray_status" ).listen()
        gui_raytrace.open();



        var gui_camera = this.gui.addFolder('camera')
        gui_camera.add(this.camera, "x").step(0.5)
        gui_camera.add(this.camera, "y").step(0.5)
        gui_camera.add(this.camera, "z").step(0.5)
        gui_camera.add(this.camera, "look_at_x").step(0.5)
        gui_camera.add(this.camera, "look_at_x").step(0.5)
        gui_camera.add(this.camera, "look_at_z").step(0.5)
        gui_camera.open();


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
        gui_new_primitive.add(this.new_primitive, "x").step(0.1)
        gui_new_primitive.add(this.new_primitive, "y").step(0.1)
        gui_new_primitive.add(this.new_primitive, "z").step(0.1)
        gui_new_primitive.add(this.new_primitive, "r").step(0.1)
        gui_new_primitive.addColor(this.new_primitive, "color")
        gui_new_primitive.add(this.new_primitive, "reflective")
        gui_new_primitive.add(this, "addNewPrimitive")
        gui_new_primitive.open()

        var gui_new_light  = this.gui.addFolder('New Light')
        this.new_light = new Set()
        this.new_light.x = 0
        this.new_light.y = 10
        this.new_light.z = 10
        this.new_light.color = "#ff0000"
        this.new_light.x_gui = gui_new_light.add(this.new_light, "x").step(0.1)
        this.new_light.y_gui = gui_new_light.add(this.new_light, "y").step(0.1)
        this.new_light.z_gui =  gui_new_light.add(this.new_light, "z").step(0.1)
        this.new_light.c_gui = gui_new_light.addColor(this.new_light, "color").listen()
        gui_new_light.add(this, "addNewLight")

        gui_new_light.open();

        
        this.gui_edit = new dat.GUI();
        this.gui_primitive_edit_fldr = this.gui_edit.addFolder("primitive")
        this.gui_texture_edit_fldr = this.gui_edit.addFolder("texture")
        this.gui_edit_light_fldrs = []

        this.isDown = false;
        this.isDrag = false;
        this.mouse_down_position = {}
        this.mouse_position = new THREE.Vector2();
        this.last_update_time = null;



    }

    addNewPrimitive() {
        let vec = new THREE.Vector3(this.new_primitive.x, this.new_primitive.y, this.new_primitive.z);
        let primitive 
        if (this.new_primitive.type == 'sphere') {
           let texture = new Texture(this.new_primitive.color, this.new_primitive.color, this.new_primitive.reflective)
           primitive = this.model.addSphere(vec, this.new_primitive.r, texture)
        } else if (this.new_primitive.type == 'plane') {
            let texture = new Texture(this.new_primitive.color, this.new_primitive.color, this.new_primitive.reflective)
            primitive = this.model.addPlane(vec, this.new_primitive.r, texture)
        }
    }

    addNewLight() {
        let pos = new THREE.Vector3(this.new_light.x, this.new_light.y, this.new_light.z);
        let light_nr = this.model.addLight(pos, this.new_light.color)

        this.gui_edit_light_fldrs[light_nr] = this.gui_edit.addFolder("light " + light_nr)

        this.gui_edit_light_fldrs[light_nr].gui_x = this.gui_edit_light_fldrs[light_nr].add(this.model.lights[light_nr], "x").step(0.5)
        this.gui_edit_light_fldrs[light_nr].gui_y = this.gui_edit_light_fldrs[light_nr].add(this.model.lights[light_nr], "y").step(0.5)
        this.gui_edit_light_fldrs[light_nr].gui_z = this.gui_edit_light_fldrs[light_nr].add(this.model.lights[light_nr], "z").step(0.5)
        this.gui_edit_light_fldrs[light_nr].gui_color = this.gui_edit_light_fldrs[light_nr].addColor(this.model.lights[light_nr], "color")
        this.gui_edit_light_fldrs[light_nr].open();
    }

    clear_model() {
        this.model.clear_model()
    }

    load_default_model() {
        this.clear_model()

        //constructor (color1_arg, color2_arg, reflective_arg, checker_arg=false, ambient_factor = 0.0, phong = false, phong_size = 25) {
   
        //rode bal
        let vec = new THREE.Vector3(-2, 4, 1.5);
        let r = 1.5
        let color = "#ff0000"
        let refl = false
        let texture = new Texture(color, color,  refl, 0.5, true, 5)
        this.model.addSphere(vec, r, texture)
        
        // groene bal
        vec = new THREE.Vector3(3.6, 2.8, 0.5);
        r = 0.5 
        color = "#00ff00"
        refl = false
        texture = new Texture(color, color,  refl)
        this.model.addSphere(vec, r, texture)
        
        // blauwe bal
        vec = new THREE.Vector3(1.3, 4.7, 1);
        r = 1 
        color = "#0000ff"
        refl = false
        texture = new Texture(color, color,  refl, 0.0, true, 80)
        this.model.addSphere(vec, r,texture)
        
        //spiegel bal 
        vec = new THREE.Vector3(4.8, 0, 2);
        r = 2 
        color = "#000000"
        refl = true
        texture = new Texture(color, color,  refl)
        this.model.addSphere(vec, r, texture)
        
        //checker bal 
        vec = new THREE.Vector3(-1, -1.4, 4);
        r = 4 
        color = "#ff0000"
        let color2 = "#00ff00"
        refl = false
        texture = new Texture(color, color2,  refl )
        texture.checker = true
        this.model.addSphere(vec, r, texture)

        //marble bal 
        vec = new THREE.Vector3(-1, -10.4, 4);
        r = 4 
        color = "#000000"
        color2 = "#ffffff"
        refl = false
        texture = new Texture(color, color2,  refl)
        texture.marble = true
        this.model.addSphere(vec, r, texture)

        //  onder vlak 
        vec = new THREE.Vector3(0, 0, 1);
        r = 0 
        color = "#ffffff"
        color2 = "#333333"
        refl = false
        texture = new Texture(color, color2,  refl)
        texture.checker = true
        this.model.addPlane(vec, r, texture)

        // spiegel achter
        vec = new THREE.Vector3(1, 0.1, 0);
        r = -8
        color = "#000000"
        refl = true
        texture = new Texture(color, color,  refl)
        this.model.addPlane(vec, r, texture)

        //lucht
        vec = new THREE.Vector3(0, 0, -1);
        r = -10000 
        color = "#2266ff"
        refl = false
        texture = new Texture(color, color, refl, 1.0)
        this.model.addPlane(vec, r, texture)
                
        this.new_light.x_gui.setValue(20)
        this.new_light.y_gui.setValue(0)
        this.new_light.z_gui.setValue(20)
        this.new_light.color = "#ffff00"
        this.new_light.c_gui.setValue(this.new_light.color )
        this.addNewLight()

        this.new_light.x_gui.setValue(0)
        this.new_light.y_gui.setValue(20)
        this.new_light.z_gui.setValue(40)
        this.new_light.color = "#0000ff"
        this.new_light.c_gui.setValue(this.new_light.color )
        this.addNewLight()

    }

    resize() {
        console.log("resise")
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
        let rect = this.canvas_gl.getBoundingClientRect();
        let x_pos = e.clientX - rect.left
        let y_pos = e.clientY - rect.top
        console.log("click "+ x_pos +" "+  y_pos)
        
            // some raycasting to deterimine the active tile.
            this.mouse_position.x = ( x_pos / this.canvas_gl.width ) * 2 - 1;
            this.mouse_position.y = - ( y_pos / this.canvas_gl.height ) * 2 + 1;
            this.raycaster.setFromCamera( this.mouse_position, this.camera.THREEcamera);
            let intersects = this.raycaster.intersectObjects( this.three_scene.children );
    
            let object_ids =  intersects.map(x => x.object.name);
            for (let object_id of object_ids) {
                console.log("id "+ object_id )
            }

            if (object_ids.length > 0) {
                let sel_primitive = this.model.getPrimitive(object_ids[0])
                console.log("selected object : " + object_ids[0] + " type: " + sel_primitive.type)

                this.gui_edit.removeFolder(this.gui_primitive_edit_fldr)
                this.gui_primitive_edit_fldr = this.gui_edit.addFolder(sel_primitive.type)

                if (sel_primitive.type == "sphere") {
                    this.gui_primitive_edit_fldr.add(sel_primitive, "x").step(0.1)
                    this.gui_primitive_edit_fldr.add(sel_primitive, "y").step(0.1)
                    this.gui_primitive_edit_fldr.add(sel_primitive, "z").step(0.1)
                    this.gui_primitive_edit_fldr.add(sel_primitive, "radius", 0.1).step(0.1)
            
                } else if (sel_primitive.type == "plane") {
                    this.gui_primitive_edit_fldr.add(sel_primitive, "normal_x").step(0.1)
                    this.gui_primitive_edit_fldr.add(sel_primitive, "normal_y").step(0.1)
                    this.gui_primitive_edit_fldr.add(sel_primitive, "normal_z").step(0.1)
                    this.gui_primitive_edit_fldr.add(sel_primitive, "distance_to_origin" ).step(0.1)
                    //todo
                }

                this.gui_edit.removeFolder(this.gui_texture_edit_fldr)
                this.gui_texture_edit_fldr = this.gui_edit.addFolder("texture")
                this.gui_texture_edit_fldr.addColor(sel_primitive.texture, "color1H")
                this.gui_texture_edit_fldr.addColor(sel_primitive.texture, "color2H")
                this.gui_texture_edit_fldr.addColor(sel_primitive.texture, "ambientColorH")
                this.gui_texture_edit_fldr.add(sel_primitive.texture, "reflective")
                this.gui_texture_edit_fldr.add(sel_primitive.texture, "checker")
                this.gui_texture_edit_fldr.add(sel_primitive.texture, "phong")
                this.gui_texture_edit_fldr.add(sel_primitive.texture, "phong_size")

                this.gui_texture_edit_fldr.open()
                this.gui_primitive_edit_fldr.open()
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
