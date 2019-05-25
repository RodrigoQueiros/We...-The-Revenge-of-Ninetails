var controls, scene, renderer, camera, ship, plane;

var comets = []
var countFrames = 0

//Sound
//var mainTheme = "mainTheme"


window.onload = function init() {

  var canvas = document.getElementById("webglcanvas");
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
  renderer.setSize(canvas.width, canvas.height);



  //createjs.Sound.registerSound("Stuff/Hollow Knight- Sealed Vessel Theme EXTENDED.mp3", mainTheme);
  //createjs.Sound.play(mainTheme); 





  //CAMERA
  camera = new THREE.PerspectiveCamera(50, canvas.width / canvas.height, 1, 4000);
  camera.position.set(0, 0, 10);
  //camera.rotation.z = 90 * Math.PI / 180  
  scene.add(camera);

  //AXIS
  var axes = new THREE.AxesHelper(10);
  scene.add(axes);

  //Clear and functions
  renderer.setClearColor("#000000");
  //createSomething() //Lines to help view the prespective
  createLights()
  createSpaceShip()
  createBackground()
  createUI()


  controls = new THREE.OrbitControls(camera);
  controls.addEventListener('change', function () { renderer.render(scene, camera); });

  // controls = new THREE.OrbitControls(camera);
  // controls.addEventListener('change', function () { renderer.render(scene, camera); });


  // add the output of the renderer to an HTML element (this case, the body)
  document.body.appendChild(renderer.domElement);

  // RENDER THE SCENE
  renderer.render(scene, camera);

  document.onkeydown = handleKeyDown;
  document.onkeyup = handleKeyUp;


  animate()

}

function createUI() {
  /*
  y = Math.sin(counter) / 2 + 0.5
  counter += increase
  
  ring = new (THREE.RingGeometry)(4, 5, 10, 8, 0, Math.PI * y)
  mesh.geometry.vertices = ring.vertices
  mesh.geometry.verticesNeedUpdate = true
  mesh.material.color.setRGB 1.6 - y, y
  mesh.rotation.z = (180 - (180 * y)) * (Math.PI / 180)*/

  //HealthBar
  var geometry = new THREE.PlaneGeometry(10, 1);
  var material = new THREE.MeshBasicMaterial({ color: 0x262626, side: THREE.DoubleSide });
  var healthBarBorder = new THREE.Mesh(geometry, material);
  healthBarBorder.position.set(-9,12.5,-20)
  scene.add(healthBarBorder);

  var geometry = new THREE.PlaneGeometry(9.6, 0.6);
  var material = new THREE.MeshBasicMaterial({ color: 0x595959, side: THREE.DoubleSide });
  var healthBarBorderBack = new THREE.Mesh(geometry, material);
  healthBarBorderBack.position.set(-9,12.5,-20)
  scene.add(healthBarBorderBack);

  var geometry = new THREE.PlaneGeometry(9, 0.6);
  var material = new THREE.MeshBasicMaterial({ color: 0xC9000A, side: THREE.DoubleSide });
  var healthBar = new THREE.Mesh(geometry, material);
  healthBar.position.set(-9,12.5,-20) //To move the bar you need to change position in half of the value of the size reduzed,X
  scene.add(healthBar);

  //Ultimate
  var geometry = new THREE.RingGeometry(0.8, 2.2, 32, 8, 0, Math.PI * 2);
  var material = new THREE.MeshBasicMaterial({ color: 0x262626, side: THREE.DoubleSide });

  UltimateBarBorder = new THREE.Mesh(geometry, material)
  UltimateBarBorder.position.set(-16, 11, -20)
  scene.add(UltimateBarBorder)

  var geometry = new THREE.RingGeometry(1, 2, 32, 8, 0, Math.PI * 2);
  var material = new THREE.MeshBasicMaterial({ color: 0x595959, side: THREE.DoubleSide });

  UltimateBarBorderBack = new THREE.Mesh(geometry, material)
  UltimateBarBorderBack.position.set(-16, 11, -20)
  scene.add(UltimateBarBorderBack)


  var geometry = new THREE.RingGeometry(1, 2, 32, 8, Math.PI / 2, -Math.PI); //Change last angle in negative, if 100% green #00F03D 
  var material = new THREE.MeshBasicMaterial({ color: 0xFECF41, side: THREE.DoubleSide });

  UltimateBar = new THREE.Mesh(geometry, material)
  UltimateBar.position.set(-16, 11, -20)
  scene.add(UltimateBar)

  


}

