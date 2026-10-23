const palette = document.getElementById("palette");
const generateBtn = document.getElementById("generateBtn");
const toast = document.getElementById("toast");

let toastTimer;

const colorNames = [
    "Dreamy Pink",
    "Ocean Blue",
    "Lavender Love",
    "Minty Fresh",
    "Sunshine Yellow",
    "Peachy Glow",
    "Berry Crush",
    "Soft Lilac",
    "Coral Kiss",
    "Sky Dreams"
];

function generateRandomColor() {
    const randomNumber = Math.floor(Math.random() * 16777216);

    return "#" + randomNumber.toString(16).padStart(6, "0")
        .toUpperCase();
}

function generatePalette() {
    palette.innerHTML = "";

    for (let i = 0; i < 5; i++) {
        const color = generateRandomColor();

        const card = document.createElement("div");
        card.className = "color-card";
        card.tabIndex = 0;
        card.setAttribute("role", "button");
        card.setAttribute("aria-label", `Copy color ${color}`);

        card.innerHTML = `
            <div class="color-box" style="background-color: ${color}">
                <span class="copy-icon" aria-hidden="true">📋</span>
            </div>

            <div class="color-info">
                <p class="hex-code">${color}</p>
                <p class="color-name">${colorNames[
                    Math.floor(Math.random() * colorNames.length)
                ]}</p>
            </div>
        `;

        card.addEventListener("click", () => {
            copyColor(color);
        });

        card.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                copyColor(color);
            }
        });

        palette.appendChild(card);
    }
}

async function copyColor(color) {
    try {
        await navigator.clipboard.writeText(color);
        showToast(`✨ ${color} copied to clipboard!`);
    } catch (error) {
        showToast("Oops! Copy wasn't available. Try localhost.");
    }
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}
generateBtn.addEventListener("click", generatePalette);
generatePalette();