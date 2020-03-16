var quizSession;
var pageAssets = {};

$(document).ready(function() {
  initAssets();
  initQuiz();
});

function initAssets() {
  pageAssets.correctDing = $("#pageAudio")[0];
}

function initQuiz() {
  console.log("[Initializing Quiz]");
  $("#qt").html(clientObject.quizTitle);
  $("#qst").html(clientObject.gradeLevel);
  quizSession = getLastSession();
  serviceProblem(quizSession.problemIndex);
}

function getLastSession() {
  //TODO: Controller sends state of last session
  return {
    problemIndex: 0,
    problemSubmits: [],
    completedIndices: []
  };
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
