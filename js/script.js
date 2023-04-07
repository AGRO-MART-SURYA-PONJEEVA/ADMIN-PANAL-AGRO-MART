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

const row=document.querySelector('.row');
const usercount=document.querySelector('.usercount');

formdb.on("value", function (snapshot) {
  snapshot.forEach(function (element) {
    const user = {
      fullName: element.val().FullName,
      mobileNumber: element.val().Mobile,
      email: element.val().Email,
      roll:element.val().Roll,
    };
    // console.log(name);
    alreadyUser.push(user);
  });
  
  // console.log(alreadyUser.length);
  usercount.textContent=alreadyUser.length;
  displayUser();
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
                <td class="edit"><a href="">View</a></td>
                </tr>
       </tbody>`;
    
       row.insertAdjacentHTML("beforeend", html);
  });
};
