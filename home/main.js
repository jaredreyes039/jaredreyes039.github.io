// THREE.JS Animation for Header
let width = window.innerWidth
let height = document.getElementsByTagName("body")[0].clientHeight


// Setting Scene, Cam, and Renderer

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, width / height, 0.1, 10000 );
const renderer = new THREE.WebGLRenderer();
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

// Adding Controls

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enabled = false
camera.position.z = -500
controls.update();

// Change Scene Background

scene.background = new THREE.Color('white')

// Cubes

let dodecgeo = new THREE.BoxGeometry(25, 25, 25)
let dodecmat = new THREE.MeshBasicMaterial({wireframe: true, color: 'goldenrod'})
let dodec = new THREE.Mesh(dodecgeo, dodecmat)


let dodecgeo2 = new THREE.BoxGeometry(30, 30, 30)
let dodecmat2 = new THREE.MeshBasicMaterial({wireframe: true, color: 'darkcyan'})
let dodecclone = new THREE.Mesh(dodecgeo2, dodecmat2)
scene.add(dodec, dodecclone)

// Cube Scaling and Rotation for Positioning

dodecclone.scale.set(1.1,1.1,1.1)
dodecclone.rotation.x = Math.PI/3
dodecclone.rotation.z = Math.PI/3


// Adding Cubes to Randomized Positions

let group = new THREE.Group();


for(let i = 0; i< 25; i++){
    let clone1 = dodec.clone();
    let clone2 = dodecclone.clone();
    clone1.position.x = Math.random()*(300+300+1)-300
    clone1.position.y = Math.random()*(300+300+1)-300
    clone1.position.z = Math.random()*(300+300+1)-300
    clone2.position.x = clone1.position.x
    clone2.position.y = clone1.position.y
    clone2.position.z = clone1.position.z
    group.add(clone1, clone2)
}

scene.add(group)
// Animation rotations

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );

    dodec.rotation.x += (Math.random(10-10)+10)/1000
    dodec.rotation.y -=  (Math.random(10-10)+10)/1000
    dodec.rotation.z +=  (Math.random(10-10)+10)/1000
    dodecclone.rotation.x -= 0.01
    dodecclone.rotation.y += 0.01
    dodecclone.rotation.z -= 0.01
    scene.rotation.z += 1/1000
    scene.rotation.x -= 1/1000
}
animate()

group.children.map((child)=>{
    function rotAnim(){
        requestAnimationFrame(rotAnim)
        child.rotation.x += (Math.random(10-10)+10)/1000
        child.rotation.y += (Math.random(10-10)+10)/1000
        child.rotation.z += (Math.random(10-10)+10)/1000
    }
    rotAnim()
})


// Anime.JS Animations

// ExpGrid Slide-In Animation when In View
// Uses Observer API

let expGrid = document.getElementById('expGrid')
const gridObserver = new IntersectionObserver(entries =>{
    anime({
        targets: '.exp',
        translateX: [-1000, 0],
        opacity: [0,1],
        delay: anime.stagger(100),
    })
})
gridObserver.observe(expGrid)


// ExpGridHeader Fade In

let expGridHeader = document.getElementById('expgridHeader')
let gridHeadObserver = new IntersectionObserver(entries=>{
    anime({
        targets: '.expgridHeader',
        opacity: [0,1],
        easing: 'easeInOutSine',
    })
})

gridHeadObserver.observe(expGridHeader)

// About Container Fade In

let aboutContainer = document.getElementById('aboutContainer')
let aboutObserver = new IntersectionObserver(entries=>{
    anime({
        targets: '.aboutContainer',
        opacity: [0,1],
        easing: 'easeInOutSine',
    })
})

aboutObserver.observe(aboutContainer)

// Principles Grid Fade In

let princGrid = document.getElementById('princGrid')
let princObserver = new IntersectionObserver(entries=>{
    anime({
        targets: '.princGr',
        opacity: [0,1],
        easing: 'easeInOutSine',
    })
    anime({
        targets: '.princ',
        translateY: [0, 10],
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine',
    })
})

princObserver.observe(princGrid)


// Contact Form Fade In

let contactMe = document.getElementById('contactMe')
let contactObserver = new IntersectionObserver(entries=>{
    anime({
        targets: '.contactMe',
        opacity: [0,1],
        easing: 'easeInOutSine',
    })
})

contactObserver.observe(contactMe)