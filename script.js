//Init VARS
var controls, scene, renderer, camera, ship, plane, plane1, plane3, plane4, line, healthBar, shootPivot, theCube;

var countForAim = 0.40
var comets = []
var lifes = []
var trails = []
var trails2 = []
var pewpew = [] //Shots
var countPewPew = 0
var countFrames = 0
var countFramesTrail = 0
var countFramesTrail2 = 0
var posBackShipX = 0
var posBackShipY = 0


var countDamage = 0

var currentScore = 0
var astroidsDestroyed = 0
if (localStorage.getItem("astroidsDestroyed")) {
  astroidsDestroyed = localStorage.getItem("astroidsDestroyed")
}

var currentBest = 0
if (localStorage.getItem("currentBest")) {
  currentBest = localStorage.getItem("currentBest")
}



//Sound
//var mainTheme = "mainTheme"

//Vars for move ship
var up = false, left = false, rigth = false, down = false
var upCount = 0, downCount = 0, leftCount = 0, rigthCount = 0 //Count is need to prevent error in first case
var arrow = 1 //1 left, 2 rigth
var modeConfirmed = false

var pause = false
var isPause = false
var inMenu = true

var oneTimeThing = false
var dead = false
var toMenu = false

var healthPoints = 100
var healthOnCollision = 4.800000190734863
var countCollision = 0
var collided = false

var ultimateProgress = 0
var useUltimate = false
var ultiEffect = { c: 100, t: 0, d: false }
var endlessSpeed = { s: 0.2, c: 360, r: 0.001 } //Speed of creation, speed of reload, rotation of vortex

var multiplier = 1
var multiplierAdd = 10
var maxCombo = 0
if (localStorage.getItem("maxCombo")) {
  maxCombo = localStorage.getItem("maxCombo")
}

//OnLoad
window.onload = function init() {

  var canvas = document.getElementById("webglcanvas");
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
  renderer.setSize(canvas.width, canvas.height);



  //createjs.Sound.registerSound("Stuff/Hollow Knight- Sealed Vessel Theme EXTENDED.mp3", mainTheme);


  scoreText = document.createElement('div');
  scoreText.style.position = 'absolute';
  scoreText.style.width = 100;
  scoreText.style.height = 100;
  scoreText.innerHTML += "ENDLESS MODE";
  scoreText.style.color = "white";
  scoreText.innerHTML += "<br><br>-BEST SCORE: " + currentBest;
  scoreText.innerHTML += "<br>-TOTAL OF ASTROIDS DESTROYED: " + astroidsDestroyed;
  scoreText.innerHTML += "<br>-Max Combo: " + maxCombo;
  scoreText.style.top = 20 + 'px';
  scoreText.style.left = 50 + 'px';
  scoreText.className = "text"
  document.body.appendChild(scoreText);


  thescoreText = document.createElement('div');
  thescoreText.style.position = 'absolute';
  thescoreText.style.width = 100;
  thescoreText.style.height = 100;
  thescoreText.style.color = "#BC2020";
  thescoreText.innerHTML = "SCORE: " + currentScore + "<br>Velocity: x" + (endlessSpeed.r * 1000) + "<br>Combo: " + (multiplier-1);
  thescoreText.style.top = 70 + 'px';
  thescoreText.style.left = 480 + 'px';
  thescoreText.className = "text1"
  document.body.appendChild(thescoreText);



  var geometry = new THREE.PlaneGeometry(200, 150);
  var material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, transparent: true });
  var texture = new THREE.TextureLoader().load("./Stuff/pause.png");
  material.map = texture;
  plane1 = new THREE.Mesh(geometry, material);
  plane1.scale.set(1.3, 1.3, 1.3)
  plane1.position.z = -190

  var geometry = new THREE.PlaneGeometry(200, 150);
  var material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, transparent: true });
  var texture = new THREE.TextureLoader().load("./Stuff/lost.png");
  material.map = texture;
  plane11 = new THREE.Mesh(geometry, material);
  plane11.scale.set(1.3, 1.3, 1.3)
  plane11.position.z = -190

  var geometry = new THREE.PlaneGeometry(200, 150);
  var material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, transparent: true });
  var texture = new THREE.TextureLoader().load("./Stuff/damage.png");
  material.map = texture;
  plane111 = new THREE.Mesh(geometry, material);
  plane111.scale.set(1.3, 1.3, 1.3)
  plane111.position.z = -190

  var geometry = new THREE.PlaneGeometry(200, 150);
  var material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, transparent: true });
  var texture = new THREE.TextureLoader().load("./Stuff/ulti.png");
  material.map = texture;
  plane1111 = new THREE.Mesh(geometry, material);
  plane1111.scale.set(1.3, 1.3, 1.3)
  plane1111.position.z = -190





  //CAMERA
  camera = new THREE.PerspectiveCamera(50, canvas.width / canvas.height, 1, 4000);
  camera.position.set(0, 0, 10);
  //camera.rotation.z = 90 * Math.PI / 180  
  scene.add(camera);

  //AXIS
  //var axes = new THREE.AxesHelper(10);
  //scene.add(axes);

  //Clear and functions
  renderer.setClearColor("#000000");
  //createSomething() //Lines to help view the prespective
  createLights()
  createSpaceShip()
  createBackground()

  createMenu()
  drawMenuLine()

  //createUI()


  //controls = new THREE.OrbitControls(camera);
  //controls.addEventListener('change', function () { renderer.render(scene, camera); });

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

