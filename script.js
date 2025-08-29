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

// ! Clear call history
clearHistoryBtn.addEventListener("click", function () {
  callHistory = [];
  localStorage.removeItem("callHistory");
  updateCallHistory();
  showNotification("Call history cleared", "success");
});

// Update call history display
function updateCallHistory() {
  if (callHistory.length === 0) {
    emptyHistoryMessage.style.display = "block";
    callHistoryContent.innerHTML = "";
    callHistoryContent.appendChild(emptyHistoryMessage);
  } else {
    emptyHistoryMessage.style.display = "none";

    callHistoryContent.innerHTML = callHistory
      .map(
        (call) => `
            <div class="p-3 bg-gray-50 rounded-lg">
              <div class="flex justify-between items-start">
                <div>
                  <h4 class="font-medium text-gray-900">${call.service}</h4>
                  <p class="text-sm text-gray-500">${call.number}</p>
                </div>
                <div class="text-right">
                  <p class="text-xs text-gray-500">${call.time}</p>
                  <p class="text-xs text-gray-500">${call.date}</p>
                </div>
              </div>
            </div>
          `
      )
      .join("");
  }
}

//! Show notification

function showNotification(message, type) {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white transform transition-transform duration-300 translate-y-20 ${
    type === "success" ? "bg-green-500" : "bg-red-500"
  }`;
  notification.textContent = message;

  // Add to DOM
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.classList.remove("translate-y-20");
  }, 10);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.classList.add("translate-y-20");
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}
// !Initialize call history on page load
updateCallHistory();
