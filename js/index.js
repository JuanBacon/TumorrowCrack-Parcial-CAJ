const vid = document.getElementById("video")
const elem = document.getElementById("myBar");
let percent = checkpercent();
let checked = 0;
function videoHover() {  
   vid.play(); 
}
function videoHide() {
    vid.pause(); 
}

function updateTest(){
    percent = checkpercent();
    move()
}

function checkpercent(){
    let checks = document.querySelectorAll('input[type="radio"]:checked').length
    return checks*10;
}

function move() {
        elem.style.width = percent + "%";
        elem.innerHTML = percent + "%";
}