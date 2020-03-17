function serviceProblem(index) {
  let problem;
  if (index <= clientObject.quizProblems.length - 1) {
    problem = clientObject.quizProblems[index];
  } else {
    console.log("[ERR]: Problem Index Out Of Range");
    return false;
  }
  console.log(`[Servicing] Problem #${index + 1}, ${problem.type}`);
  let t;
  switch (problem.type) {
    case "CCSS.3.OI.MULT":
      t = CCSS3OIMULT;
      break;
    case "CCSS.3.OI.ADD":
      t = CCSS3OIADD;
      break;
    case "K.CC.A.1.EF":
      t = KCCA1EF;
      break;
    default:
      console.log(`[ERR]: Problem template for "${problem.type}" not found`);
      return false;
  }
  $(".problemID").html(problem.type);
  $(".problemCLASS").html(clientObject.gradeLevel);
  return new t(problem).init();
}

function submitProblem(problem, answer, correct) {
  quizSession.problemSubmits.push({
    problem,
    answer,
    correct,
    index: quizSession.problemIndex
  });
  if (correct) {
    pageAssets.correctDing.play();
    updateProgressbar();
  }
}

function requestSkip() {
  //Do some logging to keep track of completed
  console.log(`[Skipping] Problem #${quizSession.problemIndex + 1}`);
  quizSession.problemIndex++;
  nextProblem();
}

function nextProblem() {
  detachEasel();
  let correctArray = [];
  for (let i = 0; i < quizSession.problemSubmits.length; i++) {
    if (quizSession.problemSubmits[i].correct)
      correctArray.push(quizSession.problemSubmits[i].index);
  }
  var todo = -1;
  for (
    let i = quizSession.problemIndex;
    i < clientObject.quizProblems.length;
    i++
  ) {
    if (!correctArray.includes(i)) {
      todo = i;
      break;
    }
  }
  if (todo == -1) {
    for (let i = 0; i < clientObject.quizProblems.length; i++) {
      if (!correctArray.includes(i)) {
        todo = i;
        break;
      }
    }
  }
  if (todo == -1) {
    console.log("[COMPLETE]");
  } else {
    quizSession.problemIndex = todo;
    $(".problemcontent").html("");
    serviceProblem(quizSession.problemIndex);
  }
}

function updateProgressbar() {
  var tally = 0;
  for (let i = 0; i < quizSession.problemSubmits.length; i++) {
    if (quizSession.problemSubmits[i].correct) tally++;
  }
  var reach = tally;
  tally--;
  var id = setInterval(frame, 1);
  function frame() {
    if (tally >= reach) {
      clearInterval(id);
    } else {
      tally += 0.01;
      $(".progressmarker").css({
        width: `${100 * (tally / clientObject.quizProblems.length)}%`
      });
    }
  }
}

function componentRender(loc, data) {
  if (data == undefined) return;
  if (loc == "###") {
    $(".problemcontent").append(data);
  } else {
    if (!$(loc).length) {
      $(".problemcontent").append(
        `<div class="${loc.substring(1)}">${data}</div>`
      );
    } else {
      $(loc).append(data);
    }
  }
}
