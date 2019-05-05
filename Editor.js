
class Editor {

    constructor(name) {

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


        this.cameras = [] // (pos, up, look_at, view, back_color)
        var pos, up, look_at, view, back_color;

        pos        = new THREE.Vector3(12, 0.5, 0.5);
        up         = new THREE.Vector3(0, 0, 1)
        look_at    = new THREE.Vector3(0, 0.5, 0.5)
        view       = new THREE.Vector2(0, 0)
        back_color = 0x220000
        this.cameras.push( new Camera(true,pos, up, look_at, view, back_color))

        pos        = new THREE.Vector3(0.5, 12, 0.5);
        up         = new THREE.Vector3(0,   0, 1)
        look_at    = new THREE.Vector3(0.5, 0, 0.5)
        view       = new THREE.Vector2(0.5, 0)
        back_color = 0x002200
        this.cameras.push( new Camera(true,pos, up, look_at, view, back_color))

        pos        = new THREE.Vector3(0.5, 0.5, 12);
        up         = new THREE.Vector3(1,   0,   0)
        look_at    = new THREE.Vector3(0.5, 0.5, 0)
        view       = new THREE.Vector2(0,   0.5)
        back_color = 0x000022
        this.cameras.push( new Camera(true,pos, up, look_at, view, back_color))

        pos        = new THREE.Vector3(7.5, 7.5, 8.5);
        up         = new THREE.Vector3(0,   0,   1)
        look_at    = new THREE.Vector3(0,   0,   0.2)
        view       = new THREE.Vector2(0.5, 0.5)
        back_color = 0x000000
        this.cameras.push( new Camera(false,pos, up, look_at, view, back_color))
                          
        //let helper = new THREE.CameraHelper(this.cameras[0].THREEcamera);
        //this.three_scene.add(helper);

        this.raycaster = new THREE.Raycaster(); 

        // model
        this.model = new Model(this.three_scene);
        this.model.addBlock(1, 1, 1, 0x009955 )

        // coor.sys
        this.axis = new Axis(this.three_scene)

        this.renderer = new THREE.WebGLRenderer({antialias: true, depth: true});
        this.renderer.setSize( window.innerHeight, window.innerHeight );
        document.body.appendChild(this.renderer.domElement);

        //lights
        this.lights = [];
        this.lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
        
        this.lights[ 0 ].position.set( 0, 0, 3 );
        
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
        var gui_block_list = this.gui.addFolder('blocks')
        var gui_new_block  = this.gui.addFolder('New Block')
        this.new_block = new Set()
        this.new_block.x = 0
        this.new_block.y = 0
        this.new_block.z = 0
        this.new_block.color = "#ffffff"
        gui_new_block.add(this.new_block, "x", 0, 9).step(1)
        gui_new_block.add(this.new_block, "y", 0, 9).step(1)
        gui_new_block.add(this.new_block, "z", 0, 9).step(1)
        gui_new_block.addColor(this.new_block, "color")
        gui_new_block.add(this, "addNewBlock")

        gui_new_block.open();

        
        this.isDown = false;
        this.isDrag = false;
        this.mouse_down_position = {}
        this.mouse_position = new THREE.Vector2();
        this.last_update_time = null;



    }

    addNewBlock() {
        this.model.addBlock(this.new_block.x, this.new_block.y, this.new_block.z, this.new_block.color)
    }

    resize() {
        console.log("resise")
        this.renderer.setSize(window.innerHeight, window.innerHeight);

    }

    animLoop(cur_time_ms) {
        var me = this; // https://stackoverflow.com/questions/4586490/how-to-reference-a-function-from-javascript-class-method
        
        this.stats.begin();

        //update
        if(this.last_update_time_ms != null) {
            var d_time_ms = cur_time_ms - this.last_update_time_ms

            for (var camera of this.cameras)
                camera.update(d_time_ms);

            this.model.update(d_time_ms)    

            this.lights[0].position.y = 3 * Math.cos(cur_time_ms/1000)
            this.lights[0].position.z = 3 * Math.sin(cur_time_ms/1000)
        }
        this.last_update_time_ms = cur_time_ms;

        // draw
        window.requestAnimationFrame(function (cur_time) { me.animLoop(cur_time); });
        this.render();

        this.stats.end();

    }

    render() {

        for (var camera of this.cameras) {

            camera.setViewPort(this.renderer);
            
            this.renderer.render(this.three_scene, camera.THREEcamera)
        }
    
    }

    _raycastMouseToTile(e){
        // some raycasting to deterimine the active tile.
       	this.mouse_position.x = ( e.clientX / window.innerWidth ) * 2 - 1;
	    this.mouse_position.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
        this.raycaster.setFromCamera( this.mouse_position, this.camera.THREEcamera);
        var intersects = this.raycaster.intersectObjects( this.three_scene.children );

        return intersects.map(x => x.object.name);
    }

    onmousemove(e) {
        if (this.isDown) {
            // strange behavior: also when clicked, a move is ALSO fired : http://jsfiddle.net/rolandinoman/1py346ek/
            //   to prevent drag being true at single click
            if ((e.movementX != 0) || (e.movementY != 0)) {
                this.isDrag = true;
                this.camera.moveCamera(-e.movementX, -e.movementY)
            }
        }
    };

    onmousedown(e) {
        this.isDrag = false;
        this.isDown = true;

    }

    onmouseup(e) {
	    this.isDown = false;

        if (!this.isDrag) {
            var game_object_ids = this._raycastMouseToTile(e);
            if (!e.ctrlKey) {
                console.log("clck")
                for (let game_object_id of game_object_ids) {
                    if (game_object_id != all_game_objects.selector.id) {
                        var new_select_obj = all_game_objects.get_game_object_by_id(game_object_id);
                        if (true)
                        {
                            // remove old selected object
                            var org_select_obj = all_game_objects.selector.selected_object
                            if (org_select_obj != undefined) {
                                org_select_obj.removeGUI(this.gui)
                            }

                            // set new selected object
                            all_game_objects.selector.selected_object = new_select_obj;
                            new_select_obj.addGUI(this.gui)

                            break;
                        }
                    }
                }
            } else {
                var selected_animal = all_game_objects.selector.get_selected_object();
                if (selected_animal != null) {
                    var game_object = all_game_objects.get_game_object_by_id(game_object_ids[0]);
                    selected_animal.set_animal_path_goal(this.tiles, game_object.tile_index);
                }
            }
        }
    };


    keyDown(e){
    }

    keyUp(e){
    }

    wheel(e){
        this.camera.zoom(e.deltaY / 100);
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
