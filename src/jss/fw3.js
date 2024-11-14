//Aufgabe 3

// toggles password visibility by changing the input type
function pwVisible() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
    } else{
        x.type = "password";
    }
}

//to update the requirements before submitting

var myInput = document.getElementById("psw");
var letter = document.getElementById("letter");
var letter = document.getElementById("capital");
var capital = document.getElementById("number");
var letter = document.getElementById("length");
