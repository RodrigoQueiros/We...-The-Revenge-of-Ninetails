var renderer, scene, camera;

var cube, spherePivot, sphere;

var movement = -1; //static objects

var comets = []

function init() {
    var canvas = document.getElementById("webglcanvas");

    /*********************
     * RENDERER 
     * *******************/
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setSize(canvas.width, canvas.height);
    // configure renderer clear color
    renderer.setClearColor("#000000");

    /*********************
     * SCENE 
     * *******************/
    // create an empty scene, that will hold all our elements such as objects, cameras and lights
    scene = new THREE.Scene();

    /*********************
     * CAMERA 
     * *******************/
    // create a camera, which defines where we're looking at
    camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 1, 4000);
    camera.position.set(2, 2, 15);
    scene.add(camera);



    var light = new THREE.PointLight(0xff7f24, 6, 1000);
    light.position.set(50, 0, 500);
    light.castShadow = true;            // default false
    light.shadow.mapSize.width = 1024;  // default 512
    light.shadow.mapSize.height = 1024; // default 512
    light.shadow.camera.near = 2;       // default 0.5
    light.shadow.camera.far = 1500;
    scene.add(light);

    var light2 = new THREE.PointLight(0x6495ed, 6, 1000);
    light2.position.set(-50, -100, 0);
    light2.castShadow = true;            // default false
    light2.shadow.mapSize.width = 1024;  // default 512
    light2.shadow.mapSize.height = 1024; // default 512
    light2.shadow.camera.near = 2;       // default 0.5
    light2.shadow.camera.far = 1500;
    scene.add(light2); var light2 = new THREE.PointLight(0x6495ed, 6, 1000);
    light2.position.set(-250, -100, 0);
    light2.castShadow = true;            // default false
    light2.shadow.mapSize.width = 1024;  // default 512
    light2.shadow.mapSize.height = 1024; // default 512
    light2.shadow.camera.near = 2;       // default 0.5
    light2.shadow.camera.far = 1500;
    scene.add(light2);


    /*************************
     * AXES HELPER
     *************************/
    // show SCENE axes
    var axes = new THREE.AxesHelper(10);
    scene.add(axes);


    /*****************************
     * CUBE 
     * ***************************/
    // Create the cube mesh (with axis)
    var material = new THREE.MeshPhongMaterial({ wireframe: false, color: 0xffff00 });
    var geometry = new THREE.CubeGeometry(2, 2, 2, 10, 10, 10);
    cube = new THREE.Mesh(geometry, material);
    // Tilt the mesh toward the viewer
    cube.rotation.x = Math.PI / 5;
    cube.rotation.y = Math.PI / 5;


    // Create a group for the sphere and cone objects
    thePivot = new THREE.Object3D;
    // Add it TO THE CUBE
    scene.add(thePivot);
    // Move the sphere diagonally FROM THE CUBE
    thePivot.position.set(0, 0, 0);



    // Add the cube mesh TO THE SCENE
    thePivot.add(cube);

    // Create a group for the sphere and cone objects
    spherePivot = new THREE.Object3D;
    // Add it TO THE CUBE
    thePivot.add(spherePivot);
    // Move the sphere diagonally FROM THE CUBE
    spherePivot.position.set(3, 3, 0);

    var axes = new THREE.AxesHelper(3);
    spherePivot.add(axes);

    // Create the sphere mesh (with axis)

    
    

    //Astroid  

    material = new THREE.MeshPhongMaterial({ color: 0xffff00, wireframe: false }); // wireframe: true, 

    geometry = new THREE.DodecahedronGeometry(1);




    var color = '#111111';
    color = ColorLuminance(color, 2 + Math.random() * 10);
    console.log(color);
    texture = new THREE.MeshStandardMaterial({
        color: color,
        shading: THREE.FlatShading,
        //   shininess: 0.5,
        roughness: 0.8,
        metalness: 1
    });

    
    sphere = new THREE.Mesh(geometry, texture);
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    sphere.position.set(3, 3, 0);
    var verts = sphere.geometry.vertices;
    for (var i = 0; i < verts.length; i++) {
        var v = verts[i];
        sphere.geometry.vertices[i].x += (0 - Math.random() * (5 / 4));
        v.y += (0 - Math.random() * (5 / 4));
        v.z += (0 - Math.random() * (5 / 4));
    };


    // Create the sphere mesh (with axis)
    geometry = new THREE.ConeGeometry(1, 1, 10);
    cone = new THREE.Mesh(geometry, material);
    cone.position.set(3, -3, 0);


    // Add the sphere mesh TO THE SPHERE GROUP
    spherePivot.add(sphere, cone);

    // Add key handling
    document.onkeydown = handleKeyDown;

    // Run the run loop
    animate();
}

function handleKeyDown(event) {
    var char = String.fromCharCode(event.keyCode);
    switch (char) {
        case "1":
        case "2":
        case "3":
        case "4":
            movement = parseInt(char);
            break;
        default:
            movement = -1;
            break;
    }
}

function animate() {

    moveComet()


    switch (movement) {
        case 1:
            // Rotate cube group its Y axis
            cube.rotation.y += 0.02;
            break;
        case 2:
            // Rotate the sphere about its Y axis
            sphere.rotation.y += 0.02;
            break;
        case 3:
            // Rotate the sphere pivot about its Y axis 
            spherePivot.rotation.y += 0.02;
            break;
        case 4:
            thePivot.rotation.y += 0.02;
            break;
        default:
            // Reset 
            cube.rotation.y = 0;
            sphere.rotation.y = 0;
            spherePivot.y = 0;
            break;

    }

    // animate using requestAnimationFrame
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

function moveComet() {
    // var verts = sphere.geometry.vertices;

    // for (var i = 0; i < verts.length; i++) {
    //     var v = verts[i];       // get CURRENT vertices
    //     var vprops = comets[i];  // get INITIAL vertices and movement definitions
    //     v.x = vprops.x + Math.cos(vprops.ang) * vprops.amp;
    //     v.y = vprops.y + Math.sin(vprops.ang) * vprops.amp;
    //     vprops.ang = vprops.speed; // update angle for next frame
    // }
    // // necessary to update this flag if the geometry has been previously rendered
    // sphere.geometry.verticesNeedUpdate = true;
}

function ColorLuminance(hex, lum) {

    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;

    // convert to decimal and change luminosity
    var rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
    }

    return rgb;
}


//Refs

//https://codepen.io/Divyz/pen/VPrZMy?editors=1010