//Create
function drawMenuLine() {

  var material = new THREE.LineBasicMaterial({
    color: 0xFF775F //Panttone of the year :D (Coral)
  });

  var geometry = new THREE.Geometry();
  geometry.vertices.push(
    new THREE.Vector3(-4, 0, 0),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(-4, 1, 0),
    new THREE.Vector3(-4, 0, 0)
  );

  line = new THREE.Line(geometry, material);
  line.position.set(-0.37, -3.63, 0)
  scene.add(line);

}

function drawAim() {

  var geometry = new THREE.PlaneGeometry(5, 5);
  var material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, transparent: true });
  var texture = new THREE.TextureLoader().load("./Stuff/aim1.png");
  material.map = texture;
  plane3 = new THREE.Mesh(geometry, material);
  plane3.scale.set(0.4, 0.4, 0.4)
  plane3.position.z = 15
  shipPivot.add(plane3);


  var geometry = new THREE.PlaneGeometry(5, 5);
  var material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, transparent: true });
  var texture = new THREE.TextureLoader().load("./Stuff/aim2.png");
  material.map = texture;
  plane4 = new THREE.Mesh(geometry, material);
  plane4.scale.set(0.4, 0.4, 0.4)
  plane4.position.z = 15
  shipPivot.add(plane4);


}

function createMenu() {
  //Create menu interface
  var geometry = new THREE.PlaneGeometry(200, 150);
  var material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, transparent: true });
  var texture = new THREE.TextureLoader().load("./Stuff/menu.png");
  material.map = texture;
  plane2 = new THREE.Mesh(geometry, material);
  plane2.scale.set(1.2, 1.2, 1.2)
  plane2.position.z = -190
  scene.add(plane2);

  //Change ship specs for the menu
  shipPivot.scale.set(1.5, 1.5, 1.5)
  shipPivot.rotation.y = Math.PI
  shipPivot.rotation.x += Math.PI / 20
  shipPivot.position.y -= 1


  modeConfirmed = false
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
  healthBarBorder.position.set(-9, 12.5, -20)
  scene.add(healthBarBorder);

  var geometry = new THREE.PlaneGeometry(9.6, 0.6);
  var material = new THREE.MeshBasicMaterial({ color: 0x595959, side: THREE.DoubleSide });
  var healthBarBorderBack = new THREE.Mesh(geometry, material);
  healthBarBorderBack.position.set(-9, 12.5, -20)
  scene.add(healthBarBorderBack);

  var geometry = new THREE.PlaneGeometry(9.6, 0.6);
  var material = new THREE.MeshBasicMaterial({ color: 0xC9000A, side: THREE.DoubleSide });
  healthBar = new THREE.Mesh(geometry, material);
  healthBar.position.set(-9, 12.5, -20) 
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


  var geometry = new THREE.RingGeometry(1, 2, 32, 8, Math.PI / 2, 0); //Change last angle in negative, if 100% green #00F03D 
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

  shipPivot = new THREE.Object3D;

  //shipPivot.rotateY(Math.PI)
  shipPivot.rotation.x = Math.PI
  shipPivot.rotation.z = Math.PI
  shipPivot.rotation.y = 0
  scene.add(shipPivot);



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
        child.scale.set(0.3, 0.3, 0.3)
        child.material.side = THREE.DoubleSide
      }
    });

    //ship.rotateY(Math.PI)
    ship.scale.set(0.1, 0.1, 0.1)
    ship.position.y = 0
    ship.position.z = 0
    //ship.rotation.x = Math.PI
    //ship.rotation.z = Math.PI
    //ship.rotation.y = 0



    shipPivot.add(ship);



  });
  // });



  shootPivot = new THREE.Object3D;
  shipPivot.add(shootPivot);

  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var material = new THREE.MeshNormalMaterial({ visible: false });
  theCube = new THREE.Mesh(geometry, material);
  theCube.scale.set(0.1, 0.1, 0.1)
  theCube.position.set(0, 0.3, 1.5)

  shootPivot.add(theCube);



}



