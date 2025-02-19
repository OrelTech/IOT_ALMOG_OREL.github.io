const firebaseConfig = {
  apiKey: "AIzaSyB7LG7nXIFRi5u0mqkLBZHrOj4NybHCRkc",
  authDomain: "test-44a46.firebaseapp.com",
  databaseURL: "https://test-44a46-default-rtdb.firebaseio.com",
  projectId: "test-44a46",
  storageBucket: "test-44a46.firebasestorage.app",
  messagingSenderId: "845443458531",
  appId: "1:845443458531:web:ecb0df5448e5bd8f522cd6"
};

const app = firebase.initializeApp(firebaseConfig);
console.log("Firebase initialized:", app);

firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
      window.location.href = "../HTML/Users.html";
  } else {
      console.log("User is logged in:", user.email);
  }
});

const database = firebase.database();

// TX-זה ה
const aRef = database.ref("NodeInputOutput/TX/A");
const bRef = database.ref("NodeInputOutput/TX/B");
const cRef = database.ref("NodeInputOutput/TX/C");

// A Card
aRef.on("value", (snapshot) => {
  const value = snapshot.val();
  document.getElementById("data-a").innerText = value;

  const aIcon = document.getElementById("a-icon");
  if (value <= 40) {
      aIcon.className = "fa-solid fa-hand";
  } else {
      aIcon.className = "fa-solid fa-thumbs-up";
  }
});

// B Card
bRef.on("value", (snapshot) => {
  const value = snapshot.val();
  document.getElementById("data-b").innerText = value;

  const bIcon = document.getElementById("b-icon");
  if (value == 1) {
      bIcon.className = "fa-solid fa-lock";
  } else {
      bIcon.className = "fa-solid fa-lock-open";
  }
});

// C Card
cRef.on("value", (snapshot) => {
  const value = snapshot.val();
  document.getElementById("data-c").innerText = value;

  const cIcon = document.getElementById("c-icon");
  if (value == 4) {
      cIcon.className = "fa-solid fa-arrow-down";
  } else if (value == 5) {
      cIcon.className = "fa-solid fa-arrow-left";
  } else if (value == 6) {
      cIcon.className = "fa-solid fa-arrow-up";
  }
});

// RX-זה ה

let State_Of_Reload = 0;
let State_Of_Lite = 0;

// Function to write RX value to Firebase
function writeRXData() {
    const RX_Value = 2 * State_Of_Reload + State_Of_Lite;
    firebase.database().ref("NodeInputOutput/RX").set(RX_Value);
    document.getElementById("rx-data-value").textContent = RX_Value;
}

// Reload Button Function (Pulses Green for 4 seconds)
function handleReload() {
    const reloadBtn = document.getElementById("reload-btn");

    // Step 1: Change State to 1, Update RX, Turn Button Green
    State_Of_Reload = 1;
    writeRXData();
    reloadBtn.style.backgroundColor = "green";

    // Step 2: After 4 seconds, Revert Changes
    setTimeout(() => {
        State_Of_Reload = 0;
        writeRXData();
        reloadBtn.style.backgroundColor = "red";
    }, 4000);
}

// Light Button Function (Toggle Switch)
function handleLight() {
    const lightIcon = document.getElementById("light-icon");

    // Toggle State
    if (State_Of_Lite == 0) {
        State_Of_Lite = 1;
    } else {
        State_Of_Lite = 0;
    }
    
    writeRXData();

    // Toggle Icon
    updateLightIcon();
}

// Function to Update Light Icon Based on State
function updateLightIcon() {
    const lightIcon = document.getElementById("light-icon");

    if (State_Of_Lite == 1) {
        lightIcon.className = "fa-solid fa-lightbulb"; // Light ON
    } else {
        lightIcon.className = "fa-regular fa-lightbulb"; // Light OFF
    }
}

// Check RX Value on Window Load
function initializeFromFirebase() {
  firebase.database().ref("NodeInputOutput/RX").once("value", (snapshot) => {
      const RX_Value = snapshot.val();

      document.getElementById("rx-data-value").textContent = RX_Value;

      // If RX_Value is odd, light is ON; otherwise, it's OFF
      State_Of_Lite = RX_Value % 2;

      // Update Light Icon
      updateLightIcon();
  });
}

// Run on Page Load
window.onload = function() 
{
    initializeFromFirebase();
};
