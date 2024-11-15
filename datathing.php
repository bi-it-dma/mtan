<!DOCTYPE html>
<html lang="en">
<head> 
    <!-- Website Header -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="src/css/style.css" rel="stylesheet">
    <link href="src/css/fw.css" rel="stylesheet">
    <title>MTN</title>
    <meta name="description" content="test Site">
</head>
<body>
    <div class="flex-container">
        <div class="content main" id="fw">
            <?php
                $mysqli = new mysqli("localhost", $username: "root", '' $database:"database");

                if ($conn->connect_error) {
                   die("Connection failed: " . $conn->connect_error); 
                }
                echo "Connected successfully"
            ?>
        </div>
    </div>
</body>
</html>