function createBackground() {

  var geometry = new THREE.PlaneGeometry(300, 300);
  var material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
  var texture = new THREE.TextureLoader().load("./Stuff/10.png");
  material.map = texture;
  plane = new THREE.Mesh(geometry, material);
  plane.position.z = -200
  scene.add(plane);
}

function createSpaceShip() {

  // var mtlLoader = new THREE.MTLLoader();
  // mtlLoader.load('./Stuff/Ninetails_NaveRodrigo.mtl', function (materials) {
  //   materials.preload(); // load a material’s resource

  var objLoader = new THREE.OBJLoader();
  // objLoader.setMaterials(materials);

  objLoader.load('./Stuff/Ninetails_NaveRodrigo1.obj', function (object) {// load a geometry resource
    ship = object;
    ship.position.y = 0;

    //Go through all children of the loaded object
    ship.traverse(function (child) {
      //search for a Mesh
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshNormalMaterial({ color: 0xF5E4BB });
        child.scale.set(0.5, 0.5, 0.5)
        child.material.side = THREE.DoubleSide
      }
    });

    ship.rotateY(Math.PI)
    ship.scale.set(0.1, 0.1, 0.1)
    ship.position.y = 0
    ship.position.z = 0
    ship.rotation.x = Math.PI
    ship.rotation.z = Math.PI
    ship.rotation.y = 0

    scene.add(ship);
    //
    //Ship 


  });
  // });





}

function createRocks() {

  countFrames++

  while (countFrames > 360) {
    countFrames = 0
    var x, y, z
    for (let i = 0; i < 10; i++) {
      x = (Math.random() * 12) - 6
      y = (Math.random() * 8) - 4
      z = -200


      material = new THREE.MeshPhongMaterial({ color: 0xffff00, wireframe: false }); // wireframe: true, 
      geometry = new THREE.DodecahedronGeometry(5, 1);
      var color = '#111111';
      color = ColorLuminance(color, 2 + Math.random() * 10);

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
      sphere.position.set(x, y, z);

      rand = (Math.random() * 0.2) + 0.1
      sphere.scale.set(rand, rand, rand)
      var verts = sphere.geometry.vertices;
      for (var q = 0; q < verts.length; q++) {
        var v = verts[q];
        sphere.geometry.vertices[q].x += (0 - Math.random() * (5 / 4));
        v.y += (0 - Math.random() * (5 / 4));
        v.z += (0 - Math.random() * (5 / 4));
      };

      scene.add(sphere)

      x1 = (Math.random() * 0.02) - 0.01
      y1 = (Math.random() * 0.02) - 0.01
      z1 = (Math.random() * 0.02) - 0.01
      comets.push({ obj: sphere, r: [x1, y1, z1] })
    }

  }

}


function createSomething() {

  var material = new THREE.LineBasicMaterial({
    color: 0xff0000
  });

  var geometry = new THREE.Geometry();
  geometry.vertices.push(
    //Quadrado frente
    new THREE.Vector3(-6, -4, 0),
    new THREE.Vector3(-6, 4, 0),
    new THREE.Vector3(6, 4, 0),
    new THREE.Vector3(6, -4, 0),
    new THREE.Vector3(-6, -4, 0),

    //Quadrado traS
    new THREE.Vector3(-6, -4, -20),
    new THREE.Vector3(-6, 4, -20),
    new THREE.Vector3(6, 4, -20),
    new THREE.Vector3(6, -4, -20),
    new THREE.Vector3(-6, -4, -20),

    //Quadrado traS2
    new THREE.Vector3(-6, -4, -40),
    new THREE.Vector3(-6, 4, -40),
    new THREE.Vector3(6, 4, -40),
    new THREE.Vector3(6, -4, -40),
    new THREE.Vector3(-6, -4, -40),
  );

  var line = new THREE.Line(geometry, material);
  scene.add(line);


  /*
  var THREE = require('three'),
    ObjLoader = require('./objloader')

  var loader = new ObjLoader()
  var rockMtl = new THREE.MeshLambertMaterial({
    map: THREE.ImageUtils.loadTexture('models/lunarrock_s.png')
  })

  var Asteroid = function (rockType) {
    var mesh = new THREE.Object3D(), self = this
    this.loaded = false

    // Speed of motion and rotation
    mesh.velocity = Math.random() * 2 + 2
    mesh.vRotation = new THREE.Vector3(Math.random(), Math.random(), Math.random())

    loader.load('models/rock' + rockType + '.obj', function (obj) {
      obj.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.material = rockMtl
        }
      })

      obj.scale.set(10, 10, 10)

      mesh.add(obj)
      mesh.position.set(-50 + Math.random() * 100, -50 + Math.random() * 100, -1500 - Math.random() * 1500)
      self.loaded = true
    })

    this.update = function (z) {
      mesh.position.z += mesh.velocity
      mesh.rotation.x += mesh.vRotation.x * 0.02;
      mesh.rotation.y += mesh.vRotation.y * 0.02;
      mesh.rotation.z += mesh.vRotation.z * 0.02;

      if (mesh.position.z > z) {
        mesh.velocity = Math.random() * 2 + 2
        mesh.position.set(
          -50 + Math.random() * 100,
          -50 + Math.random() * 100,
          z - 1500 - Math.random() * 1500
        )
      }
    }

    this.getMesh = function () {
      return mesh
    }

    return this
  }

  module.exports = Asteroid

  */





}

