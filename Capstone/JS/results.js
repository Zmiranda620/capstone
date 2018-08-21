"use strict";

window.addEventListener("load", function() {
    calcCart();
    writeSessionValues();
    document.getElementById("subButton").onclick = runSubmit();
})

var generalContents = ["4 MREs", "4 Road Flare", "2 Flint and Steel", "4 Blanket", "4 Sets of 4 Braces", "3 Flashlight", "2 First Aid Kits", "2 Water Purifiers", "3 Sets of Clothing", "10 Water Bottles"];
var droughtContents = ["4 MREs", "4 Road Flare", "2 Flint and Steel", "4 Blanket", "4 Sets of 4 Braces", "3 Flashlight", "2 First Aid Kits", "4 Water Purifiers", "3 Sets of Clothing", "20 Water Bottles", "4 Medium-Duty Tarps"];
var floodContents = ["4 MREs", "4 Road Flare", "2 Flint and Steel", "4 Blanket", "4 Sets of 4 Braces", "3 Flashlight", "2 First Aid Kits", "4 Water Purifiers", "3 Sets of Clothing", "20 Water Bottles", "Self-Inflating Life Raft", "6 Life Jackets"];
var earthquakeContents = ["4 MREs", "4 Road Flare", "2 Flint and Steel", "4 Blanket", "4 Sets of 4 Braces", "3 Flashlight", "2 First Aid Kits", "4 Water Purifiers", "3 Sets of Clothing", "20 Water Bottles", "Building Supplies", "Propane Tank"];
var fireContents = ["4 MREs", "4 Road Flare", "2 Flint and Steel", "4 Blanket", "4 Sets of 4 Braces", "3 Flashlight", "2 First Aid Kits", "4 Water Purifiers", "3 Sets of Clothing", "20 Water Bottles", "4 Full Water Canteens", "4 Large Fire Blankets", "4 Fire Gloves", "10 Rags"];

var packages = sessionStorage.getItem("confProduct");
var name = sessionStorage.getItem("confName");
var email = sessionStorage.getItem("confMail");
var phone = sessionStorage.getItem("confPhone");

function calcCart() {
    // var cost = document.getElementById("productBox").options[document.getElementById("productBox").selectedIndex].value;
    //  var packages = sessionStorage.getItem("confProduct");
    if (packages == 275) {
        displayContents(generalContents);
    } else if (packages == 750) {
        displayContents(droughtContents);
    } else if (packages == 1750) {
        displayContents(floodContents);
    } else if (packages == 3750) {
        displayContents(earthquakeContents);
    } else if (packages == 800) {
        displayContents(fireContents);
    }
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
            document.getElementsByTagName("span")[i].style.backgroundColor = "rgba(0, 0, 0, 0)";
        }
    }
    // This allows for less loading as the function will replace the need for nearly identical blocks of code in calculating the contents.
}

function nameProduct(value) {
    if (value == 275) {
        return "General Package";
    } else if (value == 750) {
        return "Drought Package";
    } else if (value == 1750) {
        return "Flood Package";
    } else if (value == 3750) {
        return "Earthquake Package";
    }
}

function writeSessionValues() {
    document.getElementById("name").textContent = name;
    document.getElementById("email").textContent = email;
    document.getElementById("phone").textContent = phone;
    document.getElementById("product").textContent = nameProduct(packages);
    // This displays all the stored variables into the browser.
}

function runSubmit() {
    validateCredit();
    validateNumber();
    validateMonth();
    validateYear();
    validateCVC();
}

function validateCVC() {
    var cardCVC = document.getElementById("cvc");
    var creditCard = document.querySelector('input[name="credit"]:checked'); //.value;
    if (cardCVC.validity.valueMissing) {
        cardCVC.setCustomValidity("Enter your CVC number.");
    } else if ((creditCard === "amex") && (/^\d{4}$/.test(cardCVC.value) === false)) {
        cardCVC.setCustomValidity("Enter a 4-digit CVC number.");
    } else if ((creditCard !== "amex") && (/^\d{3}$/.test(cardCVC.value) === false)) {
        cardCVC.setCustomValidity("Enter a 3-digit CVC number.");
    } else {
        cardCVC.setCustomValidity("");
    };
}

function validateMonth() {
    var cardMonth = document.getElementById("expMonth");
    if (cardMonth.selectedIndex === 0) {
        cardMonth.setCustomValidity("Select the expiration month.");
    } else {
        cardMonth.setCustomValidity("");
    };
}

function validateYear() {
    var cardYear = document.getElementById("expYear");
    if (cardYear.selectedIndex === 0) {
        cardYear.setCustomValidity("Select the expiration year.");
    } else {
        cardYear.setCustomValidity("");
    };
}

function validateNumber() {
    var cardNumber = document.getElementById("cardNumber");
    if (cardNumber.validity.valueMissing) {
        cardNumber.setCustomValidity("Enter your card number.");
    } else if (cardNumber.validity.patternMismatch) {
        cardNumber.setCustomValidity("Enter a valid credit card number.");
    } else if (luhn(cardNumber.value) === false) {
        cardNumber.setCustomValidity("Enter a legitimate credit card number.");
    } else {
        cardNumber.setCustomValidity("");
    };
}

function validateCredit() {
    // Needs Debugging
    var creditCard = document.forms.payment.elements.credit[0];
    if (creditCard.validity.valueMissing) {
        creditCard.setCustomValidity("Select your credit card.");
    } else {
        creditCard.setCustomValidity("");
    };
}

function sumDigits(numStr) {
    var digitTotal = 0;
    for (var i = 0; i < numStr.length; i++) {
        digitTotal += parseInt(numStr.charAt(i));
    }
    return digitTotal;
}

function luhn(idNum) {
    var string1 = "";
    var string2 = "";

    // Retrieves the odd numbered digits

    for (var i = idNum.length - 1; i >= 0; i -= 2) {
        string1 += idNum.charAt(i);
    }

    // Retrieves the even numbered digits and double them

    for (var i = idNum.length - 2; i >= 0; i -= 2) {
        string2 += 2 * idNum.charAt(i);
    }

    // Return whether the sum of the digits is divisible by 10
    return sumDigits(string1 + string2) % 10 === 0;
}