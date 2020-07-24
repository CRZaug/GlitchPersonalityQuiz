var questionCount = 0;
var questionScores = [0, 0, 0, 0]; // 4 Possible results
var correspondingResultsNames = [
  "Beyoncé",
  "Elvis Presley",
  "Taylor Swift",
  "Barack Obama"
];
var correspondingResultsPara = [
  "You are Beyoncé: Beloved American singer, songwriter, record producer, dancer, and actress. Quite frankly, we're not sure how you found this quiz, but we are blessed that you are here. We can't wait for the release of your new visual album!",
  "You are Elvis Presley: American singer and actor. Not really sure how this is possible, seeing that you passed in 1977. It seems the rumors are true and you actually are still alive? Anyhow, not sure that some of your actions will put you in a great light here in modern day, so good luck.",
  "Taylor Swift: American singer-songwriter. You've made a musical transition from country to pop over the course of your career, and are set to release a new album soon after the last one flopped a little. Surprised you have time to peruse random quizzes online, but thanks for stopping by!",
  "Barack Obama: American political and attorney who served as the 44th president of the United States from 2009 to 2017. Boy, we're sure missing you right now. Amazing that you found yourself to a lowly personality quiz online. We hope that you use this reminder of who you are to become re-energized in the fight for social justice."
];

var correspondingResultsImage = [
  "https://upload.wikimedia.org/wikipedia/commons/3/34/Beyonce_Performing_at_Coachella.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Elvis_Presley_promoting_Jailhouse_Rock.jpg/794px-Elvis_Presley_promoting_Jailhouse_Rock.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/b/b5/191125_Taylor_Swift_at_the_2019_American_Music_Awards_%28cropped%29.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/President_Barack_Obama_%28cropped%29_4.jpg/503px-President_Barack_Obama_%28cropped%29_4.jpg"
];

// For results and restarting the quiz
var result = document.getElementById("result");
var resultText = document.getElementById("resultText");
var imgR = document.createElement("img");
var restart = document.getElementById("restart");

// Add in event listeners for the questions
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 4; j++) {
    let ele = document.getElementById("q" + i + "a" + j);
    ele.addEventListener("click", updateScore);
    ele.questionParam = i;
    ele.answerParam = j;
  }
}

// Add an event listener for the restart button
restart.addEventListener("click", restartQuiz);

// Update score function
function updateScore(evt) {
  let i = evt.currentTarget.questionParam;
  let j = evt.currentTarget.answerParam;
  questionCount += 1;
  questionScores[j - 1] += 1; // Up the score count
  console.log(questionScores);

  //   Disable the buttons for that question (later, we want the user to be able to change their answer)
  for (let k = 1; k <= 4; k++) {
    let question = document.getElementById("q" + i + "a" + k);
    question.disabled = true;
    question.style.opacity = "50%";
  }

  if (questionCount != 3) {
    console.log("q" + (i + j));
  } else {
    updateResult();
  }
}

function updateResult() {
  let winner = Math.max.apply(Math, questionScores);
  console.log(winner);

  // There MUST be a better way to get the index of the winner than this!!
  let index = questionScores.findIndex(element => element == winner);

  if (winner == 1) {
    result.innerHTML = "Nobody.";
    resultText.innerHTML =
      "Wow, not even we know who you are. Not even science can help you. You are truly hopeless.";
  } else {
    result.innerHTML = correspondingResultsNames[index];

    imgR.src = correspondingResultsImage[index];
    imgR.width = "300";
    document.getElementById("imageGoesHere").appendChild(imgR);
    resultText.innerHTML = correspondingResultsPara[index];
  }

  restart.style.visibility = "visible";
}

// Reset everything that needs to be reset and go back to top
function restartQuiz() {
  for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 4; j++) {
      let all = document.getElementById("q" + i + "a" + j);
      all.disabled = false;
      all.style.opacity = "100%";
      result.innerHTML = "";
      resultText.innerHTML = "";
      restart.style.visibility = "hidden";
      
      questionCount = 0;
      questionScores = [0, 0, 0, 0];
      
      document
        .getElementById("quizAll")
        .scrollIntoView({ block: "start", behavior: "smooth" });
      imgR.remove();
      
    }
  }
}

// For the cool fade in effect
$(document).ready(function() {
  $("#takequiz").click(function() {
    $("#quizAll").fadeIn("slow");
    $("#takequiz").fadeOut("slow");
  });
});
