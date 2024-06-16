
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import { auth } from "../config.js";
import { db } from "../config.js";
import { storage } from "../config.js";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  onSnapshot,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";







const homebtn = document.querySelector("#homebtn")
homebtn.addEventListener('click', () => { window.location = "../index.html" })

const additem = document.querySelector("#additem")
const itemname = document.querySelector("#itemname")
const itemdiscribtion = document.querySelector("#itemDiscribtion")
const itemprize = document.querySelector("#itemprize")
const itemcatagory = document.querySelector("#itemcatagory")
const itemimage = document.querySelector('#itemimage')


const adminuserid = localStorage.getItem('adminuserid')
const usserid = localStorage.getItem('userid')
let imgUrl;


const imgOutputDiv = document.querySelector(".imgOutputDiv");
const imgOutput = document.querySelector("#imgOutput");

const downloadImageUrl = (file) => {
  return new Promise((resolve, reject) => {
    const restaurantImageRef = ref(
      storage,
      `images/${file.name}`
    );
    const uploadTask = uploadBytesResumable(restaurantImageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case "paused":
            break;
          case "running":
            console.log("running");
            break;
        }
      },
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            resolve(downloadURL);
          })
          .catch((error) => {
            reject(error);
          });
      }
    );
  });
};


itemimage.addEventListener("change", async () => {
  if (itemimage.files.length > 0) {
    const file = itemimage.files[0];
    imgUrl = await downloadImageUrl(file);
    imgOutputDiv.style.display = "block";
    if (imgUrl) {
      imgOutput.src = imgUrl;
    }
  }
})



additem.addEventListener('click', async () => {
  if (itemname.value == "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "please write something in fields!",

    });
  }
  else {

    try {

      const docRef = await addDoc(collection(db, "items"), {
        itemname: itemname.value,
        itemdiscribtion: itemdiscribtion.value,
        itemprize: itemprize.value,
        itemcatagory: itemcatagory.value,
        itemImage: imgUrl
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }

  }
})






if (true) {
  additem.addEventListener('click', async () => {
    if (itemname.value == "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "please write something in fields!",

      });
    }
    else {
      try {
        const docRef = await addDoc(collection(db, adminuserid), {
          itemname: itemname.value,
          itemdiscribtion: itemdiscribtion.value,
          itemprize: itemprize.value,
          itemcatagory: itemcatagory.value,
          itemimage: imgUrl
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }



    }
  })

}







const getitemss = document.querySelector("#food-menu")


const getitems = () => {

  onSnapshot(collection(db, adminuserid), (data) => {
    data.docChanges().forEach((change) => {


      if (change.type === "added") {

        getitemss.innerHTML +=
          `
            <div class="food-menu-container container" id="${change.doc.id}">
            <div class="food-menu-item">
                <div class="food-img">
                    <img src="${change.doc.data().itemimage}" alt="" />
                </div>
                <div class="food-description">
                    <h2 class="food-titile">${change.doc.data().itemname}</h2>
                    <p>
                       ${change.doc.data().itemdiscribtion}
                    </p>
                    <p class="food-price">Catagory: <span class="food-price">${change.doc.data().itemcatagory}</span></p>
                    <p class="food-price">Price: &#8377;<span>${change.doc.data().itemprize}</span></p>
                
                    <a href="#" id="editpopbtn" class="btn btn-primary" onclick="abc()">Edit menu</a>
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
      else {






      }
      // const itemid = change.doc.id
      // console.log(itemid);





    })

  });

}

getitems()
// const itemid = change.doc.id
// console.log(itemid);


// const editpopbtn = document.querySelector('#editpopbtn')

// if (true){
//   editpopbtn.addEventListener('click',()=>{
//     const popy = document.querySelector("#popy")
// })
// }
window.abc = function(){
  
      popy.classList.add('popyopen')
}

window.cba = function(){
  
  popy.classList.remove('popyopen')
}
// async function editItem(id) {
//   const restRef = doc(db, `restaurants/${adminUid}/menue`, id);
//   updateItemId = id;
//   onSnapshot(restRef, (selectItem) => {
//     if (selectItem.exists()) {
//       const itemImg = selectItem.data().itemImg;
//       const itemName = selectItem.data().itemName;
//       const itemDesc = selectItem.data().itemDesc;
//       const itemPrice = selectItem.data().itemPrice;
//       const itemType = selectItem.data().itemType;
//       const prevPrice = selectItem.data().prevPrice;

//       EditimgOutput.src = itemImg;
//       EditItemName.value = itemName;
//       EdititemDesc.value = itemDesc;
//       EditItemType.value = itemType;
//       editItemPrice.value = itemPrice;
//       editPrevItemPrice.value = prevPrice;
//     }
//   });
// }

