"use strict";

//api conection//
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

//database//
var deliveryDetailsDatabase = firebase
  .database()
  .ref("Global_DeliveryLogin_details");

//class//

const create = document.querySelector(".create");
const logIn = document.querySelector(".login");

//create account class//
const fullName = document.querySelector(".name");
const email = document.querySelector(".email");
const phone = document.querySelector(".phone");
const password = document.querySelector(".password");
const conpassword = document.querySelector(".conpassword");
//   button
const signup = document.querySelector(".signup");
const log = document.querySelector(".log");
const newUser = document.querySelector(".sign");
const logInUser=document.querySelector(".logInUser");

//addeventlisner//
signup.addEventListener("click", function (e) {
  e.preventDefault();
  create.classList.remove("display");
  logIn.classList.add("display");
});
log.addEventListener("click", function (e) {
  e.preventDefault();
  create.classList.add("display");
  logIn.classList.remove("display");
});

//create account//
newUser.addEventListener("click", function (e) {
  e.preventDefault();
  const user = fullName.value;
  const userEmail = email.value;
  const userMobile = phone.value;
  const userPassword = password.value;
  const conUserPassword = conpassword.value;
  if(user!==""&&userEmail!==""&&userMobile!=="")
  {
             if(userPassword===conUserPassword)
             {
                var newContactForm = deliveryDetailsDatabase.push();
                newContactForm.set({
                  FullName: user,
                  Email: userEmail,
                  Mobile: userMobile,
                  password: userPassword,
                  Myorder:[],
                });
                alert("registered successfully");
             }
             else
             {
                alert("check your password");
             }
  }
  else
  {
    alert("fill all the details");
  }
});
//check account//
let alreadyUser = [];
deliveryDetailsDatabase.on("value", function (snapshot) {
  snapshot.forEach(function (element) {
    let lowername = element.val().FullName;
    lowername = lowername.toLowerCase();
    lowername = lowername.split(" ");
    const user = {
      real:element.val().FullName,
      fullName: lowername[0],
      mobileNumber: element.val().Mobile,
     password: element.val().password,
    };
   
    alreadyUser.push(user);
  });
});
logInUser.addEventListener("click",function(e)
{
    e.preventDefault();
    const userName=document.querySelector(".UserName").value.toLowerCase();
    const passwordCheck=document.querySelector(".passwordCheck").value;
    const find1 = alreadyUser.find((mov) => mov?.fullName === userName);
    if(find1===undefined)
    {
        alert("Details are wrong try again or create new");
    }
    else
    {
        if(find1.password===passwordCheck)
        {
            console.log(find1);
            localStorage.setItem("send", find1.fullName);
            alert("welcome to Agro Mart Delivery Section");
            window.location.href = "/deliveryList.html";
        }
        else
        {
            alert("password Incorrect");
        }
    }
})
///////////////////////////////////////////////////////////////////////////////////////
