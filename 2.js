const canvas2 = document.getElementById('myCanvas2');
const ctx2 = canvas.getContext('2d');

canvas2.width = window.innerWidth;
canvas2.height = window.innerHeight;



margin=canvas2.height*.15


// Example usage:






dots=[{
index:1,
center:{
    x:canvas2.width-(canvas2.height*.15),
    y:0
},
radius:canvas2.height*.15,
speed:{
    x:.7,
    y:.7,
},
xrange:{
    max:canvas2.width+margin,
    min:canvas2.width/2
}
},

{   
index:2,
center:{
    x:0,
    y:canvas2.height/2
},
radius:canvas2.height*.15,
speed:{
    x:.7,
    y:.7,
},
xrange:{
    max:canvas2.width/2,
    min:0-margin
}
}
]



// Function to calculate velocity magnitude
function getVelocity(speed) {
return Math.sqrt(speed.x * speed.x + speed.y * speed.y);
}

// Function to set a new direction while maintaining speed
function setNewDirection(speed) {
const velocity = getVelocity(speed); // Keep the same velocity magnitude
const angle = Math.random() * 2 * Math.PI; // Random angle between 0 and 360 degrees

// Adjust speedX and speedY to the new direction based on the angle
speed.x = velocity * Math.cos(angle);
speed.y = velocity * Math.sin(angle);
}

dots.forEach(dot=>{
setNewDirection(dot.speed)
})

function smoothDirectionChange(dot) {
// Change direction only a little bit towards the new angle
const velocity = getVelocity(dot.speed);
const angleChangeAmount = 0.005; // Smaller values make the transition smoother

// Calculate the current angle
let currentAngle = Math.atan2(dot.speed.y, dot.speed.x);

// Calculate a new random target angle
const targetAngle = Math.random() * 2 * Math.PI;

// Interpolate the angle by a small amount towards the new target
currentAngle = (1 - angleChangeAmount) * currentAngle + angleChangeAmount * targetAngle;

// Update speed based on the interpolated angle
dot.speed.x = velocity * Math.cos(currentAngle);
dot.speed.y = velocity * Math.sin(currentAngle);
}


function drawDots() {
ctx2.clearRect(0, 0, canvas2.width, canvas2.height); // Clear canvas for redrawing

dots.forEach(dot => {
    ctx2.beginPath();
    ctx2.arc(dot.center.x, dot.center.y, dot.radius, 0, Math.PI * 2);
    ctx2.fillStyle = `rgba(${mediumBlue.r}, ${mediumBlue.g}, ${mediumBlue.b}, .3)`;
    ctx2.filter = "blur(50px)";
    ctx2.fill();

    // Update dot position based on speed
    dot.center.x += dot.speed.x;
    dot.center.y += dot.speed.y;
    randValue=Math.random()
    if(randValue>.8){
        smoothDirectionChange(dot)
    }


   
    // Check for collision with left or right walls
    if (dot.center.x + dot.radius > dot.xrange.max + margin || dot.center.x - dot.radius < dot.xrange.min) {
        smoothDirectionChange(dot)

        // Ensure dot stays within bounds
        if (dot.center.x - dot.radius < dot.xrange.min) {
            dot.center.x = dot.xrange.min + dot.radius;
        }

        if (dot.center.x + dot.radius > dot.xrange.max + margin) {
            dot.center.x = dot.xrange.max + margin - dot.radius;
        }
    }

    // Check for collision with top or bottom walls
    if (dot.center.y + dot.radius > canvas2.height + margin || dot.center.y - dot.radius < 0) {
        smoothDirectionChange(dot)
        // Ensure dot stays within bounds
        if (dot.center.y - dot.radius < 0) {
            dot.center.y = dot.radius;
        }

        if (dot.center.y + dot.radius > canvas2.height + margin) {
            dot.center.y = canvas2.height + margin - dot.radius;
        }
    }
});
}
    
    
    



    


function animate(){
   drawDots()


    
    requestAnimationFrame(animate)
}



animate()


function resizeCanvas() {
canvas2.width = window.innerWidth;
canvas2.height = window.innerHeight;
margin=canvas2.height*.15

// If you want to ensure that dots are repositioned or adjusted based on new canvas size
// you can loop through the dots and adjust their positions as necessary.
dots.forEach(dot => {
    // Ensure dots stay within the new canvas dimensions after resizing
    //dot.xrange.max = canvas.width;
    
    if(dot.index==1){
        dot.xrange.max=canvas2.width+margin,
        dot.xrange.min=canvas2.width/2
    }
    if(dot.index==2){
        dot.xrange.max=canvas2.width/2,
        dot.xrange.min=0-margin

    }
    dot.radius=canvas2.height*.15
    if (dot.center.x + dot.radius > canvas2.width) {
        dot.center.x = canvas2.width - dot.radius;
    }
    if (dot.center.y + dot.radius > canvas2.height) {
        dot.center.y = canvas2.height - dot.radius;
    }
})
}