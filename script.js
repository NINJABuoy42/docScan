const d = document.getElementsByClassName("draggable");
let video=document.getElementById('video');
if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
    video.srcObject = stream;
    video.play();
  });
}
let rotate = 0;
let zoom=0
document.getElementById('slideZoom').oninput = function(){
  zoom = this.value / 50;
video.style.transform="scale("+zoom+") rotate("+rotate+"deg)";
}
document.getElementById("video").addEventListener("click",()=>{
  document.getElementById("controls").classList.toggle("show");
})
document.getElementById("rotateR").addEventListener("click",()=>{
  rotate = rotate + 90;
  video.style.transform += "scale(" + zoom + ") rotate(" + rotate + "deg)";
})
document.getElementById("rotateL").addEventListener("click",()=>{
  rotate = rotate - 90
  video.style.transform += "scale(" + zoom  + ") rotate(" + rotate + "deg)";
})
for (let i = 0; i < d.length; i++) {
  d[i].style.position = "relative";
}
function filter(e) {
  let target = e.target;
  if (!target.classList.contains("draggable")) {
    return;
  }
  target.moving = true;
  //NOTICE THIS 👇 Check if Mouse events exist on users' device
  if (e.clientX) {
    target.oldX = e.clientX; // If they exist then use Mouse input
    target.oldY = e.clientY;
  } else {
    target.oldX = e.touches[0].clientX; // Otherwise use touch input
    target.oldY = e.touches[0].clientY;
  }
  //NOTICE THIS 👆 Since there can be multiple touches, you need to mention which touch to look for, we are using the first touch only in this case
  target.oldLeft =
    window.getComputedStyle(target).getPropertyValue("left").split("px")[0] * 1;
  target.oldTop =
    window.getComputedStyle(target).getPropertyValue("top").split("px")[0] * 1;
  document.onmousemove = drag;
  //NOTICE THIS 👇
  document.ontouchmove = drag;
  //NOTICE THIS 👆
  function drag(event) {
    // event.preventDefault();
    if (!target.moving) {
      return;
    }
    //NOTICE THIS 👇
    if (event.clientX) {
      target.distX = event.clientX - target.oldX;
      target.distY = event.clientY - target.oldY;
    } else {
      target.distX = event.touches[0].clientX - target.oldX;
      target.distY = event.touches[0].clientY - target.oldY;
    }
    //NOTICE THIS 👆
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

