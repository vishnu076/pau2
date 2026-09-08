const openButton = document.getElementById("openLetter");
const overlay = document.getElementById("letterOverlay");
const scene = document.getElementById("envelopeScene");
const letter = document.getElementById("letter");
const closeButton = document.getElementById("closeLetter");
const midnightScreen = document.getElementById("midnightScreen");

function showBirthdayWebsite() {
  midnightScreen.classList.add("hidden");
  document.body.style.overflow = "";
}

// The midnight screen appears first.
// If the visitor opens the site at any time other than exactly 00:00,
// it waits until the next midnight. For testing, add ?previewMidnight=true
// to the URL.
const params = new URLSearchParams(window.location.search);

if (params.get("previewMidnight") === "true") {
  setTimeout(showBirthdayWebsite, 4300);
} else {
  const now = new Date();
  const nextMidnight = new Date(now);
  nextMidnight.setHours(24, 0, 0, 0);
  const delay = nextMidnight.getTime() - now.getTime();

  // If the page is opened within the first 12 seconds after midnight,
  // show the birthday reveal immediately.
  if (now.getHours() === 0 && now.getMinutes() === 0 && now.getSeconds() < 12) {
    setTimeout(showBirthdayWebsite, 4300);
  } else {
    setTimeout(showBirthdayWebsite, delay);
  }
}

openButton.addEventListener("click", () => {
  overlay.classList.add("open");
  overlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  // On phones show the letter immediately for a faster experience.
  if (window.innerWidth <= 700) {
    scene.style.display = "none";
    letter.classList.add("show");
  } else {
    // Keep the envelope animation for larger screens but shorten slightly
    setTimeout(() => {
      scene.style.display = "none";
      letter.classList.add("show");
    }, 1200);
  }
});

closeButton.addEventListener("click", closeLetter);

overlay.addEventListener("click", (event) => {
  if (
    event.target === overlay ||
    event.target.classList.contains("overlay-bg")
  ) {
    closeLetter();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && overlay.classList.contains("open")) {
    closeLetter();
  }
});

function closeLetter() {
  overlay.classList.remove("open");
  overlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  letter.classList.remove("show");

  setTimeout(() => {
    scene.style.display = "";
  }, 400);
}
