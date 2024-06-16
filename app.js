
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { auth } from "./config.js";
import { db } from "./config.js";
import { collection, addDoc, getDocs,updateDoc, doc, onSnapshot, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";






$(document).ready(function () {
    $("a").on("click", function (event) {
        if (this.hash !== "") {
            event.preventDefault();

            var hash = this.hash;

            $("html, body").animate(
                {
                    scrollTop: $(hash).offset().top,
                },
                800,
                function () {
                    window.location.hash = hash;
                }
            );
        }
    });
});




if (!localStorage.getItem('userid')) {
    window.location = "../login/login.html"
  }
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      localStorage.removeItem('userid')
      window.location = "../login/login.html"
    }
  
  })

  
onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid);
      // ...
    } else {
      // User is signed out
      window.location = "../login/login.html"
      // ...
    }
  });
  

  let logoutbtn = document.querySelector("#logoutbtn")
logoutbtn.addEventListener('click', () => {
  signOut(auth).then(() => {
    // Sign-out successful.
    console.log('logout successfully');
    window.location = "../login/login.html"
  }).catch((error) => {
    console.log(error);
    // An error happened.
  });

})





const getitemss = document.querySelector("#food-menu")

const adminuserid = localStorage.getItem('adminuserid')
const usserid = localStorage.getItem('userid')
  const getitems = () => {

    onSnapshot(collection(db,'items'), (data) => {
      data.docChanges().forEach((change) => {
        console.log(change.type);
        // console.log((usserid));
        // ids.push(change.doc.id)
        // console.log(ids)
  
        if (change.type === "added") {
  
          console.log(change.doc.data())
          
          getitemss.innerHTML +=
            `
            <div class="food-menu-container container">
            <div class="food-menu-item">
                <div class="food-img">
                    <img src="${change.doc.data().itemImage}" alt="" />
                </div>
                <div class="food-description">
                    <h2 class="food-titile">${change.doc.data().itemname}</h2>
                    <p>
                       ${change.doc.data().itemdiscribtion}
                    </p>
                    <p class="food-price">Catagory: <span class="food-price">${change.doc.data().itemcatagory}</span></p>
                    <p class="food-price">Price: &#8377;<span>${change.doc.data().itemprize}</span></p>
                
                    <a href="" class="btn btn-primary" id="">ADD TO CART</a>
                </div>
            </div>
        </div>
        
           `
  
        }
        else if (change.type === "removed") {
          let addd = document.getElementById(change.doc.id)
          if (addd) {
  
            addd.remove()
          }
        }
        else{
  
  
  
  
  
  
        }
      })
  
    });
  
  }
  
  getitems()
  
  




const usermain = document.querySelector(".main")
  
  window.userdata = function(){
      usermain.classList.add('visiprof')
 

  }
window.userhide = function(){
  usermain.classList.remove("visiprof")
}



// profile portion 


const getname = document.querySelector('.one')
const getemail = document.querySelector('.two')
const getcom = document.querySelector('.three')
const getph = document.querySelector('.four')
const userimage = document.querySelector('.userimg')





const getprofile = () => {

  onSnapshot(collection(db,'users'), (data) => {
    data.docChanges().forEach((change) => {
      // console.log(change.type);
      console.log(change.doc.data())

      if (change.type === "added") {

        
        getname.innerHTML = change.doc.data().Name
        // getemail.innerHTML = change.doc.data().company
        getcom.innerHTML = change.doc.data().email
        // getph.innerHTML = change.doc.data().phone
        
      //     `
      //     <div class="food-menu-container container">
      //     <div class="food-menu-item">
      //         <div class="food-img">
      //             <img src="${change.doc.data().itemImage}" alt="" />
      //         </div>
      //         <div class="food-description">
      //             <h2 class="food-titile">${change.doc.data().itemname}</h2>
      //             <p>
      //                ${change.doc.data().itemdiscribtion}
      //             </p>
      //             <p class="food-price">Catagory: <span class="food-price">${change.doc.data().itemcatagory}</span></p>
      //             <p class="food-price">Price: &#8377;<span>${change.doc.data().itemprize}</span></p>
              
      //             <a href="" class="btn btn-primary" id="">ADD TO CART</a>
      //         </div>
      //     </div>
      // </div>
      
      //    `

      }
      else if (change.type === "removed") {
        let addd = document.getElementById(change.doc.id)
        if (addd) {

          addd.remove()
        }
      }
      else{






      }
    })

  });

}

getprofile()