function createLife() {
  rand1 = parseInt(Math.random() * 5)
  console.log(rand1)
  if (rand1 == 1) {

    x = (Math.random() * 12) - 6
    y = (Math.random() * 8) - 4
    z = -200

    var geometry = new THREE.TorusKnotGeometry(1, 0.3);
    var material = new THREE.MeshNormalMaterial({ color: 0xffff00 });
    var torusKnot = new THREE.Mesh(geometry, material);
    torusKnot.scale.set(0.3, 0.3, 0.3)
    torusKnot.position.set(x, y, z)
    scene.add(torusKnot);
    lifes.push(torusKnot)

  }



}




function createRocks() {

  countFrames++

  while (countFrames > endlessSpeed.c) {
    countFrames = 0
    var x, y, z


    createLife()



    for (let i = 0; i < 5; i++) {
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
      //sphere.castShadow = true;
      //sphere.receiveShadow = true;
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
  // light.castShadow = true;            // default false
  // //light.shadow.mapSize.width = 1024;  // default 512
  // light.shadow.mapSize.height = 1024; // default 512
  // light.shadow.camera.near = 2;       // default 0.5
  // light.shadow.camera.far = 1500;
  scene.add(light);

  var light2 = new THREE.PointLight(0x6495ed, 6, 1000);
  light2.position.set(-50, -100, 0);
  // light2.castShadow = true;            // default false
  // light2.shadow.mapSize.width = 1024;  // default 512
  // light2.shadow.mapSize.height = 1024; // default 512
  // light2.shadow.camera.near = 2;       // default 0.5
  // light2.shadow.camera.far = 1500;
  scene.add(light2); var light2 = new THREE.PointLight(0x6495ed, 6, 1000);
  light2.position.set(-250, -100, 0);
  // light2.castShadow = true;            // default false
  // light2.shadow.mapSize.width = 1024;  // default 512
  // light2.shadow.mapSize.height = 1024; // default 512
  // light2.shadow.camera.near = 2;       // default 0.5
  // light2.shadow.camera.far = 1500;
  scene.add(light2);

}


//Animate
function animate() {
  //createjs.Sound.play(mainTheme);

  if (modeConfirmed) { //Carregou na tecla para confirmar o modo
    inMenu = false



  }

  if (inMenu) {

    shipPivot.rotation.y += Math.PI / 300
    if (line && arrow == 2) {
      line.position.x = 4.36

    }
    if (line && arrow == 1) {
      line.position.x = -0.37

    }

  }
  if (!inMenu) { //Inicia o jogo

    scene.remove(plane2)//remove menu interface
    scene.remove(line)

    if (arrow == 1) { //Mode 1
      if (!dead) {

        initModes(endlessMode) //storyMode
      }
      else {
        isDead()
      }
    }
    if (arrow == 2) { //Mode 2


      if (!dead) {
        initModes(endlessMode)
      }
      else {
        isDead()
      }

    }


  }
  renderer.render(scene, camera);
  requestAnimationFrame(animate);

}

function isDead() {

  if (currentScore > localStorage.getItem("currentBest")) {
    currentBest = currentScore
    localStorage.setItem("currentBest", currentBest)

  }
  localStorage.setItem("astroidsDestroyed", astroidsDestroyed)
  if (maxCombo > localStorage.getItem("maxCombo")) {
    
    localStorage.setItem("maxCombo", maxCombo)

  }

  scene.add(plane11);
  isPause = true

  if (toMenu) {
    location.reload();
  }



}


function initModes(mode) {

  //Animation menu -> startgame
  //This code change the size of the ship
  if (shipPivot.scale.x >= 1) {
    shipPivot.scale.x -= 0.01
    shipPivot.scale.y -= 0.01
    shipPivot.scale.z -= 0.01
  }
  //This code put the ship in the rigth direction and then init the mode
  while ((shipPivot.rotation.y * 180 / Math.PI) > 360) {
    shipPivot.rotation.y -= 360 * Math.PI / 180
  }

  while ((shipPivot.rotation.y * 180 / Math.PI) < -360) {
    shipPivot.rotation.y += 360 * Math.PI / 180
  }

  if ((shipPivot.rotation.y * 180 / Math.PI) > 3 && !oneTimeThing) {
    shipPivot.rotation.y -= Math.PI / 80
  }
  else if ((shipPivot.rotation.y * 180 / Math.PI) < -3 && !oneTimeThing) {
    shipPivot.rotation.y += Math.PI / 80
  }
  else {
    mode() //Pass a JavaScript function as parameter :D

  }
}

function gotHit() {




}



//Modes
function endlessMode() {
  oneTimeThing = true
  if (pause && !isPause) {



    scene.add(plane1);

    isPause = true
  }
  else if (!pause) {
    //Lose health

    if (healthBar.geometry.vertices[3].x > healthOnCollision && healthBar.geometry.vertices[0].x < healthBar.geometry.vertices[1].x) {

      healthBar.geometry.vertices[3].x -= 0.01
      healthBar.geometry.vertices[1].x -= 0.01

      countDamage += 1

      if (countDamage >= 20) {
        scene.remove(plane111)
        countDamage = 0
      }
      else if (countDamage >= 10) {
        scene.add(plane111)
      }


      if (healthBar.geometry.vertices[1].x <= healthOnCollision) {
        collided = false
      }
      if (healthBar.geometry.vertices[1].x <= healthBar.geometry.vertices[0].x) {

        healthBar.geometry.vertices[1].x = healthBar.geometry.vertices[0].x
        healthBar.geometry.vertices[3].x = healthBar.geometry.vertices[0].x

        //Function end game
        dead = true
      }
      healthBar.geometry.verticesNeedUpdate = true;
    }
    if (healthBar.geometry.vertices[3].x > healthOnCollision && healthBar.geometry.vertices[0].x >= healthBar.geometry.vertices[1].x) {
      scene.remove(plane111)
      countDamage = 0
      //Ter a certeza que a layer de aviso de dano é removida depois da barra de vida parar
    }
    //Update health
    healthBar.geometry.width = healthPoints * 9.6 / 100
    healthBar.geometry.verticesNeedUpdate = true;
    healthBar.position.x = -9

    scene.remove(plane1)
    isPause = false


    plane.rotation.z += endlessSpeed.r

    createRocks()

    moveShip()
    moveComets()
    makeShipTrail()
    makeShipTrail1()
    makePewPew()
    if (!plane3) {
      drawAim()
    }

    /*
    if(ship){
      camera.lookAt(ship.position)
    }*/
    //Collisions and lose health
    if (ship && comets.length > 0) {
      BBox = new THREE.Box3().setFromObject(ship);

      comets.forEach((comet, i) => {

        if (comet.obj.position.z > -10) {
          BBox2 = new THREE.Box3().setFromObject(comet.obj);
          var collision = BBox.intersectsBox(BBox2);
          if (collision && collided == false) {

            multiplier = 1
            scene.remove(comets[i].obj)
            comets.splice(i, 1)

            if (!(healthBar.geometry.vertices[1].x <= healthBar.geometry.vertices[0].x)) {
              healthOnCollision = healthBar.geometry.vertices[3].x - 2

            }

            collided == true

          }


        }


      });

    }
    //Collision Pew Comet
    if (pewpew.length > 0 && comets.length > 0) {
      pewpew.forEach((pew, j) => {
        BBox = new THREE.Box3().setFromObject(pew);

        if (pew.position.z < -100) {
          scene.remove(pewpew[j])
          pewpew.splice(j, 1)
          j--
        }

        comets.forEach((comet, i) => {
          BBox2 = new THREE.Box3().setFromObject(comet.obj);
          var collision = BBox.intersectsBox(BBox2);
          if (collision) {
            multiplier++
            astroidsDestroyed++

            if(multiplier-1 > maxCombo){
              maxCombo = multiplier-1
            }

            scene.remove(UltimateBar)
            ultimateProgress += (-Math.PI / 10)
            var geometry = new THREE.RingGeometry(1, 2, 32, 8, Math.PI / 2, ultimateProgress); //Change last angle in negative, if 100% green #00F03D
            if (ultimateProgress <= -2 * Math.PI) {
              var material = new THREE.MeshBasicMaterial({ color: 0x00F03D, side: THREE.DoubleSide });
            }
            else {
              var material = new THREE.MeshBasicMaterial({ color: 0xFECF41, side: THREE.DoubleSide });
            }
            UltimateBar = new THREE.Mesh(geometry, material)
            UltimateBar.position.set(-16, 11, -20)

            scene.add(UltimateBar)


            scene.remove(comets[i].obj)
            comets.splice(i, 1)
            i--

            scene.remove(pewpew[j])
            pewpew.splice(j, 1)
            j--

            console.log(((multiplier-1)*multiplierAdd + 500))
            currentScore += ((multiplier-1)*multiplierAdd + 500)
          }

        })

      });

    }

    //Get lifes
    if (lifes.length > 0) {
      BBox = new THREE.Box3().setFromObject(ship);
      lifes.forEach((life, k) => {

        if (life.position.z > -10) {
          BBox2 = new THREE.Box3().setFromObject(life);
          var collision = BBox.intersectsBox(BBox2);

          if (collision) {


            scene.remove(lifes[k])
            lifes.splice(k, 1)


            healthOnCollision += 2
            healthBar.geometry.vertices[3].x += 2
            healthBar.geometry.vertices[1].x += 2

            if (healthOnCollision > 4.800000190734863) {
              healthOnCollision = 4.800000190734863
              healthBar.geometry.vertices[3].x = 4.800000190734863
              healthBar.geometry.vertices[1].x = 4.800000190734863
              currentScore+=500
            }
            


          }



        }


      });

    }

    if (ultimateProgress <= -2 * Math.PI && useUltimate) {

      ultiEffect.d = true
      ultimateProgress = 0
      useUltimate = false

      scene.remove(UltimateBar)
      var geometry = new THREE.RingGeometry(1, 2, 32, 8, Math.PI / 2, ultimateProgress); //Change last angle in negative, if 100% green #00F03D      
      var material = new THREE.MeshBasicMaterial({ color: 0xFECF41, side: THREE.DoubleSide });
      UltimateBar = new THREE.Mesh(geometry, material)
      UltimateBar.position.set(-16, 11, -20)

      scene.add(UltimateBar)

    }

    if (ultiEffect.d) {
      ultimateEffect()
    }


    if (currentScore > 10000) {
      endlessSpeed.s = 0.3
      endlessSpeed.c = 260
      endlessSpeed.r = 0.002
    }
    if (currentScore > 25000) {
      endlessSpeed.s = 0.4
      endlessSpeed.c = 200
      endlessSpeed.r = 0.005
    }
    if (currentScore > 50000) {
      endlessSpeed.s = 0.6
      endlessSpeed.c = 150
      endlessSpeed.r = 0.01
    }
    if (currentScore > 100000) {
      endlessSpeed.s = 1
      endlessSpeed.c = 100
      endlessSpeed.r = 0.02
    }
    currentScore++





    
    thescoreText.innerHTML = "SCORE: " + currentScore + "<br>Velocity: x" + (endlessSpeed.r * 1000) + "<br>Combo: " + (multiplier-1);




  }

}

//Effect of ultimate before clean all enemys
function ultimateEffect() {
  ultiEffect.t++

  if (ultiEffect.t >= 20) {
    scene.remove(plane1111)
    ultiEffect.c -= 10
    ultiEffect.t = 0
  }
  else if (ultiEffect.t >= 10) {
    scene.add(plane1111)

  }

  if (ultiEffect.c == 0) {
    cleanEnemys()
    ultiEffect.c = 100
    ultiEffect.t = 0
    ultiEffect.d = false
  }


}

function cleanEnemys() {
  for (let i = 0; i < comets.length; i++) {
    scene.remove(comets[i].obj)
    comets.splice(i, 1)
    i--

  }

}

function storyMode() {


}

function makePewPew() {
  if (ship) {
    if (countPewPew > 30) {


      var geometry = new THREE.CylinderGeometry(1, 1, 20);
      var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
      var cylinder = new THREE.Mesh(geometry, material);
      cylinder.rotation.x = Math.PI / 2
      cylinder.scale.set(0.05, 0.05, 0.05)
      //cylinder.position.set(shipPivot.position.x, shipPivot.position.y + 0.5, shipPivot.position.z)//shipPivot//shootPivot
      cylinder.position.set(0, 0, 0)
      cylinder.position.applyMatrix4(theCube.matrixWorld)

      cylinder.dir = plane3.position.clone() // posição plano (em relação ao pivot)    
      // cylinder.dir = cylinder.dir.clone().applyMatrix4(shipPivot.matrixWorld) // posição plano em coordenadas mundo
      cylinder.dir.applyMatrix4(shipPivot.matrixWorld)
      cylinder.dir.sub(shipPivot.position.clone()) // direção = posPlano - posPivot
      //cylinder.dir.multiplyScalar(-1)
      cylinder.dir.multiplyScalar(0.03)




      pewpew.push(cylinder)
      scene.add(cylinder);


      countPewPew = 0
    }
  }


  pewpew.forEach(pew => {

    pew.position.addVectors(pew.position.clone(), pew.dir)


    comets.forEach(comet => {


      //Colisão?


    });

  });

  countPewPew++

}


//2 ship trails
function makeShipTrail1() {

  if (ship) {
    if (countFramesTrail > 0) {
      for (let i = 0; i < 1; i++) {

        var geometry = new THREE.SphereGeometry(1, 8, 8);
        var material = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true });
        material.color = new THREE.Color(0xF94000)
        var sphere1 = new THREE.Mesh(geometry, material);


        sphere1.position.x = ship.position.x - 0.15
        sphere1.position.y = ship.position.y + 0.5
        sphere1.position.z = -1.8


        sphere1.scale.set(0.1, 0.1, 0.5)
        let vX = Math.random() * 0.002 - 0.001;
        let vY = Math.random() * 0.001 - 0.0005;

        //var normalMatrix = new THREE.Matrix4().extractRotation(ship.matrixWorld);
        //normal = new THREE.Vector3(0,0,-1)
        //bulletDirection = normal.clone().applyMatrix4(normalMatrix)


        shipPivot.add(sphere1);
        trails.push({ sphere: sphere1, vx: vX, vy: vY }) //, direction: bulletDirection.clone()


      }
      countFramesTrail = 0
    }

    trails.forEach((trail, i) => {

      //trail.sphere.position.addVectors(trail.sphere.position.clone(), trail.direction.clone().multiplyScalar(0.1)); 

      trail.sphere.position.z -= 0.1
      trail.sphere.scale.x += 0.01
      trail.sphere.scale.y += 0.01
      trail.sphere.scale.z += 0.01
      trail.sphere.position.x += trail.vx
      trail.sphere.position.y += trail.vy
      trail.sphere.material.opacity -= 0.05


      if (trail.sphere.position.z < -2) {
        trail.sphere.material.color = new THREE.Color(0xFF8100)

      }
      if (trail.sphere.position.z < -2.4) {
        trail.sphere.material.color = new THREE.Color(0xF6A321)

      }
      if (trail.sphere.position.z < -2.8) {
        trail.sphere.material.color = new THREE.Color(0xF1C542)

      }

      if (trail.sphere.position.z < -4) {

        shipPivot.remove(trails[i].sphere)
        trails.splice(i, 1)
        i--
      }
    });


  }

  countFramesTrail += 1




}

