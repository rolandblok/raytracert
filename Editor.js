
class Editor {

    constructor(name) {

        this.canvas_raytracer = document.getElementById("canvas_raytrace");
        this.ctx_raytracer = this.canvas_raytracer.getContext("2d");

        this.name = name;
        this.canvas = document.getElementById("canvas");
        this.canvas.addEventListener("mousedown", this, false);
        this.canvas.addEventListener("mouseup", this, false);
        this.canvas.addEventListener("mousemove", this, false);
        this.canvas.addEventListener("click", this, false);
        this.canvas.addEventListener("dblclick", this, false);
        this.canvas.addEventListener("resize", this, false);
        window.addEventListener('resize', function bla(event){this.resize()})
        this.canvas.addEventListener('keydown', this, false);
        this.canvas.addEventListener('keyup', this, false);
        this.canvas.addEventListener('wheel', this, false);
        //this.ctx = canvas.getContext("2d");

        // THREE / GL
        this.three_scene = new THREE.Scene();


        var pos, up, look_at, back_color;
        pos        = new THREE.Vector3(20, 20, 20);
        up         = new THREE.Vector3(0,   0,   1)
        look_at    = new THREE.Vector3(0,   0,   2)
        back_color = 0x000000
        this.camera = new Camera(false,pos, up, look_at, back_color)
                          
        // model
        this.model = new Model(this.three_scene);
        //this.model.addBlock(1, 1, 1, 0x009955 )

        // coor.sys
        this.axis = new Axis(this.three_scene)

        this.renderer = new THREE.WebGLRenderer({antialias: true, depth: true});
        this.renderer.setSize( window.innerHeight/2, window.innerHeight/2 );
        document.body.appendChild(this.renderer.domElement);

        //lights
        this.lights = [];
        this.lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
        
        this.lights[ 0 ].position.set( 10, 0, 10 );
        
        this.three_scene.add( this.lights[ 0 ] );
        
        this.lighthelper = new THREE.PointLightHelper(this.lights[0])
        this.three_scene.add(this.lighthelper)
        

        
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

        var gui_primitve_list = this.gui.addFolder('blocks')
        var gui_new_primitive  = this.gui.addFolder('New primitive')
        this.new_primitive = new Set()
        this.new_primitive.type = 'sphere'
        this.new_primitive.x = 0
        this.new_primitive.y = 0
        this.new_primitive.z = 0
        this.new_primitive.color = "#ffffff"
        gui_new_primitive.add(this.new_primitive, "type", ['sphere', 'block'])
        gui_new_primitive.add(this.new_primitive, "x", 0, 9).step(1)
        gui_new_primitive.add(this.new_primitive, "y", 0, 9).step(1)
        gui_new_primitive.add(this.new_primitive, "z", 0, 9).step(1)
        gui_new_primitive.addColor(this.new_primitive, "color")
        gui_new_primitive.add(this, "addNewPrimitive")

        gui_new_primitive.open();

        
        this.isDown = false;
        this.isDrag = false;
        this.mouse_down_position = {}
        this.mouse_position = new THREE.Vector2();
        this.last_update_time = null;



    }

    addNewPrimitive() {
        if (this.new_primitive.type == 'sphere') {
            var pos = new THREE.Vector3(this.new_primitive.x, this.new_primitive.y, this.new_primitive.z);
            this.model.addSphere(pos, this.new_primitive.color)
        } else if (this.new_primitive.type == 'block') {
           this.model.addBlock(this.new_primitive.x, this.new_primitive.y, this.new_primitive.z, this.new_primitive.color)
        }
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
        this.camera.raytrace(this.ray_trace_setting.width, this.ray_trace_setting.height, this.ctx_raytracer)
    }

    _raycastMouseToTile(e){
    }

    onmousemove(e) {
    };

    onmousedown(e) {
    }

    onmouseup(e) {
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
