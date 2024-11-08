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

    // Function to clear display 
    function clr() { 
        document.getElementById("result").value = "" 
    }

    let score = 0;
    let startTime;
    let timerInterval;
    let highlightedButtonIndex = -1;
    
    //generate playfield
    function generateField() {
        const gameContainer = document.getElementById('grid-container');
        gameContainer.innerHTML = ''; // Clear previous buttons if any
        score = 0;
        document.getElementById('score').innerText = `Score: ${score}`;
        startTime = new Date().getTime();
        document.getElementById('time').innerText = `Time: 0s`;
    
        // Create a 5x5 grid of buttons
        for (let i = 0; i < 25; i++) {
            const btn = document.createElement('button');
            btn.type = "button";
            btn.className = "gridButton";
            btn.innerText = i + 1;
            btn.onclick = () => checkButton(i);
            gameContainer.appendChild(btn);
        }
        
        // Start the timer and highlight a random button
        startTimer();
        highlightRandomButton();
    }
    
    function startTimer() {
        let elapsedTime = 0;
        timerInterval = setInterval(() => {
            elapsedTime = Math.floor((new Date().getTime() - startTime) / 1000);
            document.getElementById('time').innerText = `Time: ${elapsedTime}s`;
            if (elapsedTime >= 10) {
                clearInterval(timerInterval);
                alert(`Time's up! Your score: ${score}`);
                resetGame();
            }
        }, 1000);
    }
    
    function highlightRandomButton() {
        const buttons = document.querySelectorAll('.gridButton');
        // Remove the highlight from the previous button if any
        if (highlightedButtonIndex !== -1) {
            buttons[highlightedButtonIndex].classList.remove('highlighted');
        }
        
        // Choose a new random button to highlight
        highlightedButtonIndex = Math.floor(Math.random() * 25);
        buttons[highlightedButtonIndex].classList.add('highlighted');
    }
    
    function checkButton(index) {
        if (index === highlightedButtonIndex) {
            score++;
            document.getElementById('score').innerText = `Score: ${score}`;
            highlightRandomButton(); // Highlight a new random button
        }
    }
    
    function resetGame() {
        score = 0;
        document.getElementById('score').innerText = `Score: ${score}`;
        document.getElementById('time').innerText = `Time: 0s`;
        clearInterval(timerInterval);
        highlightedButtonIndex = -1;
    }
    