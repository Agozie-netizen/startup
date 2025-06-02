// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-analytics.js";

  import { getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";

  import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-firestore.js";

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


  onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem("LoggedInUserId");
    if(loggedInUserId) {
      const docRef = doc(db, "users", loggedInUserId);
      getDoc(docRef)
      .then((docSnap) => {
      if (docSnap.exists()) {
       const userData = docSnap.data();
        document.getElementById("welcomeName").innerText = userData.fullName;
          document.getElementById("balance").innerText = `₦ ${userData.wallet}`;
      }
       
    })
  }

  if (!user || !loggedInUserId) {
    window.location.href = "login.html"
    localStorage.removeItem("LoggedInUserId"); // Redirect to login page if not authenticated
  }
  }) 





  export default document.getElementById("balance").innerText