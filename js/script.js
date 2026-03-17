document.addEventListener("DOMContentLoaded", () => {

    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");

    checkboxes.forEach(cb => {
        const saved = localStorage.getItem(cb.id);
        if (saved === "true") {
            cb.checked = true;
        }

        cb.addEventListener("change", () => {
            localStorage.setItem(cb.id, cb.checked);
            updateProgress();
        });
    });

    function updateProgress() {
        const total = checkboxes.length;
        const checked = document.querySelectorAll("input[type='checkbox']:checked").length;

        const percent = total === 0 ? 0 : (checked / total) * 100;

        if (progressBar) progressBar.style.width = percent + "%";
        if (progressText) {
            progressText.textContent = `${checked} / ${total} (${percent.toFixed(0)}%)`;
        }
    }

    updateProgress();

});