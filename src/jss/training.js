// Function that auto selects <select> on split view on load
window.onload = function() {
    // Set the select element to the default value
    document.getElementById('select_split').value = 'select_split';
    // Hide all workout tables when the page reloads
    document.getElementById('ppl_table').style.display = 'none';
    document.getElementById('fullbody_table').style.display = 'none';
    document.getElementById('upperlower_table').style.display = 'none';
    document.getElementById('Max_Split').style.display = 'none';
};

// Function for only showing the selected split
function select_Workout(value) {
    // Hide all workout tables
    document.getElementById('ppl_table').style.display = 'none';
    document.getElementById('fullbody_table').style.display = 'none';
    document.getElementById('upperlower_table').style.display = 'none';
    document.getElementById('Max_Split').style.display = 'none';

    // Show selected table
    if (value === 'PPL') {
        document.getElementById('ppl_table').style.display = 'block';
    } else if (value === 'Full Body') {
        document.getElementById('fullbody_table').style.display = 'block';
    } else if (value === 'Upper/Lower') {
        document.getElementById('upperlower_table').style.display = 'block';
    } else if (value === 'Max_Split') {
        document.getElementById('Max_Split').style.display = 'block';
    }
}

// Workout Plan Generator
// gathering user inputs
function generateWorkoutSplit() {
    let hours = document.getElementById('hours').value;
    let goal = document.getElementById('goal').value;

    // Get all selected days
    let selectedDays = Array.from(document.querySelectorAll('input[name="workoutDays"]:checked')).map(checkbox => checkbox.value);
    let days = selectedDays.length; // Number of selected days

    if (days === 0) {
        alert("Please select at least one day for your workouts.");
        return;
    }

    // Calling algorithm function with these inputs
    let result = suggestSplit(days, hours, goal, selectedDays);

    // Displaying result table
    document.getElementById('result').innerHTML = result;

    // Create the CSV data from the table
    let csvContent = createCSV(result);

    // Create a download button
    let downloadButton = document.createElement('a');
    downloadButton.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
    downloadButton.download = 'workout_split.csv';
    downloadButton.innerHTML = 'Download Workout Split';

    // Append the download button to the page
    document.getElementById('result').appendChild(downloadButton);
}

    // to do: days <=7, <=6 and so forth
    // to do: plans based on hours
    // Change goal to emphasis, add specific muscles or regions
    // to add:workout plans (these are splits)
    // to add split preference
    function suggestSplit(days, hours, goal, selectedDays) {
        let tableHTML = '<table><tr><th>Day</th><th>Workout</th></tr>';
    
        // List of all days in a week
        let allDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
        // Day to index mapping
        const dayIndices = {
            'Monday': 0,
            'Tuesday': 1,
            'Wednesday': 2,
            'Thursday': 3,
            'Friday': 4,
            'Saturday': 5,
            'Sunday': 6
        };
    
        // Get the indices of the selected days
        let selectedIndices = selectedDays.map(day => dayIndices[day]);
    
        // Sort the indices to check the rest days between workouts
        selectedIndices.sort((a, b) => a - b);
    
        // Array to store the number of rest days between selected workout days
        let restDaysBetween = [];
    
        // treat Sunday and Monday as consecutive days
        if (selectedIndices.includes(dayIndices['Sunday']) && selectedIndices.includes(dayIndices['Monday'])) {
            restDaysBetween.push(0);
        }
    
        // Calculate rest days between each selected workout days
        for (let i = 0; i < selectedIndices.length - 1; i++) {
            let restDays = selectedIndices[i + 1] - selectedIndices[i] - 1;
            restDaysBetween.push(restDays);  // Add the number of rest days between two selected days
        }
    
        // variable to track which workout to assign on selected days
        let workoutIndex = 0;
    
        // Initialize workout plan
        let workoutPlan = [];

        // Plan based on selected days, hours, and the number of rest days between
        // Plan for 1 day and 1 hour
        if (selectedDays.length === 1 && hours == "1") {
            if (goal === 'build muscle') {
                workoutPlan = ['Full Body workout']; 
            } else if (goal === 'lose weight') {
                workoutPlan = ['Full Body workout'];  
            }
            } else if (goal === 'general fitness') {
                workoutPlan = ['Full Body workout'];
        }
        // Plan for 1 day and 1 to 2 hours
        if (selectedDays.length === 1 && hours == "1-2") {
            if (goal === 'build muscle') {
                workoutPlan = ['Full Body workout']; 
            } else if (goal === 'lose weight') {
                workoutPlan = ['Full Body workout with 10-20 Minutes of cardio'];  
            }
        } else if (goal === 'general fitness') {
            workoutPlan = ['Full Body workout with 10 minutes of cardio'];
        }
        // Plan for 1 day and idc
        if (selectedDays.length === 1 && hours == "idc") {
            if (goal === 'build muscle') {
                workoutPlan = ['Full Body workout 10 Minutes of cardio']; 
            } else if (goal === 'lose weight') {
                workoutPlan = ['Full Body workout with 20-35 Minutes of cardio'];  
            }
            } else if (goal === 'general fitness') {
                workoutPlan = ['Full Body workout with 20 Minutes of cardio'];
        }

        //Plan for 2 Days and 1 hour
        if (selectedDays.length === 2 && hours == "1") {
            if (goal === 'build muscle') {
                if (restDaysBetween[0] === 0) {  // If there are no rest days between
                    workoutPlan = ['Upper Body', 'Lower Body'];
                } else if (restDaysBetween[0] === 1) {  // One rest day between
                    workoutPlan = ['Upper body', 'Lower Body'];
                } else {
                    workoutPlan = ['Full Body', 'Full Body'];
                }
            } else if (goal === 'lose weight') {
                if (restDaysBetween[0] === 0) {
                    workoutPlan = ['Cardio', 'Full Body'];
                } else {
                    workoutPlan = ['Cardio', 'Full Body'];
                }
            } else if (goal === 'general fitness') {
                if (restDaysBetween[0] === 0) {
                    workoutPlan = ['10 minutes of cardio with a Upper Body workout', 'Lower Body'];
                } else {
                    workoutPlan = ['10 minutes of cardio with a Upper Body workout', 'Lower Body'];
                }
            }
        }

        //Plan for 2 Days and 1-2 hours
        //build muscle
        if (selectedDays.length === 2 && hours == "1-2") {
            if (goal === 'build muscle') {
                if (restDaysBetween[0] === 0) {  // If there are no rest days between
                    workoutPlan = ['Upper Body', 'Lower Body'];
                } else if (restDaysBetween[0] === 1) {  // one rest day between
                    workoutPlan = ['Upper body', 'Lower Body'];
                } else {
                    workoutPlan = ['Full Body', 'Full Body'];
                }
            } 
                //lose weight
                 else if (goal === 'lose weight') {
                if (restDaysBetween[0] === 0) { // If there are no rest days between
                    workoutPlan = ['Upper Body with 30 min of cardio', 'Lower Body with 30 min of cardio'];
                } 
                else if (restDaysBetween[0] === 1) { // If there are one rest days inbetween
                    workoutPlan = ['Upper Body with 30 min of cardio', 'Lower Body with 30 min of cardio'];
                }
                else {
                    workoutPlan = ['Full Body with 20 min of cardio', 'Full Body with 20 min of cardio'];
                }
            } 
                //general fitness
                else if (goal === 'general fitness') {
                if (restDaysBetween[0] === 0) {
                    workoutPlan = ['Upper Body with 15 minutes of zone 2-3 cardio', 'Lower Body with 15 minutes of zone 2-3 cardio'];
                } else {
                    workoutPlan = ['Full Body with 15 minutes of zone 2-3 cardio', 'Full Body with 15 minutes of zone 2-3 cardio'];
                }
            }
        }

        //Plan for 2 Days and idc hours
        //build muscle
        if (selectedDays.length === 2 && hours == "idc") {
            if (goal === 'build muscle') {
                if (restDaysBetween[0] === 0) {  // If there are no rest days between
                    workoutPlan = ['Upper body with 15 minutes of zone 1-3 cardio', 'Lower Body with 15 minutes of zone 1-3 cardio'];
                } else if (restDaysBetween[0] === 1) {  // one rest day between
                    workoutPlan = ['Upper body with 15 minutes of zone 1-3 cardio', 'Lower Body with 15 minutes of zone 1-3 cardio'];
                } else {
                    workoutPlan = ['Full Body with 15 minutes of zone 1-3 Cardio', 'Full Body with 15 minutes of zone 1-3 Cardio'];
                }
            } 
                //lose weight
                 else if (goal === 'lose weight') {
                if (restDaysBetween[0] === 0) { // If there are no rest days between
                    workoutPlan = ['Upper Body with 30 min of Zone 3 - Zone 5 cardio', 'Lower Body with 30 min of Zone 3 - Zone 5 cardio'];
                } 
                else if (restDaysBetween[0] === 1) { // If there is one rest days inbetween
                    workoutPlan = ['Upper Body with 30 min of Zone 3 - Zone 5 cardio', 'Lower Body with 30 min of Zone 3 - Zone 5 cardio'];
                }
                else {
                    workoutPlan = ['Full Body with 30 min of Zone 3 - Zone 5 cardio', 'Full Body with 30 min of Zone 3 - Zone 5 cardio'];
                }
            } 
                //general fitness
                else if (goal === 'general fitness') {
                if (restDaysBetween[0] === 0) {
                    workoutPlan = ['Upper Body with 15 minutes of zone 2-3 cardio', 'Lower Body with 15 minutes of zone 2-3 cardio'];
                } else if (restDaysBetween[0] === 1) {
                    workoutPlan = ['Upper Body with 15 minutes of zone 2-3 cardio', 'Lower Body with 15 minutes of zone 2-3 cardio'];
                }
                else{
                    workoutPlan = ['Full Body with 15 minutes of zone 2-3 cardio', 'Full Body with 15 minutes of zone 2-3 cardio'];
                }
            }
        }
        // Plan for 3 days and 1 Hour
        // Build Muscle
        else if (selectedDays.length === 3 && hours == "1") {
            if (goal === 'build muscle') {
                workoutPlan = ['Push', 'Pull', 'Legs'];
            }
            // Lose weight      
            else if (goal === 'lose weight') {
                workoutPlan = ['Upper body', 'Zone 3-5 Cardio', 'Lower Body'];
            }
            // general fitness
            else if (goal === 'general fitness') {
                workoutPlan = ['Push', 'Pull', 'Legs'];
            }
        }
        
        // Plan for 3 days and 1-2 Hours
        // Build Muscle
        else if (selectedDays.length === 3 && hours == "1-2") {
            if (goal === 'build muscle') {
                workoutPlan = ['Push with 10 minutes of zone 2 cardio', 'Pull with 10 minutes of zone 2 cardio', 'Legs'];
            }
            // Lose weight      
            else if (goal === 'lose weight') {
                workoutPlan = ['Push with 15 minutes of zone 3 cardio', 'Pull with 10 minutes of zone 3 cardio', 'Legs'];
            }
            // general fitness
            else if (goal === 'general fitness') {
                workoutPlan = ['Push with 10 minutes of zone 2 cardio', 'Pull with 10 minutes of zone 2 cardio', 'Legs'];
            }
        }

        else if (selectedDays.length === 4 && hours == "1") {
            workoutPlan = ['Chest and Triceps', 'Back and Biceps', 'Legs', 'Shoulders and Abs'];
        } 
        else if (selectedDays.length === 5 && hours == "1") {
            workoutPlan = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms'];
        }
    
        // Start the table and create the first row for the days of the week
        tableHTML = '<table>';

        // First row:
        tableHTML += '<tr><th>Day</th>';
        for (let i = 0; i < allDays.length; i++) {
            let day = allDays[i];
            tableHTML += `<th>${day}</th>`;
        }
        tableHTML += '</tr>';

        // Second row:
        tableHTML += '<tr><th>Workout</th>';
        for (let i = 0; i < allDays.length; i++) {
            let day = allDays[i];

            if (selectedDays.includes(day)) {
                // workout for the selected day
                tableHTML += `<td>${workoutPlan[workoutIndex]}</td>`;
                workoutIndex++;  // Move to the next workout in the plan
            } else {
                // "Rest" for unselected days
                tableHTML += '<td>Rest</td>';
            }
        }
        tableHTML += '</tr>';

        tableHTML += '</table>';
        return tableHTML;
        }

        // Download table as csv file
        function createCSV(tableHTML) {
            let rows = tableHTML.match(/<tr>(.*?)<\/tr>/g).map(row => 
                row.replace(/<\/?(tr|td|th)>/g, '').split('</td><td>').join(',')
            );
            return rows.join('\n');
        }