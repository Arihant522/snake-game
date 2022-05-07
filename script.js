let inputDir={
    x:0,
    y:0
};
let snakeArr=[
 {
     x:13,
     y:15,
 }
];
let food={x:13,y: 13};
let score=0;
let lastPaintTime=0;
let speed=0.099;
let scoreincreaser=1;
//game functions
function main(ctime)
{
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000<(speed)){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}

function gameEngine()
{

    
    //part-1 updating the snake array & array
    if(isCollide(snakeArr)){
        inputDir={x:0,y:0};
        alert("GAME OVER!!! ENTER ANY KEY TO RESTART");
        snakeArr=[{x:13,y:15}];
        score=0;
    }
    
    //if the food is eaten then change the location of food and increase the size of snake
    if(snakeArr[0].x===food.x && snakeArr[0].y===food.y)
    {
        score=score+scoreincreaser;
      snakeArr.unshift({x: snakeArr[0].x+inputDir.x,y: snakeArr[0].y + inputDir.y});
      let a=2;
      let b=17;
      foodx=Math.floor(a+(b-a+1)*Math.random());
      foody=Math.floor(a+(b-a+1)*Math.random());
      
      while(true)
      {
        let acceptable=true;
         
          for(let i=0;i<snakeArr.length;i++)
          {
              if(snakeArr[i].x==foodx && snakeArr[i].y==foody)
              {
                    foodx=Math.floor(a+(b-a+1)*Math.random());
              
                    foody=Math.floor(a+(b-a+1)*Math.random());
              }
            
          }
          for(let i=0;i<snakeArr.length;i++)
          {
              if(snakeArr[i].x==foodx && snakeArr[i].y==foody)
               acceptable=false;
          }
          if(acceptable==true)
          break;
      }
      food={
          x:foodx,
          y:foody
      }
    
      scoreBox.innerHTML="SCORE:"+score;
    } 

    //Moving the snake
    for(let i=snakeArr.length-2;i>=0;i--)
    {
        snakeArr[i+1]={...snakeArr[i]};
    }
     snakeArr[0].x+=inputDir.x;
     snakeArr[0].y+=inputDir.y;
    // part-2 display the snake and food
    //snake display
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement("div");
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index===0)
        {
        snakeElement.classList.add("head");
        }
        else
        {
        snakeElement.classList.add("snakebody");
        }
        board.appendChild(snakeElement);
    })

    //food display
        
        foodElement=document.createElement("div");
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add("food");
        board.appendChild(foodElement);
                                                         
}



//game logic starts
window.requestAnimationFrame(main);
// if the snake collide with itself or the boundary
function isCollide(snake)
{
  for(let i=1;i<snake.length;i++)
  {
      if(snake[i].x===snake[0].x && snake[i].y===snake[0].y)
      return true;
  }
  if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0)
  return true;
}
window.addEventListener("keydown",e=>{
   inputDir={x:0,y:0}
   switch(e.key)
   {
       case "ArrowUp":
          inputDir.x=0;
          inputDir.y=-1;
          break;
       case "ArrowDown":
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
            inputDir.x=1;
            inputDir.y=0;
            break;
        default:
            break;
   }
});
