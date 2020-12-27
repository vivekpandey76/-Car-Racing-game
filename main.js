const score=document.querySelector('.score');
const startScreen=document.querySelector(".startScreen");
const gameArea=document.querySelector(".gameArea");
let keys={
    ArrowUp:false,
    ArrowDown:false,
    ArrowLeft:false,
    ArrowRight:false,
}
let player={
    speed:5,
    score:0

}
//Start Of the game
startScreen.addEventListener('click',start)
document.addEventListener('keydown', keyDown);    //Keydown function when we entr something in keypad it get keydown
document.addEventListener('keyup',keyUp)
function keyDown(e){
    e.preventDefault();
    keys[e.key]=true;                    //we are doing are arrowup key true so that is doesnt remain constant true in object
    // console.log(e.key);
    // console.log(keys);
} 
function keyUp(e){
        e.preventDefault();
        keys[e.key]=false;
        // console.log(e.key);
}
//If user click on start button the game will start
function start(){
    gameArea.innerText="";
    startScreen.classList.add('hide');    //Give hide classs to startScreen 
    player.start=true;
    player.score=0;
    
    window.requestAnimationFrame(gamePlay);   //It will repeat again and again like loop
    for(let i=0;i<5;i++){                                 //loops for 5 line strip in road
        let roadline=document.createElement('div');
        roadline.setAttribute('class','lines');
        roadline.y=(i*150);
        roadline.style.top=roadline.y+"px";
        gameArea.appendChild(roadline);
    }
    let car=document.createElement('div');  //we create div element using DOM element
    car.setAttribute('class','car');        //we add class in div
    // car.innerText="Hey car" 
    for(let i=0;i<3;i++){                                 //loops for 5 line strip in road
        let enemyCar=document.createElement('div');
        enemyCar.setAttribute('class','enemy');
        enemyCar.y=(((i+1)*350)*-1);
        enemyCar.style.top=enemyCar.y+"px";
        enemyCar.style.backgroundImage=randomImage();
        enemyCar.style.left=Math.floor(Math.random()*350)+ "px";            //random position to car from left so car will seen randomly not constant
        gameArea.appendChild(enemyCar);
    }
    gameArea.appendChild(car);                 //we put our created div in gamearea div
    player.x=car.offsetLeft;
    player.y=car.offsetTop;  
    console.log(player);           
}
function randomImage(){
    let img=Math.round(Math.random()*3)+1;
    console.log(img);
    return(`url(white${img}.png)`);
}
//If car collide then this function will run
function isCollide(a,b){
    aRect=a.getBoundingClientRect();                     //Is used to get exact location of all side 
    bRect=b.getBoundingClientRect();           //Enemy CAr
    return!((aRect.bottom < bRect.top)||(aRect.top>bRect.bottom)||(aRect.left>bRect.right)||(aRect.right<bRect.left));
}
//Road white lines
function moveLines(){
    let lines=document.querySelectorAll('.lines');    //queryselector all because we have to move all lines 
    lines.forEach(function(item){
        if(item.y>=700){
            item.y-=750;                               //We minus origianl y length to 750 so we get minus and line start again from train and this loops will continue 
        }
        item.y +=player.speed;
        item.style.top=item.y+"px";
    })
        
            
}
//Enemy car random movement
function moveEnemy(car){
    let enemy=document.querySelectorAll('.enemy');    //queryselector all because we have to move all lines 
    enemy.forEach(function(item){
        if(isCollide(car,item)){
            console.log("Collision")
            endGame()
        }
        if(item.y>=750){
            item.y=-300;                               //We minus origianl y length to 750 so we get minus and line start again from train and this loops will continue    
            item.style.left=Math.floor(Math.random()*350)+ "px"; 
        }
        item.y +=player.speed;
        item.style.top=item.y+"px";
        
    })
        
            
}
function endGame(){
    player.start=false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML=`Game Over!<br>Your Score is ${player.score+1}.<br>Click to Play again<br>`                         //We intialoze the game to end false we car collide
}

function gamePlay(){
    let car=document.querySelector('.car')      //car div so we apply our if condition in this by editing its style property
    let road=gameArea.getBoundingClientRect();
    if(player.start){
        moveLines();
        moveEnemy(car);
        // console.log(road)
        if(keys.ArrowUp && player.y>70){player.y -= player.speed}              //Here player.y>70 is given so that user get enough space for seeing the coming car
        if(keys.ArrowDown && player.y<(road.bottom-85)){player.y +=player.speed}  //70 his height of the car that why we minus so our car will not get outside the road
        if(keys.ArrowLeft && player.x>0){player.x -= player.speed}
        if(keys.ArrowRight && player.x<(road.width-50)){player.x += player.speed}
        car.style.top=player.y+"px";
        car.style.left=player.x+"px";
        window.requestAnimationFrame(gamePlay);
        player.score++;
        score.innerText="Score:"+player.score;
    }
}
