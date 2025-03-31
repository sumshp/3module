document.addEventListener("DOMContentLoaded", () => {
  // плашки закрывашки)) РАБОТАЮТ
  document.querySelectorAll('[class$="_krestik"]').forEach((krestik) => {
    krestik.addEventListener("click", function () {
      const plashka = this.closest("div[class]");

      if (!plashka) {
        console.error("Не найдена родительская плашка для:", this);
        return;
      }

      console.log("Скрываем:", plashka.className);

      plashka.classList.add("hide");

      setTimeout(() => {
        console.log("Показываем:", plashka.className);
        plashka.classList.remove("hide");
      }, 5000);
    });
  });

  // тарифы работают НЕ ТРОГАТЬ
  const tarif1 = document.querySelector(".tarif_1");
  const tarifDescription = document.querySelector(".tarif_description");
  const tarif2 = document.querySelector(".tarif_2");
  const tarif2Description = document.querySelector(".tarif2_description");
  const tarif3 = document.querySelector(".tarif_3");
  const tarif3Description = document.querySelector(".tarif3_description");

  console.log("Tarif1:", tarif1);
  console.log("TarifDescription:", tarifDescription);
  console.log("Tarif2:", tarif2);
  console.log("Tarif2Description:", tarif2Description);
  console.log("Tarif3:", tarif3);
  console.log("Tarif3Description:", tarif3Description);

  // первый тариф
  if (tarif1 && tarifDescription) {
    tarif1.onclick = function () {
      console.log("Tarif1 clicked!");
      if (this.classList.contains("active")) {
        resetAllTarifs();
      } else {
        resetAllTarifs();
        this.classList.add("active");
        tarifDescription.style.display = "block";
      }
    };
  }

  // второй тариф
  if (tarif2 && tarif2Description) {
    tarif2.onclick = function () {
      console.log("Tarif2 clicked!");
      if (this.classList.contains("active")) {
        resetAllTarifs();
      } else {
        resetAllTarifs();
        this.classList.add("active");
        tarif2Description.style.display = "block";
      }
    };
  }

  // третий тариф
  if (tarif3 && tarif3Description) {
    tarif3.onclick = function () {
      console.log("Tarif3 clicked!");
      if (this.classList.contains("active")) {
        resetAllTarifs();
      } else {
        resetAllTarifs();
        this.classList.add("active");
        tarif3Description.style.display = "block";
      }
    };
  }
  // сброс
  function resetAllTarifs() {
    if (tarif1) {
      tarif1.classList.remove("active");
      if (tarifDescription) {
        tarifDescription.style.display = "none";
      }
    }

    if (tarif2) {
      tarif2.classList.remove("active");
      if (tarif2Description) {
        tarif2Description.style.display = "none";
      }
    }

    if (tarif3) {
      tarif3.classList.remove("active");
      if (tarif3Description) {
        tarif3Description.style.display = "none";
      }
    }
  }

  // стикеры и их перетаскивание слава богу работает
  document.querySelectorAll(".draggable-sticker").forEach(dragElement);

  function dragElement(element) {
    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    let isDragging = false;

    element.addEventListener("mousedown", dragMouseDown);

    element.addEventListener("touchstart", dragTouchDown, { passive: false });
    element.addEventListener("touchmove", dragTouchMove, { passive: false });
    element.addEventListener("touchend", closeDragElement);

    function dragMouseDown(e) {
      e.preventDefault();
      startDrag(e.clientX, e.clientY);
    }

    function dragTouchDown(e) {
      e.preventDefault();
      const touch = e.touches[0];
      startDrag(touch.clientX, touch.clientY);
    }

    function startDrag(clientX, clientY) {
      pos3 = clientX;
      pos4 = clientY;
      isDragging = true;
      document.addEventListener("mouseup", closeDragElement);
      document.addEventListener("mousemove", elementDrag);
      element.classList.add("dragging");

      if (!element.style.position || element.style.position === "static") {
        element.style.position = "absolute";
      }
    }

    function elementDrag(e) {
      if (!isDragging) return;
      e.preventDefault();

      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);

      if (!clientX || !clientY) return;

      pos1 = pos3 - clientX;
      pos2 = pos4 - clientY;
      pos3 = clientX;
      pos4 = clientY;

      element.style.top = element.offsetTop - pos2 + "px";
      element.style.left = element.offsetLeft - pos1 + "px";
    }

    function dragTouchMove(e) {
      if (e.touches.length > 1) return;
      elementDrag(e);
    }

    function closeDragElement() {
      isDragging = false;
      document.removeEventListener("mouseup", closeDragElement);
      document.removeEventListener("mousemove", elementDrag);
      element.classList.remove("dragging");
    }
  }

  // забавный диалог в конце
  const altTexts = {
    replika_1: "ты пойдешь <br> со мной в блюз?",
    replika_2: "я тебя не слышу, <br> мы под водой",
  };

  const origTexts = {
    replika_1: "блрбрбрлблв <br> брвблрбблрв",
    replika_2: "бульблблаббвр <br> буларлблбл",
  };

  let isReplika1Original = true;
  let isReplika2Original = true;

  document.querySelector(".replika_1").addEventListener("click", function () {
    const el = this;
    el.classList.add("replika-hidden");

    setTimeout(() => {
      el.innerHTML = isReplika1Original
        ? altTexts.replika_1
        : origTexts.replika_1;
      isReplika1Original = !isReplika1Original;
      el.classList.remove("replika-hidden");
    }, 300);
  });

  document.querySelector(".replika_2").addEventListener("click", function () {
    const el = this;
    el.classList.add("replika-hidden");

    setTimeout(() => {
      el.innerHTML = isReplika2Original
        ? altTexts.replika_2
        : origTexts.replika_2;
      isReplika2Original = !isReplika2Original;
      el.classList.remove("replika-hidden");
    }, 300);
  });

  // че то там для печатания текста
  document
    .querySelector(".plashka_accent")
    .addEventListener("click", function () {
      this.focus();
    });

  // рисовашки ляляля
  const canvas = document.getElementById("drawing-canvas");
  const ctx = canvas.getContext("2d");
  let isDrawing = false;

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mouseout", stopDrawing);

  canvas.addEventListener("touchstart", handleTouch);
  canvas.addEventListener("touchmove", handleTouch);
  canvas.addEventListener("touchend", stopDrawing);

  function startDrawing(e) {
    isDrawing = true;
    draw(e);
  }

  function draw(e) {
    if (!isDrawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
  }

  function handleTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent(
      e.type === "touchstart" ? "mousedown" : "mousemove",
      {
        clientX: touch.clientX,
        clientY: touch.clientY,
      }
    );
    canvas.dispatchEvent(mouseEvent);
  }
});

ъ;
