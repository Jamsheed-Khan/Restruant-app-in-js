import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { auth } from "../config.js";





let adminloginbtn = document.querySelector('#adminbtn')
let Email = document.querySelector('#admineamil')
  let password = document.querySelector('#adminpass')


  adminloginbtn.addEventListener('click', (event) => {
    // event.preventDefault();
    signInWithEmailAndPassword(auth, Email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;

            console.log(user);
            localStorage.setItem('adminuserid',user.uid)
            console.log(user.uid)
            window.location = '../product/addproduct.html'
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
        });
});
