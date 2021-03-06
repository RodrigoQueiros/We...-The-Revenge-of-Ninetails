var controls;
var camera;

// once everything is loaded, we run our Three.js stuff
window.onload = function init() {

    // create an empty scene, that will hold all our elements such as objects, cameras and lights
    var scene = new THREE.Scene();
    // show axes in the screen
    var axes = new THREE.AxesHelper(20);
    scene.add(axes);

    // create a camera, which defines where we're looking at
    var aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    // position and point the camera to the center of the scene
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 25;
    camera.lookAt(scene.position); //point the camera to the center of the scene (default)

    controls = new THREE.OrbitControls(camera);
    controls.addEventListener('change', function () { renderer.render(scene, camera); });

    // create a render and set the size
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // configure renderer clear color
    renderer.setClearColor("#000000");

    // add the output of the renderer to an HTML element (this case, the body)
    document.body.appendChild(renderer.domElement);



    // creates a fence
    var fence1 = new THREE.Object3D();
    var houseGeometry = createHouse(1, 10, 0.1);    // creates picket geometry
    var houseMaterial = new THREE.MeshBasicMaterial({ color: 'brown' });
    var picketMesh = new THREE.Mesh(houseGeometry, houseMaterial); // creates picket mesh

    var numPickets = 20;
    for (var i = 0; i < numPickets; ++i) {
        picketMesh = picketMesh.clone();
        picketMesh.translateX(1.2);   // this will *accumulate* the translations
        fence1.add(picketMesh);
    }
    scene.add(fence1);
    console.log(fence1.matrix)
    console.log(picketMesh.matrix)
    console.log(picketMesh.matrixWorld)


    // creates a 2nd fence
    var fence2 = new THREE.Object3D();
    picketMesh = new THREE.Mesh(houseGeometry, houseMaterial); // creates picket mesh (resets transformations)
    fence2.translateX(-10);
    var turn = (2 * Math.PI) / numPickets;
    for (var i = 0; i < numPickets / 2; ++i) {
        picketMesh = picketMesh.clone();
        picketMesh.translateX(1.2);   // this will *accumulate* the translations
        picketMesh.rotateY(turn);        // this will *accumulate* the rotations
        fence2.add(picketMesh);
    }
    scene.add(fence2);

    console.log("Fence 2 - local matrix", fence2.matrix)
    console.log("Last picket - local matrix", picketMesh.matrix)
    console.log("Last picket - global matrix", picketMesh.matrixWorld)


    // render
    renderer.render(scene, camera);
}


function createHouse(width, height, length) {
    var w = width, h = height, len = length;
    var houseGeometry = new THREE.Geometry();
    // add the front
    houseGeometry.vertices.push(new THREE.Vector3(0, 0, 0)); // vertex 0
    houseGeometry.vertices.push(new THREE.Vector3(w, 0, 0)); // vertex 1
    houseGeometry.vertices.push(new THREE.Vector3(w, h, 0)); // vertex 2
    houseGeometry.vertices.push(new THREE.Vector3(0, h, 0)); // vertex 3
    houseGeometry.vertices.push(new THREE.Vector3(0.5 * w, h + 0.5 * w, 0)); // vertex 4

    // just add the back also manually
    houseGeometry.vertices.push(new THREE.Vector3(0, 0, -len)); // vertex 5
    houseGeometry.vertices.push(new THREE.Vector3(w, 0, -len)); // vertex 6
    houseGeometry.vertices.push(new THREE.Vector3(w, h, -len)); // vertex 7
    houseGeometry.vertices.push(new THREE.Vector3(0, h, -len)); // vertex 8
    houseGeometry.vertices.push(new THREE.Vector3(0.5 * w, h + 0.5 * w, -len)); // vertex 9

    // now that we've got the vertices we need to define the faces
    // front faces
    houseGeometry.faces.push(new THREE.Face3(0, 1, 2)); // 0
    houseGeometry.faces.push(new THREE.Face3(0, 2, 3));
    houseGeometry.faces.push(new THREE.Face3(3, 2, 4));

    // back faces
    houseGeometry.faces.push(new THREE.Face3(5, 7, 6)); // 3
    houseGeometry.faces.push(new THREE.Face3(5, 8, 7));
    houseGeometry.faces.push(new THREE.Face3(7, 8, 9));

    // roof faces
    houseGeometry.faces.push(new THREE.Face3(3, 4, 8)); // 6
    houseGeometry.faces.push(new THREE.Face3(4, 9, 8));
    houseGeometry.faces.push(new THREE.Face3(2, 7, 9)); // 8
    houseGeometry.faces.push(new THREE.Face3(4, 2, 9));

    // side faces
    houseGeometry.faces.push(new THREE.Face3(6, 2, 1)); // 10
    houseGeometry.faces.push(new THREE.Face3(7, 2, 6));
    houseGeometry.faces.push(new THREE.Face3(0, 3, 5)); // 12
    houseGeometry.faces.push(new THREE.Face3(3, 8, 5));

    // floor faces
    houseGeometry.faces.push(new THREE.Face3(0, 5, 1)); // 14
    houseGeometry.faces.push(new THREE.Face3(5, 6, 1));

    // calculate the normals for shading
    houseGeometry.computeFaceNormals();

    return houseGeometry;
}



