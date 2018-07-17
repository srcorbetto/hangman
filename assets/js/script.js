$(document).ready(function(){

  // List of variables
  var numberOfGuesses = 7;
  // Used to store the links to the hangman images
  var bodyParts = [];
  var wins = 0;
  var losses = 0;
  var randomWords = ["pizza", "anime", "weezer", "ukulele"];
  var selectedWord;
  var selectedWordLetters = [];
  var revealedLetters = []; // Compare this to selectedWordLetters
  var keyPressed;
  var acceptedInput = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  var guessedLetters = [];

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

  // Starts the game
  selectWord();

  // Take in keyboard strokes and evaluate game conditions
  document.onkeyup = function(e) {
    
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
            alert("You won!!!");
            wins++;
            $(".wins").text(wins);
            selectWord();
          };
      
        } else if (keyPressed !== selectedWordLetters[i]) {
          numberOfNonMatches++;
        }
      }

      // If guessed letter matches nothing...
      if (numberOfNonMatches === selectedWordLetters.length) {
        // Decrease score
        numberOfGuesses--;
        if (numberOfGuesses === 0) {
          alert("Out of guesses. Start over.");
        }
        $(".guesses").text(numberOfGuesses);
      }
    };

  }; //end keyup...

  // Initialize Values
  $(".wins").text(wins);
  $(".losses").text(losses);
  $(".guesses").text(numberOfGuesses);

});