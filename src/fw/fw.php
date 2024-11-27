<!DOCTYPE html>
<html lang="en" id="boll">
    <head> 
            <!--Website Header-->
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">

            <!--Connection to stylehseet-->
            <link href="../css/style.css" rel="stylesheet">
            <link href="../css/fw.css" rel="stylesheet">

            <title>MTN</title>
            <meta name="description" content="test Site">
    </head>
    <!-- fachwoche 3.3 -->
    <body>
        <!-- aufgabe 1 -->
        <div class="flex-container">
            <section class="fw">
                <div>
                    <?php
                    if (isset($_GET['name'])) {
                        $name = htmlspecialchars($_GET['name']); // turn input into html to avoid bs
                        echo "<h2>welcome $name!</h2>";
                    } else {
                        echo "Hello, guest!";
                    }
                    ?>
                </div>
                <!-- aufgabe 2 -->
                <div class="ball">
                    <?php echo "<h3>would you like to ask our 8-Ball a question?</h3>" ?>
                    <img src="../pictures/8boll.png" id="ball-pic">
                    <a href="baller.php">Yesss</a>
                </div>
            </section>
            <section class="fw">
                <h3>Or rather validate your password?</h3>
                <a href="validator.php">Yeaahh</a>
            </section>
            <section class="fw">
                <h3>Data Bank test</h3>
                <a href="db-con.php">Click me pls</a>
            </section>
        </div>
    </body>
</html>
