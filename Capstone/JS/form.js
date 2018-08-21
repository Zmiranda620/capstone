"use strict";

// Testing file to create some basic JS code

var fnBox = document.getElementById("fnBox");
var lnBox = document.getElementById("lnBox");
var mailBox = document.getElementById("mailBox");
var phoneBox = document.getElementById("phoneBox");
var productBox = document.getElementById("productBox");
// var reasonBox = document.getElementById("reasonBox");
var generalContents = ["4 MREs", "4 Road Flare", "2 Flint and Steel", "4 Blanket", "4 Sets of 4 Braces", "3 Flashlight", "2 First Aid Kits", "2 Water Purifiers", "3 Sets of Clothing", "10 Water Bottles"];
var droughtContents = ["4 MREs", "4 Road Flare", "2 Flint and Steel", "4 Blanket", "4 Sets of 4 Braces", "3 Flashlight", "2 First Aid Kits", "4 Water Purifiers", "3 Sets of Clothing", "20 Water Bottles", "4 Medium-Duty Tarps"];
var floodContents = ["4 MREs", "4 Road Flare", "2 Flint and Steel", "4 Blanket", "4 Sets of 4 Braces", "3 Flashlight", "2 First Aid Kits", "4 Water Purifiers", "3 Sets of Clothing", "20 Water Bottles", "Self-Inflating Life Raft", "6 Life Jackets"];
var earthquakeContents = ["4 MREs", "4 Road Flare", "2 Flint and Steel", "4 Blanket", "4 Sets of 4 Braces", "3 Flashlight", "2 First Aid Kits", "4 Water Purifiers", "3 Sets of Clothing", "20 Water Bottles", "Building Supplies", "Propane Tank"];
var fireContents = ["4 MREs", "4 Road Flare", "2 Flint and Steel", "4 Blanket", "4 Sets of 4 Braces", "3 Flashlight", "2 First Aid Kits", "4 Water Purifiers", "3 Sets of Clothing", "20 Water Bottles", "4 Full Water Canteens", "4 Large Fire Blankets", "4 Fire Gloves", "10 Rags"];

window.addEventListener("load", function() {
    calcCart();

    document.getElementById("submit").onclick = validityTest;

    fnBox.onblur = calcCart;
    lnBox.onblur = calcCart;
    mailBox.onblur = calcCart;
    phoneBox.onblur = calcCart;
    reasonBox.onblur = calcCart;
    productBox.onchange = calcCart;
})

// The below funciton needs some bugfixing
function validityTest() {
    if (fnBox.value.length == 0) {
        fnBox.setCustomValidity("Please insert your First Name");
    } else {
        fnBox.setCustomValidity("");
    }
    if (lnBox.value.length == 0) {
        lnBox.setCustomValidity("Please insert your Last Name");
    } else {
        lnBox.setCustomValidity("");
    }
    if (mailBox.value.length == 0) {
        mailBox.setCustomValidity("Please insert your Email Address");
    } else {
        mailBox.setCustomValidity("");
    }
    if (phoneBox.value.length == 0) {
        phoneBox.setCustomValidity("Please insert your Phone Number");
    } else {
        phoneBox.setCustomValidity("");
    }
    // if (fnBox.value.length == 0) {
    //     fnBox.setCustomValidity("Please insert your First Name");
    // } else {
    //     fnBox.setCustomValidity("");
    // }
}
// sessionBox.options[sessionBox.selectedIndex].textContent
function calcCart() {
    // var cost = document.getElementById("productBox").options[document.getElementById("productBox").selectedIndex].value;

    var cost = parseInt(productBox.options[productBox.selectedIndex].value);
    sessionStorage.setItem("confProduct", cost);
    if (cost == 275) {
        displayContents(generalContents);
    } else if (cost == 750) {
        displayContents(droughtContents);
    } else if (cost == 1750) {
        displayContents(floodContents);
    } else if (cost == 3750) {
        displayContents(earthquakeContents);
    } else if (cost == 800) {
        displayContents(fireContents);
    } else {
        document.getElementsByTagName("span")[1].textContent = "ERROR: Value was not able to be used;";
    }

    sessionStorage.setItem("confName", fnBox.value + " " + lnBox.value);
    sessionStorage.setItem("confMail", mailBox.value);
    sessionStorage.setItem("confPhone", phoneBox.value);

}

function displayContents(array) {
    for (var i = 0; i < document.getElementsByTagName("span").length; i++) {
        document.getElementsByTagName("span")[i].textContent = array[i];
        document.getElementsByTagName("span")[i].style.padding = "5px 15px 5px";
        document.getElementsByTagName("span")[i].style.border = "1px solid black";
        document.getElementsByTagName("span")[i].style.backgroundColor = "white";
        if (document.getElementsByTagName("span")[i].textContent != array[i]) {
            document.getElementsByTagName("span")[i].style.padding = "0px";
            document.getElementsByTagName("span")[i].style.border = "0px";
        }

    }
    // This allows for less loading as the function will replace the need for nearly identical blocks of code in calculating the contents.
}