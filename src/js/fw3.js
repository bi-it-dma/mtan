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

// Select elements for validation feedback
const passwordInput = document.getElementById("password");
const letter = document.getElementById("letter");
const capital = document.getElementById("capital");
const number = document.getElementById("number");
const length = document.getElementById("length");

// Event listener for real-time input
passwordInput.addEventListener("input", () => {
    const value = passwordInput.value;

    // Validate lowercase letters
    const lowerCaseLetters = /[a-z]/g;
    if (value.match(lowerCaseLetters)) {
        letter.classList.add("valid");
        letter.classList.remove("invalid");
    } else {
        letter.classList.add("invalid");
        letter.classList.remove("valid");
    }

    // Validate uppercase letters
    const upperCaseLetters = /[A-Z]/g;
    if (value.match(upperCaseLetters)) {
        capital.classList.add("valid");
        capital.classList.remove("invalid");
    } else {
        capital.classList.add("invalid");
        capital.classList.remove("valid");
    }

    // Validate numbers
    const numbers = /[0-9]/g;
    if (value.match(numbers)) {
        number.classList.add("valid");
        number.classList.remove("invalid");
    } else {
        number.classList.add("invalid");
        number.classList.remove("valid");
    }

    // Validate length
    if (value.length >= 8) {
        length.classList.add("valid");
        length.classList.remove("invalid");
    } else {
        length.classList.add("invalid");
        length.classList.remove("valid");
    }
});

// Show message box when password field is selected
passwordInput.onfocus = function () {
    document.getElementById("message").style.display = "block";
};

// Optionally, hide the message box when the password field is blurred (not in focus)
passwordInput.onblur = function () {
    document.getElementById("message").style.display = "none";
};