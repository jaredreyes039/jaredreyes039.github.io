let height = window.innerHeight

window.addEventListener('resize',()=>{
    height = window.innerHeight
    $('.projslide').css('height', height)
})

$('.projslide').css('height', height)