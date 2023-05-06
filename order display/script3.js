"use strict";
let funa = localStorage.getItem("send");
const nameLogin = (document.querySelector(".nameLogin").textContent =
  funa.toUpperCase());
//conction//
const firebaseConfig = {
  apiKey: "AIzaSyCEt3onEnuy00kKgoErbbVZKKajGzR2nTw",
  authDomain: "agro-mart-2f9dd.firebaseapp.com",
  databaseURL: "https://agro-mart-2f9dd-default-rtdb.firebaseio.com",
  projectId: "agro-mart-2f9dd",
  storageBucket: "agro-mart-2f9dd.appspot.com",
  messagingSenderId: "986382838818",
  appId: "1:986382838818:web:dff4d0cb805b5cc39cae7b",
};
firebase.initializeApp(firebaseConfig);

var deliveryDetailsDatabase = firebase
  .database()
  .ref("Global_delivery_details");
var trackDelivery = firebase.database().ref("TrackDelivery");

let globalDelivery = [];
let display = [];
trackDelivery.on("value", function (snapshot) {
  snapshot.forEach(function (element) {
    const user = {
      userName: element.val().FullName,
      fulldetails: element.val().FullDetails,
      key: element.key,
      updateKey: element.val().userId,
    };

    globalDelivery.push(user);
  });

  const find1 = globalDelivery.find((mov) => mov?.userName === funa);
  // console.log(find1.fulldetails[0].total);
  const details = {
    cusname: find1.fulldetails[0].customberName,
    total: find1.fulldetails[0].total,
    address1: find1.fulldetails[0].address[1],
    address2: find1.fulldetails[0].address[2],
    address3: find1.fulldetails[0].address[3],
    address4: find1.fulldetails[0].address[4],
    oty: find1.fulldetails[0].oty.length,
    main: find1.fulldetails[0].productID,
    key: find1.updateKey,
    trackKey:find1.key,
  };
  display.push(details);
  displayOrder();
});

const row = document.querySelector(".add");
const displayOrder = function () {
  row.innerHTML = "";
  display.forEach((mov, i) => {
    const html = `
      <tr>
      <td>${mov.cusname}</td>
      <td>${mov.total}</td>
      <td><span class="address1">
       ${mov.address1}
      </span> <br>
      <span class="address2">
      ${mov.address2}
      </span> <br>
      <span class="address3">
         <span><strong>Landmark : </strong>${mov.address3}</span>
      </span> <br>
      <span class="address4">
      ${mov.address4}
     </span> </td>
      
      <td>${mov.oty * 10}</td>
      <td class="text">....</td>
      <td><button class="delivery-btn btn">Verify Delivery</button></td>
    </tr>
           `;
    row.insertAdjacentHTML("beforebegin", html);
  });
  //   var deliveryBtn=document.querySelector(".add")
};

const deliveryBtn = document.querySelector("table");
const verfy = document.querySelector(".container1");
const check = document.querySelector(".check");
const text = document.querySelector(".text");
const num = document.querySelector(".num");

deliveryBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("btn")) {
    verfy.classList.remove("display");
  }
});
check.addEventListener("click", function (e) {
  e.preventDefault();
  const idInput = num.value;
  const id = display[0].main;
 console.log(id);
  if (Number(idInput) === id) {
    const userId = display[0].key;
    var ref = firebase.database().ref("/Global_delivery_details/" + userId);
    // Update the value
    ref.update({
      OrderStatus: "D",
    });
     

    const userId1 = display[0].trackKey;
    trackDelivery
      .child(userId1)
      .remove()
      .then(() => {
        location.reload(true);
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
    alert(
      "Delivery successful! Well done, you've made another customer happy. Thank you for your hard work and dedication to our company. Keep up the great work!"
    );
  } else {
    alert("check customber ID :(");
  }
});
