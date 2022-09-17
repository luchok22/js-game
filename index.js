let $start = document.querySelector("#start")
let $game = document.querySelector("#game")
let $time = document.querySelector("#time")
let $game_time = document.querySelector("#game-time")
let $timeheader = document.querySelector("#time-header")
let $resultheader = document.querySelector("#result-header")
let $result = document.querySelector("#result")
let $userName = document.querySelector("#userName")
let $welcome = document.querySelector(".welcome")
let $app = document.querySelector(".app")
let $apprating = document.querySelector(".app_rating")
let score = 0


let color1 = Math.round(Math.random() * 254 + 0)
let color2 = Math.round(Math.random() * 254 + 0)
let color3 = Math.round(Math.random() * 254 + 0)

let withd1 = Math.round(Math.random() * 100 + 0)
let withd2 = Math.round(Math.random() * 100 + 30)
let withd3 = Math.round(Math.random() * 100 + 30)
$start.addEventListener("click", start)
function start(){
    score = 0
    $resultheader.classList.add("hide")
    $timeheader.classList.remove("hide")
    $game.style.backgroundColor = "white"
    $start.classList.add("hide")
    setupLocal()
    setTime()
    creatBox()
    timer()
    $game_time.setAttribute("disabled", "true")
}
$game.addEventListener("click", clickedBox)
function clickedBox(event){
     if(event.target.dataset.box){
        creatBox()
        score++
     }
}



function creatBox(){
    $game.innerHTML = ""
    let box = document.createElement("div")
    let size = getRandom(30,100)
    let top = getRandom(0, 300 - size)
    let left = getRandom(0,300 - size)
    let right = getRandom(0,300 - size)
    

    box.style.width = box.style.height = size + "px"
    box.style.backgroundColor =  `rgb(${getRandom(0,255)},${getRandom(0,255)},${getRandom(0,254)})`
    box.style.position = "absolute"
    box.style.top = top + "px"
    box.style.left = left + "px"
    box.style.right = right + "px"
    box.setAttribute("data-box", true)
    box.style.cursor = "pointer"
    $game.insertAdjacentElement("afterbegin", box)
}
function timer(){
    let interval = setInterval(function(){
        $time.textContent = (Number($time.textContent) - 0.1).toFixed(1)
        if($time.textContent <= "0.0"){
            clearInterval(interval)
            endGame()
        }
    }, 100)
}
function endGame(){
    $game.style.backgroundColor = "#ccc"
    $start.classList.remove("hide")
    $game.innerHTML = ""
    $result.textContent = score
    $resultheader.classList.remove("hide")
    $timeheader.classList.add("hide")
    $game_time.removeAttribute("disabled")
    rating()
}
function getRandom(min, max){
return Math.ceil(Math.random() * (max-min) + min)
}

$game_time.addEventListener("change", setTime)
function setTime(){
    $time.textContent = $game_time.value
    $resultheader.classList.add("hide")
    $timeheader.classList.remove("hide")
}
$userName.addEventListener('change', function(){
    $welcome.classList.add("hide")
    $app.classList.remove("hide")
})


function rating(){
    let list = JSON.parse(localStorage.getItem("listOfUsers"))
    list.push({name: $userName.value, score: score})
    localStorage.setItem("listOfUsers", JSON.stringify(list))
    list.sort((a,b) => b.score - a.score)
    $apprating.innerHTML = ""
    list.forEach(function(elem, item){
        if(item >= 10){
            return
        }
        $apprating.insertAdjacentHTML("beforeend", `
        <div class=="user">
        ${elem.name}
        --
        ${elem.score}
        </div> 
 `) 
    });
}
function setupLocal(){
    localStorage.setItem("listOfUsers", JSON.stringify([]))
}