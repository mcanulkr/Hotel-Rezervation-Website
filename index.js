let cities = [
    "Kemer (Antalya)", "Bodrum", "Marmaris","Adana", "Adıyaman", "Afyon", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın", "Balıkesir", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Isparta", "İçel (Mersin)", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman", "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce"
];

monthDropDownOpen()
yearDropDownOpen()


let locationInput = document.getElementById("searchCity");
let locationList = document.querySelector(".locationList");

autocomplete(locationInput,cities);

document.getElementById("search").addEventListener("click",(e) =>{
    document.getElementById("hotelList").style.display = "flex";
})

document.getElementById("rezervationButton").addEventListener("click", (e)=> {
    document.getElementById("rezervationPopUp").style.display = "block";    
})

/*locationInput.addEventListener("keyup", (e) => {
    let userData = e.target.value;
    let emptyArray = [];
    if(userData){
        emptyArray = cities.filter((data) => {
            return data.toLowerCase().startsWith(userData.toLowerCase());
        })
        emptyArray = emptyArray.map((data) => {
            return data = '<li>'+ data +'</li>';
        })
    }
    showList(emptyArray);
    let allList = locationList.querySelectorAll("li");
    for (let i=0 ; i < allList.length; i++){
        allList[i].setAttribute("onclick","selectItem(this)");
    }
})*/

function selectItem(element){
    let city = element.textContent;
    locationInput.value = city;
    locationList.style.display = "none";
}

function showList(list){
    let listData;
    if(list.length == 0){
        userValue = locationInput.value;
        listData = '<li>'+ userValue +'</li>';
    }else{
        listData = list.join("");
        locationList.innerHTML = listData;
    }
}    

function changeBackground() {
    let button = document.getElementById("search");
    button.style.backgroundImage = "none";
    button.style.color = "teal";
    button.style.border = "2px solid teal";
}
function oldBackground() {
    let button = document.getElementById("search");
    button.style.backgroundImage = "linear-gradient(to left, rgb(1, 100, 100), teal, #00cccc)";
    button.style.color = "white";
    button.style.border = "none";
}

function popUpOpen() {
    myDatePicker.open();
}

function peopleOpen() {
    var popup = document.getElementById("peoplePopUp");
    popup.style.display = "block";
    popup.addEventListener("mouseover", (e) => {
        window.onclick = function(event){
            if(event.target == popup){
                popup.style.display = "none";
            }
        }
    })
}

function addPeople(id) {
    let button = document.getElementById(id);
    var number = parseInt(button.innerText) + 1;
    button.innerHTML = number;
}

function subPeople(id){

    let button = document.getElementById(id);

    if (parseInt(button.innerText) >= 1 && id != 'room' && id != "adult"){
        var number = parseInt(button.innerText) - 1;
        button.innerHTML = number;
    }

    if (parseInt(button.innerText) >= 2 && (id == 'room' || id == "adult")){
        var number = parseInt(button.innerText) - 1;
        button.innerHTML = number;
    }
}

function savePeople(){

    let adult = parseInt(document.getElementById("adult").innerText);
    let child = parseInt(document.getElementById("child").innerText);
    let baby = parseInt(document.getElementById("baby").innerText);
    let room = parseInt(document.getElementById("room").innerText);
    let people = adult+child+baby;

    document.getElementById("peopleNumber").value = `${people} Kişi | ${room} Oda`
    document.getElementById("peoplePopUp").style.display = "none"
}

function buttonSearch(){
    document.getElementById("caption2").style.display = "none";
    document.location.reload(false);
}

function openFilterPoint(){
    document.getElementById("dropdown-container").style.display = "block"
}

function openView(view){
    document.getElementById(view).style.display = "block";
}

function closeView(view){
    document.getElementById(view).style.display = "none";
}

function monthDropDownOpen(){
    let month = [12,11,10,9,8,7,6,5,4,3,2,1];
    for(let monthDay of month){
        document.getElementById("months").insertAdjacentHTML("afterbegin",
        `<option>${monthDay.toString()}</option>`
        );
    }
}

function yearDropDownOpen(){
    let year = [2033,2032,2031,2030,2029,2028,2027,2026,2025,2024,2023,2022];
    for(let yearNumber of year){
        document.getElementById("years").insertAdjacentHTML("afterbegin",
        `<option>${yearNumber.toString()}</option>`
        );
    }
}

function setNumber(number){
    document.getElementById("month").value = number
}


function autocomplete(inp, arr) {
    
    var currentFocus;
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            b = document.createElement("div");
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            b.addEventListener("click", function(e) {
                inp.value = this.getElementsByTagName("input")[0].value;
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });

    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          currentFocus++;
          addActive(x);
        } else if (e.keyCode == 38) {
          currentFocus--;
          addActive(x);
        } else if (e.keyCode == 13) {
          e.preventDefault();
          if (currentFocus > -1) {
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      if (!x) return false;
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
  }



/*function searchCity(){
    
    var currentFocus;

    locationInput.addEventListener("input", function(e) {

        var a, b, i, val = this.value;
        closeAllList();

        if(!val){return false;}

        currentFocus = -1;

        a = document.createElement("div");
        a.setAttribute("id",this.id+ "autocomplete-list")
        a.setAttribute("class","autocomplete-items")

        this.parentNode.appendChild(a);

        for(i = 0; i < cities.length; i++){
            if(cities[i].substr(0,val.length).toUpperCase() == val.toUpperCase()){
                b.document.createElement("div");
                b.innerHTML = "<strong>"+cities[i].substr(0,val.length)+"</strong>";
                b.innerHTML += cities[i].substr(val.length);
                b.innerHTML += "<input type='hidden' value='"+cities[i]+"'>";
                b.addEventListener("click", function(e) {
                    search.value = this.getElementsByTagName("input")[0].value;
                    closeAllList();
                });
                a.appendChild(b);
            }
        }
    });

    locationInput.addEventListener("keydown",function(e){
        var x = document.getElementById(this.id+"autocomplete-list");
        if (x) x = x.getElementsByTagName("div");

        if(e.keyCode == 40){
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) {
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13){
            e.preventDefault();
            if(currentFocus > -1){
                if(x) x[currentFocus].click();
            }
        }
    });

    function addActive(x){
        if(!x) return false;
        removeActivity(x);
        if(currentFocus >= x.length) currentFocus = 0;
        if(currentFocus < 0) currentFocus = (x.length-1);
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActivity(x){
        for ( var i=0; i<x.length; i++){
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllList(element){
        var x = document.getElementsByClassName("autocomplete-list");
        for (var i=0; i<x.length; i++){
            if(element != x[i] && element != search){
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    document.addEventListener("click", function(e){
        closeAllList(e.target);
    })

}*/