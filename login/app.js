import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { auth } from "../config.js";





let loginbtn = document.querySelector('#signinbtn')
let Email = document.querySelector('#Email')
  let password = document.querySelector('#password')


  loginbtn.addEventListener('click', (event) => {
    // event.preventDefault();
    signInWithEmailAndPassword(auth, Email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;

            console.log(user);
            localStorage.setItem('userid',user.uid)
            console.log(user.uid)
            
            window.location = '../index.html'
        })
        .catch((error) => {
            const errorMessage = error.message;
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                
              });
            console.log(errorMessage);
        });
});
