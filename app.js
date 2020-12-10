//--------> Buttons DOM <---------

const rulesBtn = document.getElementById("rules-btn");
const closeBtn = document.getElementById("close-btn");
const playBtn = document.getElementById("play-btn");

// --------> DOM <----------

const rulesContainer = document.getElementById("rules-container");
const game = document.getElementById("game");
const canvasContainer = document.getElementById("canvas-container");
const canvas = document.getElementById("canvas");

// ----------> Event Listeners <----------

rulesBtn.addEventListener("click", () => {
  rulesContainer.classList.add("show");
});
closeBtn.addEventListener("click", () => {
  rulesContainer.classList.remove("show");
});
window.addEventListener("click", (e) => {
  if (e.target === rulesContainer) {
    rulesContainer.classList.remove("show");
  }
});
playBtn.addEventListener("click", () => {
  game.classList.add("hide");
  canvasContainer.classList.add("show");
});
