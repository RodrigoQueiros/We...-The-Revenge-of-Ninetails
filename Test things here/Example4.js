var renderer, scene, camera;

var cube, spherePivot, sphere;

var movement = -1; //static objects

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
    var material = new THREE.MeshNormalMaterial({ wireframe: false });

    var geometry = new THREE.CubeGeometry(5, 1, 1, 10, 10, 10);

    cube = new THREE.Mesh(geometry, material);
    cube.position.set(2.5, 0, 0)
    // Tilt the mesh toward the viewer



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
    spherePivot.position.set(5.1, 0, 0);

    var axes = new THREE.AxesHelper(3);
    spherePivot.add(axes);

    // Create the sphere mesh (with axis)
    geometry = new THREE.CubeGeometry(5, 1, 1);
    cube1 = new THREE.Mesh(geometry, material);
    cube1.position.set(2.5, 0, 0);




    // Add the sphere mesh TO THE SPHERE GROUP
    spherePivot.add(cube1);

    // Add key handling
    document.onkeydown = handleKeyDown;

    // Run the run loop
    animate();
}

function handleKeyDown(event) {
    var char = String.fromCharCode(event.keyCode);
    switch (char) {
        case "1":
            if(thePivot.rotation.z<Math.PI/2)
            thePivot.rotation.z += 0.02;

            break;
        case "2":
            if(thePivot.rotation.z>-Math.PI/2)
            thePivot.rotation.z -= 0.02;
            break;
        case "3":
            if(spherePivot.rotation.z<10*Math.PI/13)
            spherePivot.rotation.z += 0.02;
            break;

        case "4":
        if(spherePivot.rotation.z>0)
        spherePivot.rotation.z -= 0.02;
        break;
            break;
        default:
            movement = -1;
            break;
    }
}
//thePivot ->cube ->spherePivot --> cube1

function animate() {
    /*switch (movement) {
        
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
            spherePivot.y = 0;
            break;

    }*/

    // animate using requestAnimationFrame
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}