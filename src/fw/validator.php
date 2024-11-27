<!DOCTYPE html>
<html lang="en">
<head> 
    <!-- Website Header -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="../css/style.css" rel="stylesheet">
    <link href="../css/fw.css" rel="stylesheet">
    <title>MTN</title>
    <meta name="description" content="test Site">
</head>
<body>
    <div class="flex-container">
        <div class="content main" id="fw">
            <!-- Form to submit password -->
            <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" id="fw3">
                <label for="password">Password</label>
                <input type="password" name="password" id="password" required>
                <input type="submit" value="Validate">
            </form>
            <input type="checkbox" onclick="pwVisible()">Show Password

            <!-- PHP Validation Logic -->
            <?php
                $isLowercase = $isUppercase = $isNumber = $isLength = false;
                if (!empty($_POST["password"])) {
                    $password = $_POST["password"];
                    $isLowercase = preg_match('/[a-z]/', $password); 
                    $isUppercase = preg_match('/[A-Z]/', $password);
                    $isNumber = preg_match('/\d/', $password);
                    $isLength = strlen($password) >= 8;
                }
            ?>
            <!-- Validation Feedback -->
            <div id="message">
                <h3>Password must contain the following:</h3>
                <ul>
                    <li id="letter" class="<?php echo $isLowercase ? 'valid' : 'invalid'; ?>">At least one lowercase letter</li>
                    <li id="capital" class="<?php echo $isUppercase ? 'valid' : 'invalid'; ?>">At least one uppercase letter</li>
                    <li id="number" class="<?php echo $isNumber ? 'valid' : 'invalid'; ?>">At least one digit</li>
                    <li id="length" class="<?php echo $isLength ? 'valid' : 'invalid'; ?>">Minimum of 8 characters</li>
                </ul>
            </div>

            <!-- PHP Validation Result -->
            <?php
                if ($isLowercase && $isUppercase && $isNumber && $isLength) {
                    echo "<h3 class='valid'>Valid Password</h3>";
                } else {
                    echo "<h3 class='invalid'>Invalid Password</h3>";
                }
            ?>
        </div>
    </div>
    <script src="../js/fw3.js"></script>
</body>
</html>
