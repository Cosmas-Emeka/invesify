import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDosNrhPrcRC2UpOu9Wu3N2p3jaUwbJyDI",
  authDomain: "login-example-c7c78.firebaseapp.com",
  projectId: "login-example-c7c78",
  storageBucket: "login-example-c7c78.appspot.com",
  messagingSenderId: "298272317823",
  appId: "1:298272317823:web:07b88844cd084699197a4a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to check authentication status
function checkAuth() {
    auth.onAuthStateChanged(user => {
        const loadingScreen = document.getElementById('loading-screen');
        const dashboardContent = document.getElementById('dashboard-content');

        if (user) {
            // User is logged in, show the dashboard
            loadingScreen.style.display = 'none';
            dashboardContent.style.display = 'block';
        } else {
            // User is not logged in, redirect to login page
            window.location.href = 'login.html'; // Change this to your actual login page URL
        }
    });
}

// Call the checkAuth function when the page loads
window.onload = function() {
    checkAuth();
};
