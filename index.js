//document.body.style.backgroundColor="red";
const startScreen=document.querySelector(".startScreen");
const road=document.querySelector('.road');
const score=document.querySelector(".scoreCard");
let keys={ ArrowUp:false, ArrowDown:false, ArrowLeft:false, ArrowRight:false};
let player={ };
player.speed=5;
player.score=0;
const colors = ['pink', 'coral', 'gold', 'purple', 'green','crimson','brown','black','indigo','lime','beige','DeepPink','LawnGreen','Magenta','SpringGreen'];
document.addEventListener('keydown', keyDirect);
document.addEventListener('keyup',keyup);
//console.log(keys);
function keyDirect(e){
    keys[e.key]=true;  
}
function keyup(e){
    keys[e.key]=false;
    //console.log(keys);
}

function collide(a,b){
    aProp=a.getBoundingClientRect()
    bProp=b.getBoundingClientRect()
    return !((aProp.top>bProp.bottom) || (aProp.bottom<bProp.top) || (aProp.left>bProp.right) || (aProp.right<bProp.left) )
}
function endGame(){
    player.start=false;
    startScreen.classList.remove("hide");
    startScreen.classList.add("restartScreen")
    finalScore=player.score+1
    startScreen.innerHTML="GAME OVER"+"<br>"+"Your score is "+finalScore+"<br>" +"Click to restart"   
}

function moveLanes(){
    let lanes=document.querySelectorAll(".laneProp");
    //console.log(lanes[0])
    for(let i=0;i<8;i++){
        let obj=lanes[i]
        let objTop=obj.offsetTop
        let laneTop;
        if(objTop>860){
            laneTop=-10
        }
        else{
            laneTop=objTop+(player.speed+3)
        }
        
        obj.style.top=laneTop+"px"
    }
}

function moveCars(car){
    let cars=document.querySelectorAll('.ecarProp');
    for(let i=0;i<3;i++){
        let obj=cars[i];
        //console.log(obj)
        if(collide(car,obj)){
            endGame();
        }
        let objTop=obj.offsetTop
        let carTop
        if(objTop>760){
            carTop=-90
            obj.style.left=Math.floor(Math.random()*320)+"px"
            const randomIndex = Math.floor(Math.random() * colors.length);
            obj.style.backgroundColor=colors[randomIndex]
        }
        else{
            carTop=objTop+(player.speed+6)
        }
        obj.style.top=carTop+"px"
    }
}
startScreen.addEventListener('click',start);



function play(){
    if(player.start){
        let car=document.querySelector(".carProp")
        //console.log(car.getBoundingClientRect())
        moveLanes();
        moveCars(car);

        if(keys.ArrowUp && player.y>50)
        { player.y-= player.speed}
        if(keys.ArrowDown && player.y<678)
        {player.y+=player.speed}
        if(keys.ArrowLeft && player.x>0){
            player.x-=player.speed
        }
        if(keys.ArrowRight && player.x<315){
            player.x+=player.speed
        }
        
        car.style.top=player.y+"px"
        car.style.left=player.x+"px"
    
        
        window.requestAnimationFrame(play);
        player.score++;
        score.innerHTML="Score:"+player.score
    }
    
}
function start(){
    player.start=true;
    player.score=0;
    //road.classList.remove("hide");
    road.innerHTML=""
    startScreen.classList.add("hide");
    //let roadProp=road.getBoundingClientRect();
    //console.log(roadProp);
    let i=-10;
    do{
        
        let lane=document.createElement("div");
        lane.classList.add("laneProp")
        road.appendChild(lane)
        lane.style.top=i+"px"
        i=i+110;
    }
    while(i<=780)

    for(let i=0;i<3;i++){
        let ecar=document.createElement("div")
        ecar.classList.add("ecarProp");
        road.appendChild(ecar)
        ecarTop=(i+1)*274
        ecar.style.top=ecarTop+"px"
        ecar.style.left=Math.floor(Math.random()*200)+"px"
        const randomIndex = Math.floor(Math.random() * colors.length);
        let carColor=colors[randomIndex];
        ecar.style.backgroundColor=carColor
        // let r = Math.floor(Math.random() * 256); // Random between 0-255
        // let g = Math.floor(Math.random() * 256); // Random between 0-255
        // let b = Math.floor(Math.random() * 256); // Random between 0-255
        // let carColor= 'rgb(' + r + ',' + g + ',' + b + ')'    
    }
    window.requestAnimationFrame(play);
// krypto Etox
    let car=document.createElement("div");
    car.classList.add('carProp');
    road.appendChild(car);
    player.x=car.offsetLeft;
    player.y=car.offsetTop;
}