function makeShipTrail() {

  if (ship) {
    if (countFramesTrail2 > 0) {
      for (let i = 0; i < 1; i++) {

        var geometry = new THREE.SphereGeometry(1, 8, 8);
        var material = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true });
        material.color = new THREE.Color(0xF94000)
        var sphere2 = new THREE.Mesh(geometry, material);


        sphere2.position.x = ship.position.x + 0.2
        sphere2.position.y = ship.position.y + 0.5
        sphere2.position.z = -1.8




        sphere2.scale.set(0.1, 0.1, 0.5)
        let vX = Math.random() * 0.002 - 0.001;
        let vY = Math.random() * 0.001 - 0.0005;

        //var normalMatrix = new THREE.Matrix4().extractRotation(ship.matrixWorld);
        //normal = new THREE.Vector3(0,0,-1)
        //bulletDirection = normal.clone().applyMatrix4(normalMatrix)


        shipPivot.add(sphere2);
        trails2.push({ sphere: sphere2, vx: vX, vy: vY }) //, direction: bulletDirection.clone()


      }
      countFramesTrail2 = 0
    }

    trails2.forEach((trail, i) => {

      //trail.sphere.position.addVectors(trail.sphere.position.clone(), trail.direction.clone().multiplyScalar(0.1)); 

      trail.sphere.position.z -= 0.1
      trail.sphere.scale.x += 0.01
      trail.sphere.scale.y += 0.01
      trail.sphere.scale.z += 0.01
      trail.sphere.position.x += trail.vx
      trail.sphere.position.y += trail.vy
      trail.sphere.material.opacity -= 0.05


      if (trail.sphere.position.z < -2) {
        trail.sphere.material.color = new THREE.Color(0xFF8100)

      }
      if (trail.sphere.position.z < -2.4) {
        trail.sphere.material.color = new THREE.Color(0xF6A321)

      }
      if (trail.sphere.position.z < -2.8) {
        trail.sphere.material.color = new THREE.Color(0xF1C542)

      }

      if (trail.sphere.position.z < -4) {

        shipPivot.remove(trails2[i].sphere)
        trails2.splice(i, 1)
        i--
      }
    });


  }

  countFramesTrail2 += 1




}

