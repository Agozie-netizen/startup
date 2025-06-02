
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-analytics.js";

  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";

  import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-firestore.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDVRaCadsDt6l79H7kTpcMEjQ43thgYMBc",
    authDomain: "startup-99a88.firebaseapp.com",
    projectId: "startup-99a88",
    storageBucket: "startup-99a88.firebasestorage.app",
    messagingSenderId: "789094372428",
    appId: "1:789094372428:web:64843bdc019e3d0dd090e9",
    measurementId: "G-KQPWDG4CZJ"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);  
  const auth = getAuth()
  const db = getFirestore(app)


  const LoginUser = document.getElementById("Login");
  LoginUser.addEventListener("click", (e) => {
    e.preventDefault();

    // this is to get the values from the input fields
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    //this is to sign in with email and password
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("LoggedInUserId", user.uid); // Store user data in localStorage
        window.location.href = "home.html"; // Redirect to home.html after successful login
      })
      .then(() => {
        alert("Login successful! Redirecting to home page...");
      })

      //this catch block handles errors for signInWithEmailAndPassword
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/user-not-found') {
          alert("User not found. Please check your email and password.");
        }
      });
  });