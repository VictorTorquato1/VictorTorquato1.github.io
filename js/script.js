const checkboxes = document.querySelectorAll("input[type='checkbox']")

checkboxes.forEach((box, index) => {

    const saved = localStorage.getItem("satchel_checkbox_" + index)

    if (saved === "true") {
        box.checked = true
    }

    box.addEventListener("change", () => {

        localStorage.setItem("satchel_checkbox_" + index, box.checked)

        updateProgress()

        checkLegendUnlock()

    })

})


function updateProgress() {

    const boxes = document.querySelectorAll("input[type='checkbox']")
    const total = boxes.length

    let checked = 0

    boxes.forEach(box => {
        if (box.checked) checked++
    })

    const percent = (checked / total) * 100

    const bar = document.getElementById("progressFill")

    bar.style.width = percent + "%"

    document.getElementById("progressText").innerText =
        checked + " / " + total + " materials"

    bar.classList.remove("progressEarly", "progressMid", "progressDone")

    if (checked < 18) {
        bar.classList.add("progressEarly")
    }

    else if (checked < 21) {
        bar.classList.add("progressMid")
    }

    else {
        bar.classList.add("progressDone")
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



document.getElementById("resetProgress").addEventListener("click", () => {

    localStorage.clear()

    location.reload()

})


updateProgress()
checkLegendUnlock()