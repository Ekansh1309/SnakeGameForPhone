// Game constants and variables
let inputDir={x:0,y:0};
let foodsound=new Audio('./material/eating.mp3')
let gameoversound= new Audio('./material/gameover.mp3');
let movesound= new Audio('./material/movesound.mp3')
let musicsound= new Audio('./material/musicsound.mp3');
let speed=5;

let score=0;
let lastPaintTime=0;
let snakeArr= [
    {x:13, y:15}
]
let food={x:6, y:7}

// Funtions
function main(ctime){
    window.requestAnimationFrame(main)
    // console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime=ctime
    gameEngine()
}

function isCollide(snake){
    // if you hit yourself
    for(let i=1;i<snakeArr.length;i++){
        if(snake[i].x === snake[0].x  &&  snake[i].y === snake[0].y){
            return true;
        }
    }

    // wall collide
    if(snake[0].x >=19 || snake[0].x <=0  ||  snake[0].y >=19 || snake[0].y <=0){
        return true;
    }
    return false
}

function gameEngine(){

    // updating the snake array
    if(isCollide(snakeArr)){
        gameoversound.play()
        musicsound.pause()
        inputDir={x:0,y:0}
        alert("Game Over, Press any key to play again!")
        snakeArr=[{x:13,y:15}]
        score=0;
        cnt=0;
        scoreBox.innerHTML="Score: "+0;
    }

    //if you have eaten food, increase the score and regenerate the food
    if(snakeArr[0].y === food.y   &&   snakeArr[0].x === food.x){
        foodsound.play()
        score++;
        if(score>hiscoreval){
            hiscoreval=score
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
            hiscoreBox.innerHTML="High Score: "+hiscoreval
        }
        scoreBox.innerHTML="Score: "+score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y})
        let a=1;
        let b=18;
        food={x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random()) }
    }

    // Moving the snake
    for(let i=snakeArr.length-2;i>=0;i--){
        // const element=array[i];
        snakeArr[i+1]={...snakeArr[i]}
    }

    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;

    // Display snake and food

    // display snake
    board.innerHTML=""
    snakeArr.forEach((e,index)=>{
        snakeElement= document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index=== 0){
            snakeElement.classList.add('head')
        }
        else{
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement)
    })
    
    // display food
    foodElement= document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement)
}

// main logic

// musicsound.play()
let hiscore= localStorage.getItem("hiscore")
if(hiscore === null){
    hiscoreval=0
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval= JSON.parse(hiscore);
    hiscoreBox.innerHTML="High Score: "+hiscore 
}

let cnt=0;   // for sound

window.requestAnimationFrame(main);
// window.addEventListener('keydown',(e)=>{
//     inputDir={x:-1,y:0} // start the game
//     movesound.play()
//     if(cnt === 0){
//         musicsound.play();
//     }
//     cnt++;
//     switch (e.key) {
//         case "ArrowUp":
//             inputDir.x=0;
//             inputDir.y=-1;
//             console.log("ArrowUp")
//             break;

//         case "ArrowDown":
//             inputDir.x=0;
//             inputDir.y=1;
//             console.log("ArrowDown")
//             break;

//         case "ArrowRight":
//             inputDir.x=1;
//             inputDir.y=0;
//             console.log("ArrowRight")
//             break;

//         case "ArrowLeft":
//             inputDir.x=-1;
//             inputDir.y=0;
//             console.log("ArrowLeft")
//             break;
    
//         default:
//             break;
//     }
// })

// Variables to track swipe gestures
let startX = 0;
let startY = 0;

window.addEventListener('keydown', (e) => {
  handleInput(e.key);
});

window.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});

window.addEventListener('touchmove', (e) => {
  e.preventDefault();
});

window.addEventListener('touchend', (e) => {
  const endX = e.changedTouches[0].clientX;
  const endY = e.changedTouches[0].clientY;
  
  handleSwipe(endX - startX, endY - startY);
});

function handleInput(key) {
  inputDir = { x: -1, y: 0 };
  movesound.play();
  
  if (cnt === 0) {
    musicsound.play();
  }
  
  cnt++;
  
  switch (key) {
    case "ArrowUp":
      inputDir.x = 0;
      inputDir.y = -1;
      console.log("ArrowUp");
      break;
    case "ArrowDown":
      inputDir.x = 0;
      inputDir.y = 1;
      console.log("ArrowDown");
      break;
    case "ArrowRight":
      inputDir.x = 1;
      inputDir.y = 0;
      console.log("ArrowRight");
      break;
    case "ArrowLeft":
      inputDir.x = -1;
      inputDir.y = 0;
      console.log("ArrowLeft");
      break;
    default:
      break;
  }
}

function handleSwipe(deltaX, deltaY) {
  const threshold = 50; // Minimum distance to consider as a swipe
  
  if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
    if (deltaX > 0) {
      handleInput("ArrowRight");
    } else {
      handleInput("ArrowLeft");
    }
  } else if (Math.abs(deltaY) > threshold) {
    if (deltaY > 0) {
      handleInput("ArrowDown");
    } else {
      handleInput("ArrowUp");
    }
  }
}
