
import { createUserWithEmailAndPassword, } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { db } from "../config.js";
import { auth } from "../config.js";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  onSnapshot,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const signupbtn = document.querySelector("#signupbtn")





const username = document.querySelector("#username")
const Email = document.querySelector("#Email")
const password = document.querySelector("#password")



signupbtn.addEventListener('click', function (e) {
  e.preventDefault()

  createUserWithEmailAndPassword(auth, Email.value, password.value, username.value)
    .then((userCredential) => {

      const user = userCredential.user;
      console.log('user==>', user);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "account create sucesssfully",
        showConfirmButton: false,
        timer: 1500
      });
      window.location = "../login/login.html"
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        
      });
      console.log("error==>", errorMessage);
    });
});


signupbtn.addEventListener('click',async ()=>{

  try {
    const docRef = await addDoc(collection(db, "users"), {
      email:Email.value,
      password:password.value,
      Name:username.value,
      });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }


  
})