function createLights() {

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

}

//Vars for move ship
var up = false, left = false, rigth = false, down = false
var upCount = 0, downCount = 0, leftCount = 0, rigthCount = 0 //Count is need to prevent error in first case

function animate() {



  plane.rotation.z += 0.001

  createRocks()
  moveShip()
  moveComets()
  /*
  if(ship){
    camera.lookAt(ship.position)
  }*/








  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}


function moveComets() {

  comets.forEach((comet, i) => {

    //Move
    comet.obj.position.z += 0.1
    if (comet.obj.position.z > 10) {
      scene.remove(comets[i].obj)

      comets.splice(i, 1)
    }

    //Random rotate

    comet.obj.rotation.x += comet.r[0]
    comet.obj.rotation.y += comet.r[1]
    comet.obj.rotation.z += comet.r[2]
  });
}
//Move Ship
function moveShip() {
  if (up) {
    if (ship.position.y < 3) {

      if (upCount == 0) {
        upCount = 1
      }
      ship.position.y += 0.1 //Move ship up
      if (ship.rotation.x < (Math.PI + Math.PI / 8)) {
        ship.rotation.x += Math.PI / 80 //Rotate Ship up

      }
    }

  }
  else if (!up && upCount == 1) { //Correct rotation when keyup
    if (ship.rotation.x > Math.PI) {
      ship.rotation.x -= Math.PI / 160

    }
  }

  if (left) {
    if (leftCount == 0) {
      leftCount = 1
    }
    if (ship.position.x > -5) {
      ship.position.x -= 0.1
      if (ship.rotation.y > (- Math.PI / 8)) {
        ship.rotation.y -= Math.PI / 80
      }
    }
  }
  else if (!left && leftCount == 1) {
    if (ship.rotation.y < 0) {
      ship.rotation.y += Math.PI / 160

    }
  }

  if (down) {
    if (downCount == 0) {
      downCount = 1
    }
    if (ship.position.y > -4) {
      ship.position.y -= 0.1
      if (ship.rotation.x > (Math.PI - Math.PI / 8)) {
        ship.rotation.x -= Math.PI / 80
      }
    }
  }
  else if (!down && downCount == 1) {
    if (ship.rotation.x < Math.PI) {
      ship.rotation.x += Math.PI / 160

    }
  }

  if (rigth) {
    if (rigthCount == 0) {
      rigthCount = 1
    }
    if (ship.position.x < 5) {
      ship.position.x += 0.1
      if (ship.rotation.y < (Math.PI / 8)) {
        ship.rotation.y += Math.PI / 80
      }
    }
  }
  else if (!rigth && rigthCount == 1) {
    if (ship.rotation.y > 0) {
      ship.rotation.y -= Math.PI / 160

    }
  }
}

//KEYDOWN
function handleKeyDown(event) {
  var char = String.fromCharCode(event.keyCode);


  if (char == "W") {

    up = true

  }
  if (char == "S") {
    down = true

  }
  if (char == "A") {
    left = true
  }
  if (char == "D") {
    rigth = true

  }

}

//KEYUP
function handleKeyUp(event) {
  var char = String.fromCharCode(event.keyCode);
  if (char == "W") {

    up = false

  }
  if (char == "S") {
    down = false

  }
  if (char == "A") {
    left = false
  }
  if (char == "D") {
    rigth = false

  }

}

function ColorLuminance(hex, lum) {

  // validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  lum = lum || 0;

  // convert to decimal and change luminosity
  var rgb = "#", c, j;
  for (j = 0; j < 3; j++) {
    c = parseInt(hex.substr(j * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
    rgb += ("00" + c).substr(c.length);
  }

  return rgb;
}


//Refs

//https://codepen.io/Divyz/pen/VPrZMy?editors=1010