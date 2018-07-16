$(document).ready(function(){

  // Test connection
  console.log("script.js connected.");

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

  function revealWord(letterArray) {
    for(i = 0; i < letterArray.length; i++) {
      revealedLetters.push("_");
    };
    // Removes the commas
    $(".word").text(revealedLetters.join(" "));
  };

  selectWord();

  // Print the word to the client

  // Print the wins and losses to the client
  console.log("Wins: " + wins);
  console.log("Losses: " + losses);

  // Take in keyboard strokes and evaluate game conditions
  // Make sure the keyup === acceptedInput
  document.onkeyup = function(e) {
    
    keyPressed = e.key;
    console.log(keyPressed);

    // Loop through the acceptedInput to see if keyPressed matches
    for(i = 0; i < acceptedInput.length; i++) {
      if (keyPressed === acceptedInput[i]) {
      
        console.log("Letter Pressed");

         // Push to guessed letters
        guessedLetters.push(keyPressed);
        $(".guessed-letters").text(guessedLetters.join(" "));

        // Pull out of accepted input
        acceptedInput.splice(i, 1);
       
        console.log(acceptedInput);
        compareLetters(keyPressed);
      }
    }

    function compareLetters(letter) {
       // Count how many times a number matches
      var numberOfNonMatches = 0;
      for(i = 0; i < selectedWordLetters.length; i++) {
      
        if (letter === selectedWordLetters[i]) {
          // Reveal the letter
          revealedLetters[i] = letter;
          $(".word").text(revealedLetters.join(" "));

          console.log("Letter match");
      
        } else if (keyPressed !== selectedWordLetters[i]) {
          console.log("Letter doesn't Match")
          numberOfNonMatches++;
          console.log("number of non matches: " + numberOfNonMatches);
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
        console.log("Guesses remaining: " +  numberOfGuesses);
      }
    };

  }; //end keyup...

  // Initialize Values
  $(".wins").text(wins);
  $(".losses").text(losses);
  $(".guesses").text(numberOfGuesses);

});