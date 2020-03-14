var varONE, varTWO, answer;
var save, save2;
var correctDING;
var progressScore = 0;
var probWrong = 0;

function generateAndDisplay() {
  varONE = Math.floor(Math.random() * 13);
  varTWO = Math.floor(Math.random() * 13);
  answer = varONE * varTWO;
  document.getElementsByClassName("var1")[0].innerHTML = varONE.toString();
  document.getElementsByClassName("var2")[0].innerHTML = varTWO.toString();
}

function getFunSubmit() {
  var funSubmits = [
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

  let small, large;
  if (varONE > varTWO) {
    large = varONE;
    small = varTWO;
  } else {
    large = varTWO;
    small = varONE;
  }
  
  

  //print steps
  document.querySelector("#step1").innerHTML = `We are asked ${varONE} x ${varTWO}`
  let string="";
  for(var x = 0; x < small-1; x++) {
    string+=`<span class="numbSo">${large}</span> + `
  }
  if(small !== 0) {
    string += `<span class="numbSo">${large}</span>`
  } else {
    string+=`<span class="numbSo">Nothing!</span>`
  }
  document.querySelector("#step2").innerHTML = `This is the same as <br/>${string}`
  document.querySelector("#step3").innerHTML = `Adding all the <span class="numbSo">${large}</span>'s you get <strong>${answer}</strong>`
  document.querySelector("#step4").innerHTML = `So, ${varONE} x ${varTWO} = ${answer}`
  
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
  document.querySelector(".progressmarker").setAttribute("style", `width:${progressScore}%`)
  correctDING = document.getElementById("myAudio"); 

  var save = document.querySelector(".answerbox").getAttribute("style");
  var save2 = document
    .querySelector(".problemDispProblem")
    .getAttribute("style");
  generateAndDisplay();
  document
    .getElementsByClassName("answerbox")[0]
    .addEventListener("keypress", function(event) {
      if (event.keyCode == 13) {
        // event.preventDefault();
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
  var originalScore = progressScore;
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
      correctDING.play();
      progressScore+=10;
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
      probWrong++;
    animateCSS(".answerbox", "rotateOut", function() {
      document.querySelector(".answerbox").setAttribute("style", save);
      document.getElementsByClassName("answerbox")[0].focus();
      document.getElementsByClassName("answerbox")[0].select();
    });
  }
  if(progressScore !== originalScore) {
    var id = setInterval(frame, 1);
    function frame() {
    if (originalScore >= progressScore) {
      clearInterval(id);
      //quiz completed!!! Woooo
      if(progressScore >= 100) {
        alert("great job!")
        document.querySelector('.finalscore').innerHTML = 10 - probWrong;
        document.querySelector('.problemPROBLEM').setAttribute("style","display:none;")
        document.querySelector('.problemSTEPS').setAttribute("style","display:none;")
        document.querySelector('.problemOPTIONS').setAttribute("style","display:none;")
        document.querySelector('.quizCOMPLETE').setAttribute("style","display:flex;")
      }
    } else {
      originalScore+=0.1;
      document.querySelector(".progressmarker").setAttribute("style", `width:${originalScore}%`)
    }
  }
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
