var varONE, varTWO, answer;
var save, save2;

function generateAndDisplay() {
  varONE = Math.floor(Math.random() * 13);
  varTWO = Math.floor(Math.random() * 13);
  answer = varONE * varTWO;
  document.getElementsByClassName("var1")[0].innerHTML = varONE.toString();
  document.getElementsByClassName("var2")[0].innerHTML = varTWO.toString();
}

function getFunSubmit() {
  var funSubmits = [
    "flipInX",
    "bounce",
    "pulse",
    "jackInTheBox",
    "rubberBand",
    "tada"
  ];
  return funSubmits[Math.floor(Math.random() * funSubmits.length)];
}
function skipProblem() {
  document.querySelector(".getskip").removeEventListener("click", skipProblem);
  animateCSS(".answerbox", "wobble", () => {
    document.querySelector(".getskip").addEventListener("click", skipProblem);
  });
  generateAndDisplay();
  document.getElementsByClassName("answerbox")[0].value = "";
  document.getElementsByClassName("answerbox")[0].focus();
  document.getElementsByClassName("answerbox")[0].select();
}

function showSolution() {
  document
    .querySelector(".problemSTEPS")
    .setAttribute("style", "display: flex");
  document
    .querySelector(".problemOPTIONS")
    .setAttribute("style", "display:none;");
  document.getElementsByClassName("answerbox")[0].focus();
  document.getElementsByClassName("answerbox")[0].select();
}

function hideSolution() {
  document
    .querySelector(".problemSTEPS")
    .setAttribute("style", "display: none");
  document
    .querySelector(".problemOPTIONS")
    .setAttribute("style", "display:flex;");
}

document.addEventListener("DOMContentLoaded", function() {
  var save = document.querySelector(".answerbox").getAttribute("style");
  var save2 = document
    .querySelector(".problemDispProblem")
    .getAttribute("style");
  generateAndDisplay();
  document
    .getElementsByClassName("answerbox")[0]
    .addEventListener("keypress", function(event) {
      if (event.keyCode == 13) {
        event.preventDefault();
        submitAnswer();
      }
    });
  document
    .getElementsByClassName("answerbutton")[0]
    .addEventListener("click", () => {
      submitAnswer();
    });
  document.querySelector(".getskip").addEventListener("click", skipProblem);
  document.querySelector(".gethelp").addEventListener("click", showSolution);
});

function submitAnswer() {
  var userAnswer = document.getElementsByClassName("answerbox")[0].value;
  console.log(userAnswer);

  //IF CORRECT:
  if (userAnswer == answer && userAnswer != "") {
    document.getElementsByClassName("answerbox")[0].blur();
    console.log("correct!");
    document
      .querySelector(".answerbox")
      .setAttribute("style", "border: 1px solid green;");
    document
      .querySelector(".problemDispProblem")
      .setAttribute("style", "color: green;");
    animateCSS(".answerbox", getFunSubmit(), function() {
      hideSolution();
      document.querySelector(".answerbox").setAttribute("style", save);
      document
        .querySelector(".problemDispProblem")
        .setAttribute("style", save2);
      document.getElementsByClassName("answerbox")[0].value = "";
      document.getElementsByClassName("answerbox")[0].focus();
      document.getElementsByClassName("answerbox")[0].select();
      generateAndDisplay();
    });
  }
  //IF INCORRECT:
  else {
    document
      .querySelector(".answerbox")
      .setAttribute("style", "border: 1px solid red; color:red;");
    animateCSS(".answerbox", "hinge", function() {
      document.querySelector(".answerbox").setAttribute("style", save);
      document.getElementsByClassName("answerbox")[0].focus();
      document.getElementsByClassName("answerbox")[0].select();
    });
  }
}

function animateCSS(element, animationName, callback) {
  const node = document.querySelector(element);
  node.classList.add("animated", animationName);

  function handleAnimationEnd() {
    node.classList.remove("animated", animationName);
    node.removeEventListener("animationend", handleAnimationEnd);

    if (typeof callback === "function") callback();
  }

  node.addEventListener("animationend", handleAnimationEnd);
}
