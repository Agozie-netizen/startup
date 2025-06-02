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


const Register = document.getElementById("signUp");
// this is where the register function starts
Register.addEventListener("click", (e) => {
  e.preventDefault();

  // this is to get the values from the input fields
  const fullName = document.getElementById("fullname").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  //this is to create a new user with email and password
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // Signed in 
      const userData = {
        fullName: fullName,
        phone: phone,
        email: email,
        uid: user.uid,
        wallet: 0,          // initializing wallet balance with 0
      };


      // this code is to save the user data to firestore
      const docRef = doc(db, "users", user.uid);
      setDoc(docRef, userData)
         .then(() => {      //promise to save user data and show success message
          alert("account created successfully");
          window.location.href = "signin.html";
        })
    })

    //this catch block handles the errors from createUserWithEmailAndPassword
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') {
       alert("Email already in use. Please try another email.");
      }
    });
});


