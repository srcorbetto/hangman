$(document).ready(function(){

  // List of variables
  var numberOfGuesses = 7;
  // Used to store the links to the hangman images
  var bodyParts = [];
  var wins = 0;
  var losses = 0;
  var randomWords = ["pizza", "anime", "weezer", "ukulele", "ficus", "boop", "potato", "muscles", "hipster", "pepperoni", "history", "cartoons"];
  var selectedWord;
  var selectedWordLetters = [];
  var revealedLetters = []; // Compare this to selectedWordLetters
  var keyPressed;
  var acceptedInput = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  var guessedLetters = [];
  var readyToPlay = false;

  // Randomly select a word from the randomWord array and assign to the selectedWord
  function selectWord() {
    // Stores a ref # to how many entries are in the randomWord array
    var maxNumber = randomWords.length;
    console.log(maxNumber);

    // This random # is the key value to selecting the random word
    var randomNumber = Math.floor(Math.random() * maxNumber);
    console.log(randomNumber);

    // Select the random word
    selectedWord = randomWords[randomNumber];
    // Split into array
    selectedWordLetters = selectedWord.split("");
    console.log(selectedWord);
    console.log(selectedWordLetters);

    // Generate the placeholder for word
    revealWord(selectedWordLetters);
  };

  // Reset the variables
  function valueReset() {
    numberOfGuesses = 7;
    revealedLetters = [];
    guessedLetters = [];
    acceptedInput = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    $(".guesses").text(numberOfGuesses);
    $(".guessed-letters").text("");
    $(".drawing-2").attr("src", "assets/img/drawing-2-start.png");
    $(".drawing-4").attr("src", "assets/img/blank.png");
    $(".drawing-6").attr("src", "assets/img/blank.png");
  };

  // Updates the user's progress
  function revealWord(letterArray) {
    // Reset values
    valueReset();
    for(i = 0; i < letterArray.length; i++) {
      revealedLetters.push("_");
    };
    // Removes the commas for new _ _
    $(".word").text(revealedLetters.join(" "));
  };

  // Take in keyboard strokes and evaluate game conditions
  document.onkeyup = function(e) {

    if (readyToPlay === true) {

      keyPressed = e.key;

    // Loop through the acceptedInput to see if keyPressed matches
    for(i = 0; i < acceptedInput.length; i++) {
      if (keyPressed === acceptedInput[i]) {

         // Push to guessed letters
        guessedLetters.push(keyPressed);
        $(".guessed-letters").text(guessedLetters.join(" "));

        // Pull out of accepted input
        acceptedInput.splice(i, 1);

        compareLetters(keyPressed);
      }
    }

    // Function to evaluate the key pressed once it's confirmed it's an accepted input
    function compareLetters(letter) {
       // Count how many times a number matches
      var numberOfNonMatches = 0;
      for(i = 0; i < selectedWordLetters.length; i++) {
      
        if (letter === selectedWordLetters[i]) {
          // Reveal the letter
          revealedLetters[i] = letter;
          $(".word").text(revealedLetters.join(" "));

          // See if the user has matched the word
          if (revealedLetters.join() === selectedWordLetters.join()) {
            // Adds a win and starts the game over
            wins++;
            readyToPlay = false;
            $(".wins").text(wins);
            $(".modal-start h2").text("You Won!");
            $(".modal-start p").text("Press NEW GAME! to play again.");
            $(".modal-start button").text("NEW GAME!");
            $(".modal-start").removeClass("hidden");
            $(".modal-start button").on("click", function(){
              $(".modal-start").addClass("hidden");
              readyToPlay = true;
              selectedWord();
            });
          };
      
        } else if (keyPressed !== selectedWordLetters[i]) {
          numberOfNonMatches++;
        }
      }

      // If guessed letter matches nothing...
      if (numberOfNonMatches === selectedWordLetters.length) {
        // Decrease score
        numberOfGuesses--;

        // Update the hangman images
        if (numberOfGuesses === 6) {
          $(".drawing-2").attr("src", "assets/img/drawing-2-middle.png");
          $(".drawing-4").attr("src", "assets/img/drawing-4-start.png");
        } else if (numberOfGuesses === 5) {
          $(".drawing-4").attr("src", "assets/img/drawing-4-middle.png");
          $(".drawing-6").attr("src", "assets/img/drawing-6-start.png");
        } else if (numberOfGuesses === 4) {
          $(".drawing-4").attr("src", "assets/img/drawing-4-middle-2.png");
        } else if (numberOfGuesses === 3) {
          $(".drawing-4").attr("src", "assets/img/drawing-4-end.png");
        } else if (numberOfGuesses === 2) {
          $(".drawing-6").attr("src", "assets/img/drawing-6-middle.png");
        } else if (numberOfGuesses === 1) {
          $(".drawing-6").attr("src", "assets/img/drawing-6-end.png");
        }

        if (numberOfGuesses === 0) {
          $(".drawing-2").attr("src", "assets/img/drawing-2-end.png");
          
          losses++;
          readyToPlay = false;
          $(".losses").text(losses);
          $(".modal-start h2").text("You Lose!");
          $(".modal-start p").text("Press NEW GAME! to play again.");
          $(".modal-start button").text("NEW GAME!");
          $(".modal-start").removeClass("hidden");
          $(".modal-start button").on("click", function(){
            $(".modal-start").addClass("hidden");
            readyToPlay = true;
            selectedWord();
          });
        }
      }
    };

    };

  }; //end keyup...

  // Initialize Values
  $(".wins").text(wins);
  $(".losses").text(losses);

  // Starts the game
  $(".modal-start button").on("click", function(){
    $(".modal-start").addClass("hidden");
    readyToPlay = true;
    selectWord();
  });

});