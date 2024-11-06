//html button
const btn1 = document.getElementById("btn1");

//open alert window when pressing on btn1
btn1.addEventListener("click", alert.bind(null, Date()));


//toggle between show and hide when clicking on the button
function dropdown(){
    document.getElementById("myDropdown").classList.toggle("show");
}

//close dropdown if user clicks outside
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
  
//calculator
    // Function to display value 
    function dis(val) { 
        document.getElementById("result").value += val 
    } 

    function calculator(event) { 
        if (event.key == '0' || event.key == '1' 
            || event.key == '2' || event.key == '3' 
            || event.key == '4' || event.key == '5' 
            || event.key == '6' || event.key == '7' 
            || event.key == '8' || event.key == '9' 
            || event.key == '+' || event.key == '-' 
            || event.key == '*' || event.key == '/') 
            document.getElementById("result").value += event.key; 
    } 

    var cal = document.getElementById("calcu"); 
    cal.onkeyup = function (event) { 
        if (event.keyCode === 13) { 
            console.log("Enter"); 
            let x = document.getElementById("result").value 
            console.log(x); 
            solve(); 
        } 
    } 

    // Function that evaluates the digit and return result 
    function solve() {
        let x = document.getElementById("result").value;
        
        // Simple validation to allow only numbers and basic operators
        if (/^[0-9+\-*/.() ]*$/.test(x)) {
            try {
                let y = eval(x); // Calculate the result
                document.getElementById("result").value = y;
            } catch (error) {
                document.getElementById("result").value = "Error"; // Show error if invalid input
            }
        } else {
            document.getElementById("result").value = "Invalid input"; // Show error if input has forbidden characters
        }
    }

    // Function that clear the display 
    function clr() { 
        document.getElementById("result").value = "" 
    } 