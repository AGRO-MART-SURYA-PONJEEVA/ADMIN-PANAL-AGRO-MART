"use strict";
{
  /*               <tbody>
                    <tr>
                        <td class="People">
                        <img src="/image/ph2.jpg" alt="">
                        <div class="people-de">
                        <h5>PonjeevaJ</h5>
                        <p>jeeva@example.com</p>
                        </div>
                    </td>
                    <td class="people-des">
                        <h5>Software Engineer</h5>
                        <p>Web dev</p>
                    </td>
                    <td class="active">
                     <p>Active</p>
                    </td> 
                    <td class="role">
                      <p>Owner</p>
                    </td>
                    <td class="edit"><a href="">View</a></td>
                    </tr>
                </tbody> */
}
//API SEction//
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
var formdb = firebase.database().ref("USER DATABASE");

let alreadyUser = [];

const row = document.querySelector(".row");
const usercount = document.querySelector(".usercount");

formdb.on("value", function (snapshot) {
  snapshot.forEach(function (element) {
    const user = {
      fullName: element.val().FullName,
      mobileNumber: element.val().Mobile,
      email: element.val().Email,
      roll: element.val().Roll,
      pincode: element.val().Pincode,
      city: element.val().City,
      house: element.val().House,
      road: element.val().Road,
      landmark: element.val().Landmark,
      addressType: element.val().AddressType,
    };
    alreadyUser.push(user);
  });
  usercount.textContent = alreadyUser.length;
});

const displayUser = function () {
  row.innerHTML = "";
  alreadyUser.forEach(function (mov, i) {
    const html = `<tbody>
                <tr>
                    <td class="People">
                    <img src="/image/profile.png" alt="">
                    <div class="people-de">
                    <h5>${mov.fullName.toUpperCase()}</h5>
                    <p>${mov.email}</p>
                    </div>
                </td>
                <td class="people-des">
                    <h5>${mov.mobileNumber}</h5>
                    
                </td>
                <td class="active">
                <p>Active</p>
                </td> 
                <td class="role">
                <p>${mov.roll}</p>
                </td>
                <td class="edit" ><a href="#" class="view" data-set="${i}">View</a></td>
                </tr>
       </tbody>`;

    row.insertAdjacentHTML("beforeend", html);
  });
};
//user data display//
const n = document.querySelector(".n");
const ee = document.querySelector(".e");
const m = document.querySelector(".m");
const s = document.querySelector(".ss");
const ce = document.querySelector(".ca");
const r = document.querySelector(".r");
const l = document.querySelector(".l");
const a = document.querySelector(".aa");
const viewDisplay = document.querySelector(".view_display");
const exit = document.querySelector(".exit");
const rollView = document.querySelector(".roll_view");
row.addEventListener("click", function (e) {
  const clicked = e.target.closest(".view");
  let nn = clicked.dataset.set;
  n.textContent = alreadyUser[nn].fullName;
  ee.textContent = alreadyUser[nn].email;
  m.textContent = alreadyUser[nn].mobileNumber;
  s.textContent = "Tamil Nadu";
  ce.textContent = alreadyUser[nn].city;
  r.textContent = alreadyUser[nn].road;
  l.textContent = alreadyUser[nn].landmark;
  a.textContent = alreadyUser[nn].addressType;
  rollView.textContent = alreadyUser[nn].roll;
  viewDisplay.classList.remove("display");
});
exit.addEventListener("click", function (e) {
  e.preventDefault();
  viewDisplay.classList.add("display");
});

//Admin Login//

const logIn = document.querySelector(".log_in");
const values = document.querySelector(".values");
const board = document.querySelector(".board");
const loginView = document.querySelector(".login");
const adminId = document.querySelector(".input");
const error = document.querySelector(".error");
logIn.addEventListener("click", function () {
  const id = adminId.value.toLowerCase();
  if (id === "surya-2002-a" || id === "ponjeeva-2002-a") {
    values.classList.remove("display");
    board.classList.remove("display");
    loginView.classList.add("display");
    error.classList.add("display");
    displayUser();
  } else {
    error.classList.remove("display");
  }
});
adminId.addEventListener("keydown", function (e) {
  const id = adminId.value.toLowerCase();
  if (e.key === "Enter") {
    if (id === "surya-2002-a" || id === "ponjeeva-2002-a") {
      values.classList.remove("display");
      board.classList.remove("display");
      loginView.classList.add("display");
      error.classList.add("display");
      displayUser();
    } else {
      error.classList.remove("display");
    }
  }
  if(e.key==="Backspace")
  {
    error.classList.add("display");
  }
});
