<!DOCTYPE html>
<html lang="en">
<head> 
            <!--Website Header-->
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">

            <!--Connection to stylehseet-->
            <link href="src/css/style.css" rel="stylesheet">
            <link href="src/css/fw.css" rel="stylesheet">

            <title>MTN</title>
            <meta name="description" content="test Site">
    </head>
    <body>
        <div class="flex-container">
            <div class="content main" id="fw">
                <form method="post" id="fw3">
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required>

                    <input type="submit" value="validate">
                </form>
                <input type="checkbox" onclick="pwVisible()">Show Password
                <div id="message">
                    <h3>password must contain the following:</h3>
                    <ul>
                        <li id="letter" class="invalid">At least one lowercase letter</li>
                        <li id="capital" class="invalid">At least one uppercase letter</li>
                        <li id="number" class="invalid">At least one digit</li>
                        <li id="length" class="invalid">Minimum of 8 characters</li>
                    </ul>
                </div>
                
                <?php
                    if (isset($_POST["password"])) {
                        $password = $_POST["password"]; 
                        $pattern = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/';

                        if (preg_match($pattern, $password)) {
                            echo "<h3 class='valid'>Valid Password</h3>";
                        } elseif (empty($password)) {
                            echo "<h3>Please enter a password</h3>";
                        } else {
                            echo "<h3 class='invalid'>Invalid Password</h3>";
                        }
                        }
                ?>
                
            </div>
        </div>
    </body>
    <script src="src/jss/fw3.js"></script>
</html>