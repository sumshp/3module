document.addEventListener("DOMContentLoaded", function () {
  // ------------------------ СВОРОВАННЫЙ КОД ДЛЯ ДВИГАЮЩЕГОСЯ ФОНА
  //   $("body").mousemove(function (event) {
  //     $(document).mousemove(function (e) {
  //       $(".moveback1, .moveback1port").css({
  //         left: 10 - e.pageX / 9,
  //         top: 10 - e.pageY / 9,
  //       });
  //       $(".moveback2, .moveback2port").css({
  //         left: 25 - e.pageX / 6,
  //         top: 25 - e.pageY / 6,
  //       });
  //       $(".moveback3").css({
  //         left: 50 - e.pageX - 20 / 3,
  //         top: 50 - e.pageY - 20 / 3,
  //       });
  //     });
  //   });
  // -------------------------- СВОРОВАННЫЙ КОД ДЛЯ ДВИГАТЕЛЬНЫХ ЭЛЕМЕНТОВ
  dragElement(document.getElementById("mydiv"));
  function dragElement(elmnt) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      // if present, the header is where you move the DIV from:
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }
    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
});
