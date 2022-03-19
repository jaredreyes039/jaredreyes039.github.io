
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
const raycaster = new THREE.Raycaster();
const scene = new THREE.Scene();
let height = window.innerHeight;
let width = window.innerWidth;



function generatePlane(){
    planeMesh.geometry.dispose();
    planeMesh.geometry = new THREE.PlaneGeometry(world.plane.width, world.plane.height, world.plane.widthSegments, world.plane.heightSegments)
    

    const colors = []
    for (let i = 0; i< planeMesh.geometry.attributes.position.count; i++){
        colors.push(0.5, 0, 0.4)
    }
    planeMesh.geometry.setAttribute('color',
        new THREE.BufferAttribute(new Float32Array(colors), 3)
    )
    let randomValues = []
    const {array} = planeMesh.geometry.attributes.position
    for (let i = 0; i<array.length; i+=3){
        const x = array[i]
        const y = array[i+1]
        const z = array[i+2]

        array[i + 2] = z + Math.random()

    }
    planeMesh.geometry.attributes.position.originalPosition = planeMesh.geometry.attributes.position.array
    planeMesh.geometry.attributes.position.randomValues = randomValues
    
    for (let i = 0; i<array.length; i++){
    if(i%3 === 0){
    const x = array[i]
    const y = array[i+1]
    const z = array[i+2]
    array[i] = x + (Math.random() - 0.5)*3
    array[i+1] = y + (Math.random() - 0.5)*3
    array[i + 2] = z + ((Math.random()-0.5)*3)}
    randomValues.push(Math.random()*(Math.PI*2))
}

}

//cameraPersp = (angle of view, aspect ratio (w/h), near clipping plane, far clipping pane)
//nearClipping means how close an object has to be to the camera to be clipped
//farClipping cannot see past furthest clip plane
const camera = new THREE.PerspectiveCamera(90, width/height, 0.1, 1000 )
const renderer = new THREE.WebGL1Renderer();
const controls = new OrbitControls(camera, renderer.domElement)
controls.minDistance = 5
controls.maxDistance = 50
controls.enableRotate = false

//Now I can make use of my declared Class constants

//render.domElement has to be an appended child to whatever is storing scene
renderer.setSize(width, height)
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement)

// const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
// const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00aa00})
// const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)
// scene.add(boxMesh) 

//BasicMats do NOT interact w/ light
//PhongMats DO interact w/ light
//to view phong, a light is NECESSARY
const light = new THREE.DirectionalLight(0xffffff, 0.5)
const light2 = new THREE.DirectionalLight(0xffffff, 0.5)
light2.position.set(0,-1,-1)
light.position.set(0, 1, 1)
scene.add(light, light2)
const planeGeo = new THREE.PlaneGeometry(300, 300, 150, 150);
const planeMat = new THREE.MeshPhongMaterial({side: THREE.DoubleSide, flatShading: THREE.FlatShading, vertexColors: true});
const planeMesh = new THREE.Mesh(planeGeo, planeMat)
scene.add(planeMesh)
planeMesh.position.z = 0.25

//Copy of original positions of vertices in plane
let randomValues = []
const {array} = planeMesh.geometry.attributes.position
planeMesh.geometry.attributes.position.originalPosition = planeMesh.geometry.attributes.position.array
planeMesh.geometry.attributes.position.randomValues = randomValues
for (let i = 0; i<array.length; i++){
    if(i%3 === 0){
    const x = array[i]
    const y = array[i+1]
    const z = array[i+2]
    array[i] = x + (Math.random() - 0.5)*3
    array[i+1] = y + (Math.random() - 0.5)*3
    array[i + 2] = z + ((Math.random()-0.5)*3)}
    randomValues.push(Math.random()-0.5)
}


const colors = []

for (let i = 0; i< planeMesh.geometry.attributes.position.count; i++){
    colors.push(0.8549, 0.6471, 0.1255)
}
planeMesh.geometry.setAttribute('color',
    new THREE.BufferAttribute(new Float32Array(colors), 3)
)
//Loop changing vertices colors


//Mouse object for obtaining x and y coords to realign axis
const mouse = {
    x: undefined,
    y: undefined,
}

camera.position.z = 50
let frame = 0

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera)
    frame += 0.01
    // boxMesh.rotation.x += 0.01
    // boxMesh.rotation.y += 0.01

    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObject(planeMesh)
    const {array, originalPosition, randomValues} = planeMesh.geometry.attributes.position

    for(let i=0; i<array.length;i+=3){
        array[i] = originalPosition[i] + Math.cos(frame + randomValues[i])*0.005
        array[i+1] = originalPosition[i+1] + Math.sin(frame + randomValues[i+1])*0.001
    }

    planeMesh.geometry.attributes.position.needsUpdate = true;
    //Loop for selecting ind. faces and changing vertices colors in those faces
    if(intersects.length>0){
        intersects[0].object.geometry.attributes.color.setX(intersects[0].face.a, 0)
        intersects[0].object.geometry.attributes.color.setY(intersects[0].face.a, 0.54)
        intersects[0].object.geometry.attributes.color.setZ(intersects[0].face.a, 0.54)
        intersects[0].object.geometry.attributes.color.setX(intersects[0].face.b, 0)
        intersects[0].object.geometry.attributes.color.setY(intersects[0].face.b, 0.54)
        intersects[0].object.geometry.attributes.color.setZ(intersects[0].face.b, 0.54)
        intersects[0].object.geometry.attributes.color.setX(intersects[0].face.c, 0)
        intersects[0].object.geometry.attributes.color.setY(intersects[0].face.c, 0.54)
        intersects[0].object.geometry.attributes.color.setZ(intersects[0].face.c, 0.54)

        intersects[0].object.geometry.attributes.color.needsUpdate = true
        const initialColor = {
            r: 0.8549,
            g: 0.6471,
            b: 0.1255,
        }
        const hoverColor = {
            r: 0,
            g: 0.54,
            b: 0.54,
        }
        gsap.to(hoverColor, {r: initialColor.r, g: initialColor.g, b: initialColor.b, onUpdate: ()=>{
            intersects[0].object.geometry.attributes.color.setX(intersects[0].face.a, hoverColor.r)
        intersects[0].object.geometry.attributes.color.setY(intersects[0].face.a, hoverColor.g)
        intersects[0].object.geometry.attributes.color.setZ(intersects[0].face.a, hoverColor.b)
        intersects[0].object.geometry.attributes.color.setX(intersects[0].face.b, hoverColor.r)
        intersects[0].object.geometry.attributes.color.setY(intersects[0].face.b, hoverColor.g)
        intersects[0].object.geometry.attributes.color.setZ(intersects[0].face.b, hoverColor.b)
        intersects[0].object.geometry.attributes.color.setX(intersects[0].face.c, hoverColor.r)
        intersects[0].object.geometry.attributes.color.setY(intersects[0].face.c, hoverColor.g)
        intersects[0].object.geometry.attributes.color.setZ(intersects[0].face.c, hoverColor.b)
        }}) 
        
    }
}
animate()



//By putting the mouse in its own obj I can access the e listen return from outside the e listen
addEventListener('mousemove', (e)=>{
    mouse.x = (e.clientX / width)*2-1;
    mouse.y = -(e.clientY/ height)*2 + 1;   
})
let doit;

window.addEventListener('resize', function(){
    renderer.setSize(this.innerWidth, this.innerHeight)
    controls.minDistance = 5
    controls.maxDistance = 50
})