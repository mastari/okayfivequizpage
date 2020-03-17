class skipAndSolution {
  constructor(solutionHideCallback) {
    this.solutionHideCallback = solutionHideCallback;
  }

  render(instructions) {
    this.initRenderBank(instructions);
    return this.renderBank.problemOPTIONS + this.renderBank.problemSTEPS;
  }

  listen() {
    $(".getskip").on("click", this.skipProblem);
    $(".gethelp").on("click", this.showSolution);
    $(".hideSolution").on("click", this.hideSolution.bind(this));
  }

  showSolution() {
    $(".problemSTEPS").css({ display: "flex" });
    $(".problemOPTIONS").css({ display: "none" });
    $(".answerbox")
      .focus()
      .select();
  }

  hideSolution() {
    $(".problemSTEPS").css({ display: "none" });
    $(".problemOPTIONS").css({ display: "flex" });
    this.solutionHideCallback();
  }

  skipProblem() {
    requestSkip();
    document
      .querySelector(".getskip")
      .removeEventListener("click", this.skipProblem);
    animateCSS(".answerbox", "wobble", () => {
      document
        .querySelector(".getskip")
        .addEventListener("click", this.skipProblem);
    });
  }

  initRenderBank(instructions) {
    let list = "";
    for (let i = 0; i < instructions.length; i++) {
      list += `<li>${instructions[i]}</li>`;
    }
    this.renderBank = {
      problemOPTIONS: `
      <div class="problemOPTIONS">
        <a href="#">
          <div class="getskip">
            <div>Skip?</div>
          </div>
        </a>
        <a href="#">
          <div class="gethelp">
            <div>Get Help</div>
          </div>
        </a>
      </div>`,
      problemSTEPS: `
      <div class="problemSTEPS">
        <div class="solutionTITLE">Solution</div>
        <ul class="solutionList">${list}</ul>
        <a href="#" class="hideSolution"><div>Hide Solution</div></a>
      </div>
      `
    };
  }
}
