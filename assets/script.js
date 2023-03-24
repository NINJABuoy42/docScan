const d = document.getElementsByClassName("draggable");
let video=document.getElementById('video');
if (navigator.mediaDevices || navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
    video.srcObject = stream;
    video.play();
  });
}
document.getElementById("video").addEventListener("click",()=>{
  document.getElementById("controls").classList.toggle("show");
})

/*************************************************************************************/

// logic for controls i.e. zoom rotate
let rotate = 0;
let zoom=1
let slider = document.getElementById("slideZoom");
document.getElementById("main").addEventListener('click',()=>{
  rotate = 0;
  zoom = 1;
  video.style.transform=`rotate(${rotate}deg) scale(${zoom})`;
  slider.value=50;
})


// takes the value from the slider and adjust the transform: sclale css property.
slider.oninput = function(){
  zoom = this.value / 50;
  video.style.transform = `rotate(${rotate}deg) scale(${zoom})`;
  
}
//listens for the event and adjust the rotation according to the buttons clicked
document.getElementById("rotateR").addEventListener("click",()=>{
  rotate = rotate + 90;
  video.style.transform = `rotate(${rotate}deg) scale(${zoom})`;
})
document.getElementById("rotateL").addEventListener("click",()=>{
  rotate = rotate - 90
  video.style.transform = `rotate(${rotate}deg) scale(${zoom})`;
})
/*************************************************************************************/

// logic for draging div
for (let i = 0; i < d.length; i++) {
  d[i].style.position = "relative";
}
function filter(e) {
  let target = e.target;
  if (!target.classList.contains("draggable")) {
    return;
  }
  target.moving = true;
  //Checks if Mouse events exist on users' device
  if (e.clientX) {
    target.oldX = e.clientX; // If they exist then use Mouse input
    target.oldY = e.clientY;
  } else {
    target.oldX = e.touches[0].clientX; // Otherwise use touch input
    target.oldY = e.touches[0].clientY;
  }
  //Since there can be multiple touches, you need to mention which touch to look for, we are using the first touch only in this case
  target.oldLeft =
    window.getComputedStyle(target).getPropertyValue("left").split("px")[0] * 1;
    target.oldTop =
    window.getComputedStyle(target).getPropertyValue("top").split("px")[0] * 1;
    document.onmousemove = drag;
    document.ontouchmove = drag;
    function drag(event) {
      // event.preventDefault();
      if (!target.moving) {
        return;
      }

      if (event.clientX) {
        target.distX = event.clientX - target.oldX;
        target.distY = event.clientY - target.oldY;
      } else {
        target.distX = event.touches[0].clientX - target.oldX;
        target.distY = event.touches[0].clientY - target.oldY;
      }

      target.style.left = target.oldLeft + target.distX + "px";
      target.style.top = target.oldTop + target.distY + "px";
    }
    function endDrag() {
      target.moving = false;
    }
    target.onmouseup = endDrag;
    target.ontouchend = endDrag;
  }
  document.onmousedown = filter;
  document.ontouchstart = filter;
  /*************************************************************************************/
  
  