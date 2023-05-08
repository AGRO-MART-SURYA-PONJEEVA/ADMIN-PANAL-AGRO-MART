"use strict";
let funa = localStorage.getItem("send");
funa="rajasurya"
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
///

let globalDelivery = [];
deliveryDetailsDatabase.on("value", function (snapshot) {
  snapshot.forEach(function (element) {
    const user = {
      customberName: element.val().User,
      oty: element.val().OrderProduct,
      address: element.val().Adresss,
      total: element.val().Total,
      orderStatus: element.val().OrderStatus,
      orderTaken: element.val().OrderTaken,
      productID: element.val().ProductId,
      key: element.key,
    };

    globalDelivery.push(user);
  });
  displayOrder();
});

//display//
const row = document.querySelector(".add");

const displayOrder = function () {
  globalDelivery.forEach((mov, i) => {
    // console.log(mov);
    const deliveryStatus = mov.orderStatus === "ND" ? true : false;
    const takenDeliveryStatus = mov.orderTaken === "nt" ? true : false;
    // const randomNum = Math.floor(Math.random() * 9000) + 1000;
    if (deliveryStatus === true && takenDeliveryStatus === true) {
      row.innerHTML = "";
      const html = `
           <tr data-set="${i}">
            <td>${mov.address[9]}</td>
            <td>${mov.customberName}</td>
            <td>${mov.oty.length}</td>
            <td><span class="address1">
            ${mov.address[1]},
          </span> <br>
          <span class="address2">
          ${mov.address[2]},
          </span> <br>
          <span class="address3">
             <span><strong>Landmark : </strong>${mov.address[3]},</span> <br>
             <span>Tamil Nadu,</span>
          </span> <br>
          <span class="address4">
          ${mov.address[4]}
         </span> </td>
            <td>₹${mov.total + mov.oty.length * 10}</td>
            <td>₹${mov.oty.length * 10}</td>
            <td><button class="delivery-btn" data-set="${i}">Take Delivery</button></td>
          </tr>
          <tr>
           `;
      row.insertAdjacentHTML("beforebegin", html);
    }
  });
};
////////////
// takeOrder
let n;
let currentUserTakenOrder = [];
const takeOrder = document.querySelector(".table");
takeOrder.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("delivery-btn")) {
    const clicked = e.target.closest("tr");
    n = clicked.dataset.set;
    if (currentUserTakenOrder.length === 0) {
      currentUserTakenOrder.push(globalDelivery[n]);
      alert("Order taken sucessfully");
    } else {
      alert("You can take only one Order");
    }
  }
  var newContactForm = trackDelivery.push();
  newContactForm.set({
    FullName: funa,
    FullDetails: currentUserTakenOrder,
    userId : currentUserTakenOrder[0].key,
  });
  const userId = currentUserTakenOrder[0].key;

  var ref = firebase.database().ref("/Global_delivery_details/" + userId);

  // Update the value
  ref.update({
    OrderTaken: "t",
  });
  location.reload(true);
});
