import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";

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

// Submit button handler
const submit = document.getElementById("submit");
submit.addEventListener("click", function (event) {
    event.preventDefault();

    // Inputs
    const emailValue = document.getElementById("email").value;
    const passwordValue = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
            // Automatically sign in the user
            return signInWithEmailAndPassword(auth, emailValue, passwordValue);
        })
        .then((userCredential) => {
            alert("Account created and logged in successfully!");
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        });
});
