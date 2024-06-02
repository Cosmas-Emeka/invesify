// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
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
        const username = userData.username; // Retrieve the username
        document.getElementById(
          "welcomeMessage"
        ).textContent = `Welcome, ${username}!`;
        const userDataDiv = document.querySelector(".user-info");
        userDataDiv.innerHTML = `
            <p>Hello: ${userData.username}</p>
          `;
      } else {
        console.log("No user data found");
      }
    })
    .catch((error) => {
      console.error("Error retrieving user data: ", error);
    });
}