//Move, update
function moveComets() {

  //lifes

  lifes.forEach((life, i) => {
    life.position.z += endlessSpeed.s
    life.rotation.z += 0.03
    if (life.position.z > 10) {
      scene.remove(lifes[i])

      lifes.splice(i, 1)
    }


  });


  comets.forEach((comet, i) => {

    //Move
    comet.obj.position.z += endlessSpeed.s

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
    if (shipPivot.position.y < 3) {

      if (upCount == 0) {
        upCount = 1
      }
      shipPivot.position.y += 0.1 //Move ship up
      if (shipPivot.rotation.x < (Math.PI + Math.PI / 8)) {
        shipPivot.rotation.x += Math.PI / 80 //Rotate Ship up

      }
    }

  }
  else if (!up && upCount == 1) { //Correct rotation when keyup
    if (shipPivot.rotation.x > Math.PI) {
      shipPivot.rotation.x -= Math.PI / 160

    }
  }

  if (left) {
    if (leftCount == 0) {
      leftCount = 1
    }
    if (shipPivot.position.x > -5) {
      shipPivot.position.x -= 0.1
      if (shipPivot.rotation.y > (- Math.PI / 8)) {
        shipPivot.rotation.y -= Math.PI / 80
      }
    }
  }
  else if (!left && leftCount == 1) {
    if (shipPivot.rotation.y < 0) {
      shipPivot.rotation.y += Math.PI / 160

    }
  }

  if (down) {
    if (downCount == 0) {
      downCount = 1
    }
    if (shipPivot.position.y > -4) {
      shipPivot.position.y -= 0.1
      if (shipPivot.rotation.x > (Math.PI - Math.PI / 8)) {
        shipPivot.rotation.x -= Math.PI / 80
      }
    }
  }
  else if (!down && downCount == 1) {
    if (shipPivot.rotation.x < Math.PI) {
      shipPivot.rotation.x += Math.PI / 160

    }
  }

  if (rigth) {
    if (rigthCount == 0) {
      rigthCount = 1
    }
    if (shipPivot.position.x < 5) {
      shipPivot.position.x += 0.1
      if (shipPivot.rotation.y < (Math.PI / 8)) {
        shipPivot.rotation.y += Math.PI / 80
      }
    }
  }
  else if (!rigth && rigthCount == 1) {
    if (shipPivot.rotation.y > 0) {
      shipPivot.rotation.y -= Math.PI / 160

    }
  }


}

//HandleKeys
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
    if (!modeConfirmed) {
      arrow = 1
    }
  }
  if (char == "D") {
    rigth = true
    if (!modeConfirmed) {
      arrow = 2
    }
  }
  if (char == " ") { //Change to other key

    if (modeConfirmed) {

      if (dead) {
        toMenu = true
      }
      else {
        pause = !pause
      }
    }
    if (!modeConfirmed) {
      modeConfirmed = true
      createUI()
    }

  }
  if (char == "E") {
    if (ultimateProgress <= -2 * Math.PI) {
      useUltimate = true
    }

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