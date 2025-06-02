// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-analytics.js";

  import { getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";

  import { getFirestore, getDoc, doc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-firestore.js";


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

  const amount = document.getElementById("amount").value;

  onAuthStateChanged(auth, (user) => {  // Check if user is authenticated    
  const loggedInUserId = localStorage.getItem("LoggedInUserId");
  const docRef = doc(db, "users", loggedInUserId);
      getDoc(docRef)
      .then((docSnap) => {
          if (docSnap.exists()) { // Check if user data exists
            const userData = docSnap.data();         
            console.log("User data:", userData);
          if (userData.wallet >= 100) { // Check if wallet balance is sufficient
            const userData = docSnap.data();
            console.log(userData.wallet, amount);
            const buyData = document.getElementById("buyData");

            const Data = buyData.addEventListener("click", async (e) => { //main function to buy data, by calling the API
              e.preventDefault();
              
            const serviceID = document.getElementById("serviceID").value; //selecting input values
            const variation_code = document.getElementById("variation_code").value;
            const phone = document.getElementById("phone").value;
            const amount = document.getElementById("amount").value;
          
            console.log(serviceID);

            const response = await fetch("http://localhost:3000/buyData", { // API endpoint to buy data
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
              request_id: `request_${Date.now()}`,
              serviceID,
              variation_code,
              phone,
              amount
            })
          }).then(() => {
            document.querySelector(".status").innerHTML = `<h3 class="success"><span class="check">&#10004;</span>  Airtime purchase request sent successfully, please confirm purchase!. Contact support to resolve any issue concerning this transaction</h3>`;
             setTimeout(() => {
              document.querySelector(".status").innerHTML =''
             }, 3000)

          document.querySelector(".spinner").style.display = "none";
          document.getElementById("phone").value ='';
          document.getElementById("amount").value ='';
          })
            
          console.log(userData.wallet = userData.wallet - amount); 
          //deduct the amount from the user's wallet
          await updateDoc(docRef, {
            wallet: increment(-amount)
          })
          
         })
          }//end
          else if(userData.wallet < 100) {
                console.error("insufficient wallet balance");
                alert("Insufficient wallet balance or user data not found.");}
              }})
              
              })


