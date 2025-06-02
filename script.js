
  document.addEventListener("DOMContentLoaded", function () {
    const loginModalEl = document.getElementById("loginModal");
    const registerModalEl = document.getElementById("registerModal");

    const loginModal = new bootstrap.Modal(loginModalEl);
    const registerModal = new bootstrap.Modal(registerModalEl);

    document.querySelectorAll(".card").forEach(card => {
      card.addEventListener("click", () => loginModal.show());
    });

    // Switch to Register Modal
    document.getElementById("showRegister").addEventListener("click", function (e) {
      e.preventDefault();
      loginModal.hide();
      setTimeout(() => registerModal.show(), 500);
    });

    // Switch to Login Modal
    document.getElementById("showLogin").addEventListener("click", function (e) {
      e.preventDefault();
      registerModal.hide();
      setTimeout(() => loginModal.show(), 500);
    });

    // Placeholder for Forgot Password
    document.getElementById("forgotPasswordLink").addEventListener("click", function (e) {
      e.preventDefault();
      alert("Redirect to Forgot Password Page (not implemented yet)");
    });

    // Login Form Submission
    document.getElementById("loginForm").addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;
      const remember = document.getElementById("rememberMe").checked;

      console.log("Logging in:", { email, password, remember });
      alert("Logged in successfully (placeholder)");
      loginModal.hide();
    });

    // Register Form Submission
    document.getElementById("registerForm").addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("registerName").value;
      const email = document.getElementById("registerEmail").value;
      const password = document.getElementById("registerPassword").value;

      console.log("Registering:", { name, email, password });
      alert("Registered successfully (placeholder)");
      registerModal.hide();
    });
  });



  // Replace these with your Firebase project config
  const firebaseConfig = {

  apiKey: "AIzaSyASpXDUVBqN8aHCxt9K7G5CwLDpQfa4yvA",

  authDomain: "zoezi-22657.firebaseapp.com",

  projectId: "zoezi-22657",

  storageBucket: "zoezi-22657.firebasestorage.app",

  messagingSenderId: "41975431159",

  appId: "1:41975431159:web:b6d646085dd3d7c0c238f2",

  measurementId: "G-95J8ZRD2ZF"

};




  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  // Sign in function
  function googleSignIn() {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        alert(`Welcome, ${user.displayName}`);
        console.log(user);
      })
      .catch((error) => {
        console.error("Login Error:", error.message);
      });

  }

document.querySelector("#loginModal .btn-outline-danger").addEventListener("click", googleSignIn);
document.querySelector("#registerModal .btn-outline-danger").addEventListener("click", googleSignIn);


