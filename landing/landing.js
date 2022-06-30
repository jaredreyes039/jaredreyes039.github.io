import openSimplexNoise from 'https://cdn.skypack.dev/open-simplex-noise'; 


// THREE.JS Animation for Header
let width = window.innerWidth
let height = window.innerHeight


// Setting Scene, Cam, and Renderer

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, width / height, 0.1, 10000 );
const renderer = new THREE.WebGLRenderer();
const amb = new THREE.AmbientLight('white', 0.1)
renderer.setSize( width,  height);
document.getElementById('main').appendChild( renderer.domElement );
renderer.render( scene, camera );

window.addEventListener('resize', function(){
    height = window.innerHeight
    width = window.innerWidth
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
    renderer.setSize( width, height, true);
    camera.aspect = width/height
})

const spotLight = new THREE.SpotLight( 'red' , 0.5, 0, 45, 50, 10);
spotLight.intensity = 0.5;
spotLight.position.set( 1000, 1000, -1000 );
scene.add(spotLight)
// const spotLight2 = new THREE.SpotLight( 'white' , 0.1, 0, 85, 50, 10);
// spotLight2.intensity = 0.5;
// spotLight2.position.set( -1000, -1000, 1000 );
// spotLight2.lookAt( -1000, 1000, 1000 );
// scene.add(spotLight2)

const pointlight = new THREE.PointLight('magenta' , 1, 1000, 1)
pointlight.intensity = 0.5;
pointlight.position.set( 0, 0, 0 );
const helper = new THREE.PointLightHelper(pointlight, 10, 'red')
scene.add(pointlight)

const loader = new THREE.GLTFLoader();
loader.load("../models/heart_textured.glb", (gltf)=>{
    scene.add(gltf.scene)
    console.log(gltf)
    gltf.scene.scale.set(150,150,150)
    gltf.scene.children[0].material.color = new THREE.Color('pink')
    gltf.scene.position.y = 100
    function rotate(){
        requestAnimationFrame(rotate)
        gltf.scene.rotation.y += 0.005
    }
    rotate()
let nPos = [];
let v3 = new THREE.Vector3();
let pos = gltf.scene.parent.children[2].children[0].geometry.attributes.position;
console.log(pos)
// 1. Takes from Position array and normalizes the position at index i
// 2. Pushes a clone of the normalized vector into the new nPos array

for (let i = 0; i < pos.count; i++){
    v3.fromBufferAttribute(pos, i);
    nPos.push(v3.clone());
}
// Adds the nPos array as an accessible attribute

gltf.scene.parent.children[2].children[0].geometry.userData.nPos = nPos


// Updating AnimationFrame Function w/ Callback

// Counter introduced to adjust noise function intensity
// See Main Animation Function for Use

let counter = 0
const update = function(){
    requestAnimationFrame(update)
}
let noise = openSimplexNoise.makeNoise4D(Date.now());

console.log(noise)
function noiseAnim(){
    
    requestAnimationFrame(noiseAnim)
    if(counter === 10){
        counter = 0
    }else{
        counter += 0.075;
    }

    gltf.scene.parent.children[2].children[0].geometry.userData.nPos.forEach((p, i) => {
        let ns = noise(p.x, p.y, p.z, counter*1.05)*0.1;
        v3.copy(p).multiplyScalar(1.001).addScaledVector(p, ns);
        pos.setXYZ(i, v3.x, v3.y, v3.z);
    })
    gltf.scene.parent.children[2].children[0].geometry.computeVertexNormals();
    pos.needsUpdate = true;
    update();
}
noiseAnim()
})


// Adding Controls

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enabled = false
camera.position.z = -800
controls.update();

// Change Scene Background

scene.background = new THREE.Color('black')


// Adding Cubes to Randomized Positions


// Animation rotations

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate()
