const STORAGE_PREFIX = "trinket_";

const checkboxes = document.querySelectorAll("input[type='checkbox']")

checkboxes.forEach((box, index) => {

  const saved = localStorage.getItem(STORAGE_PREFIX + "checkbox_" + index)

  if (saved === "true") {
    box.checked = true
  }

  box.addEventListener("change", () => {

    localStorage.setItem(STORAGE_PREFIX + "checkbox_" + index, box.checked)

    updateProgress()

    checkLegendUnlock()

  })

})


function updateProgressGeneric(selector, barId, textId) {

  const boxes = document.querySelectorAll(selector);
  const total = boxes.length;

  let checked = 0;

  boxes.forEach(box => {
    if (box.checked) checked++;
  });

  const percent = (checked / total) * 100;

  const bar = document.getElementById(barId);

  if (!bar) return; // evita erro em páginas sem barra

  bar.style.width = percent + "%";

  const text = document.getElementById(textId);
  if (text) {
    text.innerText = checked + " / " + total;
  }

  // cores da barra (opcional)
  bar.classList.remove("progressEarly", "progressMid", "progressDone");

  if (percent < 50) {
    bar.classList.add("progressEarly");
  } else if (percent < 80) {
    bar.classList.add("progressMid");
  } else {
    bar.classList.add("progressDone");
  }

}



function checkLegendUnlock() {

  const otherBoxes = document.querySelectorAll(
    ".satchel:not(.legend) input[type='checkbox']"
  )

  let allDone = true

  otherBoxes.forEach(box => {
    if (!box.checked) {
      allDone = false
    }
  })

  const legendBoxes = document.querySelectorAll(".legendBox")

  legendBoxes.forEach(box => {
    box.disabled = !allDone
  })

  if (allDone) {

    document.getElementById("legendMessage").innerText =
      "Legend of the East unlocked!"

  } else {

    document.getElementById("legendMessage").innerText =
      "Craft all other satchels to unlock."

  }

}

document.addEventListener("DOMContentLoaded", () => {

  const checkboxes = document.querySelectorAll("input[type='checkbox']");

  checkboxes.forEach((box,index)=>{

    const saved = localStorage.getItem(STORAGE_PREFIX + "checkbox_" + index);

    if(saved==="true"){
      box.checked=true;
    }

    box.addEventListener("change",()=>{

      localStorage.setItem(STORAGE_PREFIX + "checkbox_" + index, box.checked);

      updateProgressGeneric(
        ".trinket input[type='checkbox']",
        "trinketFill",
        "trinketText"
      );

    });

  });

  updateProgressGeneric(
    ".trinket input[type='checkbox']",
    "trinketFill",
    "trinketText"
  );

});

  updateProgress();

  if (typeof checkLegendUnlock === "function") {
    checkLegendUnlock();
  }

document.getElementById("resetProgress").addEventListener("click", () => {

  localStorage.clear()

  location.reload()

})


updateProgressGeneric(
  ".satchel input[type='checkbox']",
  "progressFill",
  "progressText"
);

updateProgressGeneric(
  ".trinket input[type='checkbox']",
  "trinketFill",
  "trinketText"
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js")
      .then((reg) => console.log("Service Worker registrado:", reg))
      .catch((err) => console.log("Erro no Service Worker:", err));
  });
}