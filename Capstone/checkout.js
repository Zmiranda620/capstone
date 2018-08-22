/* 
 checkout.js 

author:Zyzyc 
date: 8.21.18

creating a form that will validate the checkout page

*/

"use strict";
 // create a global variable 
 var formValidity = true;

// create a function that will  change the states 
function stateselectElement () {
    alert("TEST");
}

//create a function that will determain the states or cites 

 // created a function that will be used for the createventListener().
function createEventListener() {
    var form = document.getElementsByTagName("form")[0];
    if (form.addEventListener) {
        form.addEventListener("submit", validateForm, false);
    } else if (form.attachEventListener) {
        form.attachEventListener("onsubmit", validateForm, false);
    }
}

// created event handlers 
if (window.addEventListener) {
    window.addEventListener("load", createEventListener, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", createEventListener);
}
