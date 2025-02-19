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

function goToSignUp() {
  window.location.href = "../HTML/Users.html"; // Adjust the path if necessary
}

function goToLogin() {
  window.location.href = "../HTML/Login.html"; // Change the path if needed
}



function signUp() 
{
  const email = document.getElementById("SignUpEmail").value;
  const password = document.getElementById("SignUpPassword").value;

  if (password.length < 6) {
    alert("Password must be at least 6 characters long");
    return;
  }

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log("Account created successfully:", userCredential.user);

      window.location.href = "../HTML/Stats.html";
    })
    .catch((error) => {
      console.error(`Error [${error.code}]: ${error.message}`);
      alert(`Error: ${error.message}`);
    });
}


// Login Function
function login() 
{
  const email = document.getElementById("LogInEmail").value;
  const password = document.getElementById("LogInPassword").value;

  if (password.length < 6) {
    alert("Password must be at least 6 characters long");
    return;
  }

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log("Login successful:", userCredential.user);
      window.location.href = "../HTML/Stats.html";
    })
    .catch((error) => {
      console.error(`Error [${error.code}]: ${error.message}`);
      alert(`Login failed: ${error.message}`);
    });
}

