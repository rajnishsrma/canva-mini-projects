const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
console.log(ctx);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hue = 0;


const particlsArr = [];

//to resize our canvas
// window.addEventListener('resize', function(){
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
    // ctx.fillStyle = "white";
    // ctx.fillRect(10, 10, 150, 50)
    
//});

ctx.fillStyle = "white";
ctx.fillRect(10, 20, 50, 50);

//circle
ctx.fillStyle= "blue";
ctx.strokeStyle= "red";
ctx.lineWidth = 5;
ctx.beginPath();
ctx.arc(100, 100, 30, 0, Math.PI*2); //x coordinate, y, start angle, end angle in radians(degree).
ctx.fill();

//mouse coord
const mouse = {
    x: 10, //0,0(x,y) so set undefined for blank cnavas;
    y: 10
};
//mouse click event
canvas.addEventListener("click", function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    //console.log(event);
    //drawCircle();
   
})

//mouse hover event
canvas.addEventListener("mousemove", function(evt){
    mouse.x = evt.x;
    mouse.y = evt.y;
    //drawCircle();
    for(let i = 0; i < 10; i++){
        particlsArr.push(new Particle());
    }
});

// function drawCircle(){
//     ctx.fillStyle= "blue";
//     ctx.strokeStyle= "red";
//     ctx.lineWidth = 5;
//     ctx.beginPath();
//     ctx.arc(mouse.x, mouse.y, 30, 0, Math.PI*2); //x coordinate, y, start angle, end angle in radians(degree).
//     ctx.fill();
// }


class Particle {   //class is a blueprint for making new obkects
    constructor(){   //,constructor creats a new blank object when it is calles with new keyword; 
        // this.x = Math.random()*canvas.width;  // constructor contains all properties & methods,
        // this.y = Math.random()*canvas.height; 
        this.x = mouse.x; 
        this.y = mouse.y; 
        this.size = Math.random()* 15 + 1; //0 to 6
        this.speeedX = Math.random()* 5 - 1.5; //-1.5 to 1.5
        this.speeedY = Math.random()* 5 - 1.5;
        this.color = "hsl("+ hue+ ", 100%, 50%)"; //hue variable changing means color (wheel) changing; 
                                        //hsl= hue saturation liightness,
                                            //hue is wheel of color 120deg each(rgb),saturation=0%black&white,100%color , lightness=0%black,100%white;

    }
    update(){
        this.x += this.speeedX;
        this.y += this.speeedY;
        if(this.size>0.2){      //shrinking the size of particles
            this.size-= 0.1;
        }
    }
    draw(){
        ctx.fillStyle= this.color;
        // ctx.strokeStyle= "red";
       // ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2); //x coordinate, y, start angle, end angle in radians(degree).
        ctx.fill();
    }
    
}

function init(){
       for(let i= 0; i<10; i++){   
        particlsArr.push(new Particle()); //new Particle creates  a new blank obj and assing values &properties defined in constructor 100times;
        console.log(particlsArr);
       }
}
init();
function handleParticls(){
    for(let j= 0; j< particlsArr.length; j++){  //itrating the array form line 87;
        particlsArr[j].update();
        particlsArr[j].draw();
       if(particlsArr[j].size <= 0.3){
        particlsArr.splice(j, 1);
        console.log(particlsArr.length)
        j--;
       }
    }
}
function animate(){
   // ctx.clearRect(0,0, canvas.width, canvas.height); // remove(clear) the old circles
    //drawCircle();
    ctx.fillStyle = "rgba(0,0,0,0.02)"
    ctx.fillRect(0,0, canvas.width, canvas.height)
    handleParticls();
    hue+=5;
    requestAnimationFrame(animate);
}
animate();

