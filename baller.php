<!DOCTYPE html>
<html lang="en" id="boll">
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
  <body id="boll">
    <div class="ball">
        <form method="post">
          <input type="text" name="question" placeholder="What is your question?" />
          <input type="submit" value="Ask the Magic 8-Ball" />
        </form>
        <img src="src/pictures/8boll.png" id="ball-pic">
        <p>
            <?php
            if (isset($_POST["question"])) {
                echo htmlspecialchars($_POST["question"]);
            }
            ?>
        </p>
    </div>
    <div>
    <?php
        $message = ""; // Default message

      if ($_SERVER["REQUEST_METHOD"] == "POST") {
        switch (rand(0, 19)) {
          case 0:
            $message = "It is certain.\n";
            break;
          case 1:
            $message =  "It is decidedly so.\n";
            break;
          case 2:
            $message =  "Without a doubt.\n";
            break;
          case 3:
            $message =  "Yes - definitely.\n";
            break;
          case 4:
            $message =  "You may rely on it.\n";
            break;
          case 5:
            $message =  "As I see it, yes.\n";
            break;
          case 6:
            $message =  "Most likely.\n";
            break;
          case 7:
            $message =  "Outlook good.\n";
            break;
          case 8:
            $message =  "Yes.\n";
            break;
          case 9:
            $message =  "Signs point to yes.\n";
            break;
          case 10:
            $message =  "Reply hazy, try again.\n";
            break;
          case 11:
            $message =  "Ask again later.\n";
            break;
          case 12:
            $message =  "Better not tell you now.\n";
            break;
          case 13:
            $message =  "Cannot predict now.\n";
            break;
          case 14:
            $message =  "Concentrate and ask again.\n";
            break;
          case 15:
            $message =  "Don't count on it.\n";
            break;
          case 16:
            $message =  "My reply is no.\n";
            break;
          case 17:
            $message =  "My sources say no.\n";
            break;
          case 18:
            $message =  "Outlook not so good.\n";
            break;
          case 19:
            $message =  "Very doubtful.\n";
            break;
          }
        }
    ?>
    </div>
    <div>
      <p class="response">The Magic 8-Ball says</p>
      <?= $message ?>
      </div>
      <footer>
        <a href="fw.html">TAKE ME BACK</a>
      </footer>
  </body>
</html>