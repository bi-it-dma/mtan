let currentView = 'week'; // Track the current view (week or month)

let pop_splits = {
    "PPL": ['"Push" = Chest, Shoulders, Triceps', '"Pull" = Back, Biceps', "Legs"],
    "Arnold": ["Chest, Back, Abs", "Shoulders, Arms, Abs", "Legs, Calfs, Abs"],
    "Fullbody": ["Fullbody"],
    "Upper/Lower": ["Upper A", "Lower A", "Upper B", "Lower B"]
};

// Function to populate a table on training.html with example split
function populateTable() {
    const table = document.getElementById("example-splits");
    const template = [
        ["", "", "", "Rest", "", "", ""],
        ["", "", "", "", "", "", "Rest"],
        ["", "Rest", "", "Rest", "", "Rest", "Rest"],
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
    let splitIndex = 0; // Initialize splitIndex here
    for (let split in pop_splits) {
        let row = table.insertRow();
        row.insertCell().innerText = split;

        let dayPlans = pop_splits[split];
        for (let i = 0; i < 7; i++) {
            let dayCell = row.insertCell();
            if (template[splitIndex][i] === "Rest") {
                dayCell.innerText = "Rest";
            } else {
                dayCell.innerText = dayPlans[i % dayPlans.length];
            }
        }
        splitIndex++; // Increment splitIndex for the next split
    }
}

// Call the function to populate on page load or button click
populateTable();

// Function to create CSV from table HTML
function createCSV(tableHTML) {
    let rows = tableHTML.match(/<tr>(.*?)<\/tr>/g).map(row => 
        row.replace(/<\/?(tr|td|th)>/g, '').split('</td><td>').join(',')
    );
    return rows.join('\n');
}

// Workout Plan Generator
function generateWorkoutSplit() {
    let splitPref = document.getElementById('split-preference').value;
    let selectedDays = Array.from(document.querySelectorAll('input[name="workoutDays"]:checked')).map(checkbox => checkbox.value);

    if (selectedDays.length === 0) {
        alert("Please select at least one day for your workouts.");
        return;
    }

    let result = currentView === 'week' ? generatePlan(splitPref, selectedDays, 'week') : generatePlan(splitPref, selectedDays, 'month');

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

function generatePlan(splitPref, selectedDays, type) {
    let tableHTML = '<table><tr><th>' + (type === 'week' ? 'Day' : 'Date') + '</th><th>Workout</th></tr>';
    let allDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let workoutIndex = 0;

    if (type === 'week') {
        allDays.forEach(day => {
            if (selectedDays.includes(day)) {
                tableHTML += `<tr><td>${day}</td><td>${pop_splits[splitPref][workoutIndex]}</td></tr>`;
                workoutIndex = (workoutIndex + 1) % pop_splits[splitPref].length;
            } else {
                tableHTML += `<tr><td>${day}</td><td>Rest Day</td></tr>`;
            }
        });
    } else if (type === 'month') {
        let monthDays = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        for (let day = 1; day <= monthDays; day++) {
            let date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            let dayName = date.toLocaleString('default', { weekday: 'long' });

            if (selectedDays.includes(dayName)) {
                tableHTML += `<tr><td>${date.toDateString()}</td><td>${pop_splits[splitPref][day % pop_splits[splitPref].length]}</td></tr>`;
            } else {
                tableHTML += `<tr><td>${date.toDateString()}</td><td>Rest Day</td></tr>`;
            }
        }
    }

    tableHTML += '</table>';
    return tableHTML;
}