// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";
import {
  getDatabase,
  ref,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDosNrhPrcRC2UpOu9Wu3N2p3jaUwbJyDI",
  authDomain: "login-example-c7c78.firebaseapp.com",
  projectId: "login-example-c7c78",
  storageBucket: "login-example-c7c78.appspot.com",
  messagingSenderId: "298272317823",
  appId: "1:298272317823:web:07b88844cd084699197a4a",
  databaseURL: "https://login-example-c7c78-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const logoutButton = document.getElementById("logoutButton");
const confirmYes = document.getElementById("confirmYes");
const confirmNo = document.getElementById("confirmNo");
const confirmationPopup = document.getElementById("confirmationPopup");

document.addEventListener("DOMContentLoaded", function () {
  onAuthStateChanged(auth, (user) => {
    const loadingScreen = document.getElementById("loading-screen");
    const dashboardContent = document.getElementById("dashboard-content");

    if (user) {
      // User is logged in, show the dashboard
      loadingScreen.style.display = "none";
      dashboardContent.style.display = "block";

      // Display user data
      const userId = user.uid; // Use UID instead of email
      displayUserData(userId);
    } else {
      // User is not logged in, redirect to login page
      window.location.href = "login.html"; // Change this to your actual login page URL
    }
  });
});

// Function to display user data from Realtime Database
function displayUserData(uid) {
  const dbRef = ref(database);
  get(child(dbRef, `users/${uid}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        const firstname = userData.firstname;
        const balance = userData.balance;
        const investments = userData.investments;
        
        // Update balance element
        const balanceElement = document.getElementById("balance");
        balanceElement.innerHTML = `
        <div>
              <h4>${balance}</h4>
              <span>Balance</span>
            </div>
            <div>
              <span class="fas fa-wallet"></span>
            </div>
        `;

        //Active Investments
        const investmentsElement = document.getElementById("investments");
        investmentsElement.innerHTML = `
        <div>
              <h4>${investments}</h4>
              <span>Investments</span>
            </div>
            <div>
              <span class="fas fa-clipboard-list"></span>
            </div>
        `;

        // Retrieve and display the username
        document.getElementById("welcomeMessage").textContent = `Welcome, ${firstname}!`;
        const userDataDiv = document.querySelector(".user-info");
        userDataDiv.innerHTML = `
          <i class="fa-solid fa-user"></i>
          <p>Hello, <br> ${firstname}!</p>
        `;
      } else {
        console.log("No user data found");
      }
    })
    .catch((error) => {
      console.error("Error retrieving user data: ", error);
    });
}

// Logout functionality
logoutButton.addEventListener('click', () => {
  confirmationPopup.classList.add("show");
});

confirmYes.addEventListener('click', () => {
  signOut(auth).then(() => {
    showPopup("Logged out successfully!");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
  }).catch((error) => {
    console.error("Error logging out:", error);
    showPopup("Error logging out: " + error.message);
  });
  confirmationPopup.classList.remove("show");
});

confirmNo.addEventListener('click', () => {
  confirmationPopup.classList.remove("show");
});

// Popup functions
const showPopup = (message) => {
  const popup = document.getElementById("popup");
  const popupMessage = document.getElementById("popup-message");
  popupMessage.textContent = message;
  popup.classList.add("show");
};

const closePopup = () => {
  const popup = document.getElementById("popup");
  popup.classList.remove("show");
};

document.querySelector(".close").addEventListener("click", closePopup);
