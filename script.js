// ?Initialize variables
let heartsCount = 0;
let coinsCount = 100;
let copyCount = 0;
let callHistory = JSON.parse(localStorage.getItem("callHistory")) || [];

//! DOM elements
const heartsIncrement = document.getElementById("hearts-increment");
const coinsCounter = document.getElementById("coins-count");
const copyCounter = document.getElementById("copy-count");
const callHistoryContent = document.getElementById("Call-History-Content");
const emptyHistoryMessage = document.getElementById("empty-history-message");
const clearHistoryBtn = document.getElementById("clear-history-btn");

// ! Update hearts counter
document.querySelectorAll(".heart-icon").forEach((heart) => {
  heart.addEventListener("click", function () {
    heartsCount++;
    heartsIncrement.textContent = heartsCount;

    // Toggle heart icon
    this.classList.toggle("fa-regular");
    this.classList.toggle("fa-solid");
    this.classList.toggle("text-red-500");
  });
});
