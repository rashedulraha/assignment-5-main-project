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

//! Handle call button clicks
document.querySelectorAll(".call-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    // Check if user has enough coins
    if (coinsCount >= 20) {
      // Deduct coins
      coinsCount -= 20;
      coinsCounter.textContent = coinsCount;

      // Get service details
      const card = this.closest(".bg-white");
      const serviceName = card.querySelector(".service-name").textContent;
      const serviceNumber = card.querySelector(".service-number").textContent;

      // Add to call history
      const now = new Date();
      const timeString = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const dateString = now.toLocaleDateString();

      const callRecord = {
        service: serviceName,
        number: serviceNumber,
        time: timeString,
        date: dateString,
        id: Date.now(),
      };

      callHistory.unshift(callRecord);

      //? Keep only last 10 calls
      if (callHistory.length > 10) {
        callHistory = callHistory.slice(0, 10);
      }

      // ?Save to localStorage
      localStorage.setItem("callHistory", JSON.stringify(callHistory));

      //? Update call history display
      updateCallHistory();

      // ?Show success message
      showNotification(
        `Call made to ${serviceName} (${serviceNumber})`,
        "success"
      );
    } else {
      //? Show error message
      showNotification(
        "Not enough coins! You need 20 coins to make a call.",
        "error"
      );
    }
  });
});

// ?Handle copy button clicks
document.querySelectorAll(".copy-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    // Get service number
    const card = this.closest(".bg-white");
    const serviceNumber = card.querySelector(".service-number").textContent;

    // Copy to clipboard
    navigator.clipboard
      .writeText(serviceNumber)
      .then(() => {
        // Increment copy counter
        copyCount++;
        copyCounter.textContent = copyCount;

        // Show success message
        showNotification(
          `Number ${serviceNumber} copied to clipboard!`,
          "success"
        );
      })
      .catch((err) => {
        // Show error message
        showNotification("Failed to copy number", "error");
      });
  });
});
