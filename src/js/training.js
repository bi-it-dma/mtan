// window.onload{
//     let month = document.getElementById("month")   
//    }
   
let pop_splits = {
    "PPL": ['"Push" = Chest, Shoulders, Triceps,' ,'"Pull" = Back, Biceps', "Legs"],
    "Arnold": ["Chest, Back, Abs", "Shoulders, Arms, Abs", "Legs, Calfs, Abs" ],
    "Fullbody": ["Fullbody"],
    "Upper/Lower": ["Upper A", "Lower A", "Upper B", "Lower B"]
};

function populateTable() {
const table = document.getElementById("example-splits");

    // Define template with pre-filled rest Days (this assumes the 7 columns for each day)
    const template = [
        ["", "", "", "Rest", "", "", ""],
        ["", "", "", "", "", "", "Rest"],
        ["","Rest", "", "Rest", "", "Rest", "Rest"],
        ["", "", "Rest", "Rest", "", "", ""]
    ];
    // Table header row
    table.innerHTML = `
        <tr>
            <th>Plan</th>
            <th>Day 1</th>
            <th>Day 2</th>
            <th>Day 3</th>
            <th>Day 4</th>
            <th>Day 5</th>
            <th>Day 6</th>
            <th>Day 7</th>
        </tr>
    `;

    // Populate each workout split with the template for rest Days
    let splitIndex = 0;
    for (let split in pop_splits) {
        // Create a new row for each split
        let row = table.insertRow();
        let cell = row.insertCell();
        cell.innerText = split;

        // Get the workout Days for the split
        let dayPlans = pop_splits[split];
        let workoutIndex = 0;

        for (let i = 0; i < 7; i++) {
            let dayCell = row.insertCell();
            if (template[splitIndex][i] === "Rest") {
                dayCell.innerText = "Rest";
            } else {
                // Fill with workout day and loop back to the start of the workout Days if needed
                dayCell.innerText = dayPlans[workoutIndex % dayPlans.length];
                workoutIndex++;
            }
        }

        splitIndex++;
    }
}

// Call the function to populate on page load or button click
populateTable();

//keep this for later

// Get the current date
const today = new Date();

// Array of weekdays
const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function calender{
    
}
// Workout Plan Generator
function generateWorkoutSplit() {
    let splitPref = document.getElementById('split-preference').value;
    let selectedDays = Array.from(document.querySelectorAll('input[name="workoutDays"]:checked')).map(checkbox => checkbox.value);

    if (selectedDays.length === 0) {
        alert("Please select at least one day for your workouts.");
        return;
    }

    let result = suggestSplit(splitPref, selectedDays);

    // Display result table
    document.getElementById('result').innerHTML = result;

    // Create CSV and download button
    let csvContent = createCSV(result);
    let downloadButton = document.createElement('a');
    downloadButton.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
    downloadButton.download = 'workout_split.csv';
    downloadButton.innerHTML = 'Download Workout Split';
    document.getElementById('result').appendChild(downloadButton);
}

function suggestSplit(splitPref, selectedDays) {
    let allDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let workoutIndex = 0;
    let tableHTML = '<table><tr><th>Day</th><th>Workout</th></tr>';

    allDays.forEach(day => {
        if (selectedDays.includes(day)) {
            tableHTML += `<tr><td>${day}</td><td>${pop_splits[splitPref][workoutIndex]}</td></tr>`;
            workoutIndex = (workoutIndex + 1) % pop_splits[splitPref].length;
        } else {
            tableHTML += `<tr><td>${day}</td><td>Rest Day</td></tr>`;
        }
    });

    tableHTML += '</table>';
    return tableHTML;
}

function createCSV(tableHTML) {
    let rows = tableHTML.match(/<tr>(.*?)<\/tr>/g).map(row => 
        row.replace(/<\/?(tr|td|th)>/g, '').split('</td><td>').join(',')
    );
    return rows.join('\n');
}
