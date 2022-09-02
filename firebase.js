import {initializeApp} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import { getFirestore , collection , addDoc, setDoc, doc, getDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDUOuHtcDPgxlXtFcDwPRN8fZc7XsGZr38",
  authDomain: "talya-6f8d0.firebaseapp.com",
  projectId: "talya-6f8d0",
  storageBucket: "talya-6f8d0.appspot.com",
  messagingSenderId: "1071645148785",
  appId: "1:1071645148785:web:1118d533821fe7e8f77dd0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let location = document.getElementById("searchCity");
let search = document.getElementById("search"); 
let inputDate = document.getElementById("inputDate");
let outputDate = document.getElementById("outputDate");
let hotelList = document.getElementById("listHotel");


let uuid;
let dbImage;
let dbName;
let dbLocation;
let dbContents;
let dbPoint;
let dbNightPrice;
let dbComments;
let dbFeatures1;
let dbFeatures2;
let dbFeatures3;
let totalPaid;

let adult ;
let children;
let baby;
let room;

let slideIndex = 1;

let identify;
let name;
let born;
let phone;
let mail;

let completePrice;

search.addEventListener("click", (e) => {
  
  adult = parseInt(document.getElementById("adult").innerHTML);
  children = parseInt(document.getElementById("child").innerHTML);
  baby = parseInt(document.getElementById("baby").innerHTML);
  room = parseInt(document.getElementById("room").innerHTML);

  getDocs(collection(db,location.value.toLowerCase())).then(docSnap => {
    docSnap.forEach((doc) => {

      uuid = doc.id;
      dbName = doc.data().name;
      dbLocation = doc.data().location;
      dbImage = doc.data().image;
      dbContents = doc.data().contents;
      dbPoint = doc.data().point;
      dbNightPrice = doc.data().night;
      dbComments = doc.data().comments;

      dbFeatures1 = doc.data().features1;
      dbFeatures2 = doc.data().features2;
      dbFeatures3 = doc.data().features3;

      let childrenPaid = parseInt(children)*doc.data().children * getTotalNight();
      let babyPaid = parseInt(baby)*doc.data().baby * getTotalNight();
      let adultPaid = parseInt(adult)*doc.data().adult * getTotalNight();
      totalPaid = childrenPaid+adultPaid+babyPaid;
      
      createItem(uuid, totalPaid);
    })
  })
})

document.getElementById("ascendPrice").addEventListener("click",(e)=>{
  ascendList("ascend");
})
document.getElementById("descandPrice").addEventListener("click",(e)=>{
  ascendList("descand");
})

document.getElementById("ascendPoint").addEventListener("click",(e) => {
  getPointList("ascend");
})

document.getElementById("descandPoint").addEventListener("click",(e) => {
  getPointList("descand");
})

function ascendList(check){

  let sorting;
  if (check == "descand"){
    sorting = "desc";
  }else{
    sorting = "asc";
  }

  document.querySelector(".listHotel").innerHTML = "";
  
  let query1 = query(collection(db,location.value.toLowerCase()),orderBy("night",sorting));
  let documents1 = getDocs(query1).then(docSnap => {
    docSnap.forEach((doc) => {
        uuid = doc.id;
        dbName = doc.data().name;
        dbLocation = doc.data().location;
        dbContents = doc.data().contents;
        dbPoint = doc.data().point;
        dbNightPrice = doc.data().night;
        dbComments = doc.data().comments;
        dbImage = doc.data().image;
  
        dbFeatures1 = doc.data().features1;
        dbFeatures2 = doc.data().features2;
        dbFeatures3 = doc.data().features3;
  
        let childrenPaid = parseInt(children)*doc.data().children * getTotalNight();
        let babyPaid = parseInt(baby)*doc.data().baby * getTotalNight();
        let adultPaid = parseInt(adult)*doc.data().adult * getTotalNight();
        totalPaid = childrenPaid+adultPaid+babyPaid;

        createItem(uuid,totalPaid);
    })
  })
}

function getPointList(check){
  let sorting;
  if (check == "descand"){
    sorting = "desc";
  }else{
    sorting = "asc";
  }

  document.querySelector(".listHotel").innerHTML = "";
  let query1 = query(collection(db,location.value.toLowerCase()),orderBy("point",sorting));
  let documents1 = getDocs(query1).then(docSnap => {
    docSnap.forEach((doc) => {
        uuid = doc.id;
        dbName = doc.data().name;
        dbLocation = doc.data().location;
        dbContents = doc.data().contents;
        dbPoint = doc.data().point;
        dbNightPrice = doc.data().night;
        dbComments = doc.data().comments;
        dbImage = doc.data().image;
  
        dbFeatures1 = doc.data().features1;
        dbFeatures2 = doc.data().features2;
        dbFeatures3 = doc.data().features3;
  
        let childrenPaid = parseInt(children)*doc.data().children * getTotalNight();
        let babyPaid = parseInt(baby)*doc.data().baby * getTotalNight();
        let adultPaid = parseInt(adult)*doc.data().adult * getTotalNight();
        totalPaid = childrenPaid+adultPaid+babyPaid;

        createItem(uuid,totalPaid);
    })
  })
}

document.getElementById("hotelInfoPopUpClose").addEventListener("click",(e)=> {
  document.getElementById("hotelInfoPopUp").style.display = "none"
})

function getTotalNight(){
  let createdInputDate = new Date(inputDate.value);
  let createdOutputDate = new Date(outputDate.value);
  let totalNight = ((createdOutputDate-createdInputDate) / (24*3600*1000)); 
  console.log(totalNight);
  return totalNight;
}

function createItem(uuid,totalPaid){
  
  let li = document.createElement("li");
  li.style.listStyle = "none";
  
  let mainDiv = document.createElement("div");
  mainDiv.className = "listItem";
  mainDiv.onclick = function(){
    openHotelInfoPopUp(uuid,totalPaid)
  }
  
  let img = document.createElement("img");
  img.src = dbImage;
  img.onclick = function() {
    openImage()
  }
  img.className = "listImage";

  let listItemMiddle = document.createElement("div");
  listItemMiddle.className = "listItemMiddle";
  
  let hotelName = document.createElement("label");
  hotelName.className = "label1";
  hotelName.innerHTML = dbName;

  let location = document.createElement("h3");
  location.className = "label2";
  location.innerHTML = dbLocation;

  let contents = document.createElement("label");
  contents.className = "contents";
  contents.innerHTML = dbContents;

  let listItemMiddleDiv = document.createElement("div");
  listItemMiddleDiv.className = "features";

  let features1 = document.createElement("label");
  features1.innerHTML = dbFeatures1;
  let features2 = document.createElement("label");
  features2.innerHTML = dbFeatures2;
  let features3 = document.createElement("label");
  features3.innerHTML = dbFeatures3;

  listItemMiddleDiv.appendChild(features1);
  listItemMiddleDiv.appendChild(features2);
  listItemMiddleDiv.appendChild(features3);

  let listItemRight = document.createElement("div");
  listItemRight.className = "listItemRight";
  
  let point = document.createElement("label");
  point.className = "point";
  point.innerHTML = dbPoint.toString()+" Puan";

  let comments = document.createElement("label");
  comments.className = "comments";
  comments.innerHTML = dbComments.toString()+" Yorum";

  let price = document.createElement("label");
  price.className = "price";
  price.innerHTML = totalPaid.toString()+" TL";

  let nightPrice = document.createElement("label");
  nightPrice.className = "nightPrice";
  nightPrice.innerHTML = "Gecelik "+dbNightPrice.toString()+" TL";

  let rezervationButton = document.createElement("button");
  rezervationButton.className = "rezervationButton";
  rezervationButton.id = "rezervationButton";
  rezervationButton.innerHTML = "Rezervasyon Yap";
  rezervationButton.onclick = function() {
    openView("rezervationPopUp",uuid);
  }

  listItemRight.appendChild(point);
  listItemRight.appendChild(comments);
  listItemRight.appendChild(price);
  listItemRight.appendChild(nightPrice);
  listItemRight.appendChild(rezervationButton);

  listItemMiddle.appendChild(hotelName);
  listItemMiddle.appendChild(location);
  listItemMiddle.appendChild(contents);
  listItemMiddle.appendChild(listItemMiddleDiv);

  li.appendChild(mainDiv);
  mainDiv.appendChild(img);
  mainDiv.appendChild(listItemMiddle);
  mainDiv.appendChild(listItemRight);
  hotelList.appendChild(li);
}

function openView(view , uuid){
  getDoc(doc(db,location.value.toLowerCase(),uuid)).then( (doc) => {
    let hotelName = doc.data().name;
    let address = doc.data().address;
    console.log(hotelName);
    setRezervationPopUp(hotelName, address)
  });
  document.getElementById(view).style.display = "block";
}

function setRezervationPopUp(hotelName, address){
  document.getElementById("rezervationHotelName").innerHTML = hotelName;
  document.getElementById("rezervationAddress").innerHTML = address;
}

function openImage(){
  document.getElementById("images").style.display = "flex";
  showSlides(slideIndex);
}


document.getElementById("goToPayPage").addEventListener("click",(e)=>{
  let checkBox = document.getElementById("hotelInfoCheck")
  if (checkBox.checked == true){
    document.getElementById("payPage").style.display = "block";
    document.getElementById("hotelInfoPopUpRezervation").style.display = "none";

    identify = document.getElementById("identify").value;
    name = document.getElementById("nameOrSubname").value;
    born = document.getElementById("born").value;
    phone = document.getElementById("phone").value;
    mail = document.getElementById("mail").value;

    document.getElementById("completePrice").innerHTML = completePrice;
    document.getElementById("completeNight").innerHTML = totalNight().toString();

    monthDropDownOpen()
  }else{
    checkBox.style.boxShadow = "0 0 20px teal";
  }
})

//----------- Otel bilgilerini göstermek için ----------------------

function openHotelInfoPopUp(uuid,totalPaid){
  let city = location.value.toLowerCase();

  let docRef = getDoc(doc(db,city,uuid));

  docRef.then( (doc) => {
    let hotelName = doc.data().name;
    let address = doc.data().address;
    setHotelInfoPopUp(hotelName, address)
  });

  getDoc(doc(doc(db,city,uuid),"hotelinfo","description")).then((doc)=> {
    let description = doc.data().description;
    document.getElementById("hotelInfoParagraph").innerHTML = description;
  })

  getDoc(doc(doc(db,city,uuid),"hotelinfo","contact")).then((doc)=> {
    document.getElementById("contactWebSite").innerHTML = doc.data().web;
    document.getElementById("contactPhone").innerHTML = doc.data().number;
    document.getElementById("contactMail").innerHTML = doc.data().mail;
  })

  getDoc(doc(doc(db,city,uuid),"hotelinfo","images")).then((doc)=>{
    document.getElementById("hotelInfoImg1").src = doc.data().image1;
    document.getElementById("hotelInfoImg2").src = doc.data().image2;
    document.getElementById("hotelInfoImg3").src = doc.data().image3;
  })

  // 1.Oda özelliklerini getirir

  getDoc(doc(doc(db,city,uuid),"hotelinfo","room1")).then((doc) => {
    document.getElementById("room1Img").src = doc.data().image;
    document.getElementById("room1Feature").innerHTML = doc.data().feature;
    document.getElementById("room1Feature1").innerHTML = doc.data().feature1;
    document.getElementById("room1Feature2").innerHTML = doc.data().feature2;
    document.getElementById("room1Price").innerHTML = `${doc.data().price * getTotalNight() + totalPaid} TL`;
    document.getElementById("room1Night").innerHTML = `${getTotalNight()} gece için`;
  })

  // 2.Oda özelliklerini getirir

  getDoc(doc(doc(db,city,uuid),"hotelinfo","room2")).then((doc)=>{
    document.getElementById("room2Img").src = doc.data().image;
    document.getElementById("room2Feature").innerHTML = doc.data().feature;
    document.getElementById("room2Feature1").innerHTML = doc.data().feature1;
    document.getElementById("room2Feature2").innerHTML = doc.data().feature2;
    document.getElementById("room2Price").innerHTML = `${doc.data().price * getTotalNight() + totalPaid} TL`;
    document.getElementById("room2Night").innerHTML = `${getTotalNight()} gece için`;
  })

  getDoc(doc(doc(db,city,uuid),"hotelinfo","description")).then((doc)=> {
    let description = doc.data().description;
    document.getElementById("hotelInfoParagraph").innerHTML = description;
  })

  // Özellikleri getirir

  getDoc(doc(doc(db,city,uuid),"hotelinfo","features")).then((doc) => {
    let pool = doc.data().pool;
    if (pool == false){
      document.getElementById("pool").style.color = "white";
    }
  })
  
  document.getElementById("hotelInfoPopUp").style.display = "block";
  showHotelInfoImgSlides(slideIndex);

  document.getElementById("hotelInfoButton").addEventListener("click",(e)=> {
    document.getElementById("hotelInfoPopUpDiv").style.display = "none";
    document.getElementById("chooseRoom").style.display = "block";
    document.getElementById("hotelInfoPopUpName").style.display = "none";
    document.getElementById("hotelNameOnImg").style.display = "block";

    docRef.then((doc) => {
      let hotelName = doc.data().name;
      let address = doc.data().address;
      setRezervationPopUp(hotelName,address);
    })
  })

  document.getElementById("chooseRoomButton1").addEventListener("click",(e)=>{
    document.getElementById("chooseRoom").style.display = "none";
    document.getElementById("hotelInfoPopUpRezervation").style.display = "block";
    completePrice = document.getElementById("room1Price").innerHTML;
  })

  document.getElementById("chooseRoomButton2").addEventListener("click",(e)=>{
    document.getElementById("chooseRoom").style.display = "none";
    document.getElementById("hotelInfoPopUpRezervation").style.display = "block";
    completePrice = document.getElementById("room2Price").innerHTML;
  })

  document.getElementById("payInputDate").innerHTML = getDate(inputDate);
  document.getElementById("payOutputDate").innerHTML = getDate(outputDate);

  document.getElementById("completeRezervation").addEventListener("click",(e) => {
    setDoc(doc(doc(db,city,uuid),"rezervation"),{
      name : name
    });
    document.getElementById("hotelInfoPopUp").style.display = "none";
  })  
  
}

function getDate(date){
  let monthName = "";
  let month = date.value.slice(0,2);
  let day = date.value.slice(3,5)
  let year = date.value.slice(6,10)
  switch(month){
    case "01" :
      monthName = "Ocak";
      break;
    case "02" :
      monthName = "Şubat";
      break;
    case "03" :
      monthName = "Mart";
      break;
    case "04" :
      monthName = "Nisan";
      break;
    case "05" :
      monthName = "Mayıs";
      break;
    case "06" :
      monthName = "Haziran";
      break;
    case "07":
      monthName = "Temmuz";
      break;
    case "08":
      monthName = "Ağustos";
      break;
    case "09":
      monthName = "Eylül";
      break;
    case "10":
      monthName = "Ekim";
      break;
    case "11":
      monthName = "Kasım";
      break;
    case "12":
      monthName = "Aralık";
      break;
  }

  return day+" "+monthName+" "+year;
}

function setHotelInfoPopUp(hotelName,address){
  document.getElementById("hotelInfoName").innerHTML = hotelName;
  document.getElementById("hotelInfoAddress").innerHTML = address;
  document.getElementById("hotelNameOnImg").innerHTML = hotelName;
}

document.getElementById("infoNext").addEventListener("click",(e)=>{
  showHotelInfoImgSlides(slideIndex += 1);
})

document.getElementById("infoPrev").addEventListener("click",(e)=>{
  showHotelInfoImgSlides(slideIndex -= 1);
})

function showHotelInfoImgSlides(n){
  let i;
  let image = document.getElementsByClassName("hotelInfoImg");
  let choose = document.getElementsByClassName("hotelInfoChoosen");

  if (n > image.length){slideIndex = 1}
  if (n < 1) {slideIndex = image.length}
  for (i = 0; i<image.length; i++){
    image[i].style.display = "none";
  }
  for (i=0; i<choose.length; i++){
    choose[i].className = choose[i].className.replace(" slideActive", "");
  }

  image[slideIndex-1].style.display = "block";
  choose[slideIndex-1].className += " slideActive";
}

//----------- Resimleri göstermek için

document.getElementById("prev").addEventListener("click",(e) => {
  showSlides(slideIndex -=1 );
})

document.getElementById("next").addEventListener("click", (e) => {
  showSlides(slideIndex +=1 );
})

function currentSlides(n){
  showSlides(slideIndex = n);
}

function showSlides(n){

  let i;
  let image = document.getElementsByClassName("imagesImg");
  let choose = document.getElementsByClassName("choosen");

  if (n > image.length){slideIndex = 1}
  if (n < 1) {slideIndex = image.length}
  for (i = 0; i<image.length; i++){
    image[i].style.display = "none";
  }
  for (i=0; i<choose.length; i++){
    choose[i].className = choose[i].className.replace(" slideActive", "");
  }

  image[slideIndex-1].style.display = "block";
  choose[slideIndex-1].className += " slideActive";
}

function monthDropDownOpen(){
  let month = [12,11,10,9,8,7,6,5,4,3,2,1];
  for(let monthDay of month){
      document.getElementById("months").insertAdjacentHTML("afterbegin",
      `<option>${monthDay.toString()}</option>`
      );
  }
}