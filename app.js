// Game Values
let min = 1,
  max = 10,
  winningNumb = getRandomNum(min, max),
  guessesLeft = 3;

// UI Elements
const game = document.getElementById("game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.getElementById("guess-btn"),
  guessInput = document.getElementById("guess-input"),
  message = document.querySelector(".message");

// Assign UI min and max values
minNum.textContent = min;
maxNum.textContent = max;

// Listen for a guess
guessBtn.addEventListener("click", () => {
  let guess = parseInt(guessInput.value);

  // Validate - Check if guess is a number and make sure guess is between min and max
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter between ${min} and ${max}`, "red");
  }

  //Check if winning guess
  if (guess === winningNumb) {
    //disable the input
    guessInput.disabled = true;
    guessInput.style.borderColor = "green";
    guessBtn.value = "Play Again";
    guessBtn.className += "play-again";
    setMessage(`${winningNumb} is correct, YOU WIN!`, "green");
  } else {
    // This is for wrong guesses
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      // Game over - Lost
      guessInput.disabled = true;
      guessInput.style.borderColor = "red";
      guessBtn.value = "Play Again";
      guessBtn.className += "play-again";
      setMessage(`Game Over! The winning guess was ${winningNumb}`, "red");
    } else {
      // Game continues
      guessInput.style.borderColor = "red";
      guessInput.value = "";
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, "red");
    }
  }
});

//Play again - add event listener to parent since child 'play-again' will not have been created when page is loaded
game.addEventListener("mousedown", e => {
  if (e.target.className === "play-again") {
    //if user is clicking on button that now has the class of 'play-again', reload the page and start new game
    window.location.reload();
  }
});

// Set Message on UI
const setMessage = (msg, color) => {
  message.style.color = color;
  message.textContent = msg;
};

function getRandomNum(min, max) {
  // generate a whole # between whatever min and max values are saved @ the top of file
  return Math.floor(Math.random() * (max - min + 1) + min);
}
