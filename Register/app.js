
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

const registerbtn = document.querySelector("#registerbtn")






const Email = document.querySelector("#registerEmail")
const password = document.querySelector("#registerpass")
const company = document.querySelector("#inputPassword1")
const Business = document.querySelector("#inputPassword2")
const industry = document.querySelector("#inputindustry")
console.log(industry);
const street = document.querySelector("#inputPassword4")
const postal = document.querySelector("#inputPassword5")
const  city= document.querySelector("#inputPassword6")
const fristname = document.querySelector("#inputPassword7")
const lastname = document.querySelector("#inputPassword8")
const phone = document.querySelector("#inputPassword9")



registerbtn.addEventListener('click', function () {

  createUserWithEmailAndPassword(auth, Email.value, password.value)
    .then((userCredential) => {

      const user = userCredential.user;
      console.log('user==>', user);
      window.location = "./adminlogin.html"
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error==>", errorMessage);
    });
});

const adminuserid = localStorage.getItem('adminuserid')



registerbtn.addEventListener('click',async ()=>{
    const admin = Math.random()*100;
    console.log(admin)
    try {
      const docRef = await addDoc(collection(db,adminuserid), {
        email:Email.value,
        password:password.value,
        fristname:fristname.value,
        lastname:lastname.value,
        phone:phone.value,
        company:company.value,
        postal:postal.value,
        street:street.value,
        city:city.value,
        industry:industry.textContent,
        business:Business.value,
        
        });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  
  
    
  })
  