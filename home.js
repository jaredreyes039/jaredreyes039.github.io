let header = document.querySelector('.header')
let about = document.querySelector('.aboutContainer')
tl = gsap.timeline({ease: "power0.out"})


about.addEventListener('mouseenter', (e)=>{
    e.preventDefault();
    tl.to(header, {y:-1000})
})
about.addEventListener('mouseleave', (e)=>{
    e.preventDefault();
    tl.to(header, {y:0})
})


anime({
    targets: '#demoSVG polygon',
    points: [{value: '38.000 40.000, 38.000 97.000, 95.000 97.000, 38.000 40.000, 95.000 40.000, 95.000 97.000, 38.000 40.000, 66.500 68.500, 95.000 97.000'},
    {value: '38.000 40.000, 58.500 81.000, 95.000 97.000, 38.000 40.000, 68.500 9.000, 95.000 97.000, 38.000 40.000, 129.000 59.000, 95.000 97.000'},
    {value: '38.000 40.000, 38.000 97.000, 95.000 97.000, 38.000 40.000, 95.000 40.000, 25.000 97.000, 58.000 40.000, 78.500 68.500, 95.000 97.000'},
    {value: '38.000 40.000, 38.000 97.000, 95.000 97.000, 38.000 40.000, 95.000 40.000, 95.000 97.000, 38.000 40.000, 66.500 68.500, 95.000 97.000'},
    {value: '45.000 90.000, 8.000 97.000, 15.000 57.000, 58.000 43.000, 95.000 40.000, 25.000 97.000, 58.000 40.000, 78.500 68.500, 95.000 97.000'},
    {value: '38.000 40.000, 98.000 17.000, 95.000 97.000, 38.000 90.000, 35.000 5.000, 15.000 97.000, 58.000 40.000, 78.500 68.500, 95.000 97.000'},
    {value: '38.000 40.000, 38.000 97.000, 95.000 97.000, 38.000 40.000, 95.000 40.000, 95.000 97.000, 38.000 40.000, 66.500 68.500, 95.000 97.000'},


],
    easing: 'easeInOutQuad',
    loop: true,
    duration: 1000,
    direction: 'alternate',
  });

anime({
    targets: '#demoSVG',
    keyframes:[
        {rotate: "720deg"},
    ],
    loop: true,
    duration: 1250,
})

anime({
    targets: 'img',
    translateY: '-25px',
    loop: true,
    easing: 'easeInOutSine',
    direction: 'alternate',
    duration: 500,

})

