class CCSS3OIADD {
  constructor(problem) {
    this.problem = problem;
    this.inputBox = new smallInputBox(this.submitCallback.bind(this));
    this.skipAndHelp = new skipAndSolution(this.onSolutionHid.bind(this));
  }
  init() {
    this.initRenderBank();
    this.setUpProblem();
  }

  submitCallback(answer) {
    let isCorrect =
      answer == this.problem.input.a + this.problem.input.b && answer != "";
    this.inputBox.animate(isCorrect, this.animateText.bind(this));
    submitProblem(this.problem, answer, isCorrect);
  }

  animateText(acting, success) {
    if (acting && success) {
      $(".problemDispProblem").css({ color: "rgb(7, 160, 7)" });
    } else if (!acting && success) {
      $(".problemDispProblem").removeAttr("style");
      nextProblem();
    } else if (acting && !success) {
      this.skipAndHelp.showSolution();
    }
  }

  onSolutionHid() {
    this.inputBox.focus();
  }

  setUpProblem() {
    componentRender("###", this.renderBank.problemPROBLEM);
    componentRender(
      ".problemPROBLEM",
      '<div class="problemDispEntry">' + this.inputBox.render() + "</div>"
    );
    this.inputBox.listen();
    this.inputBox.focus();
    componentRender(
      "###",
      this.skipAndHelp.render(this.renderBank.solutionIntructions)
    );
    this.skipAndHelp.listen();
  }
  initRenderBank() {
    this.renderBank = {
      problemPROBLEM: `
        <div class="problemPROBLEM">
          <div class="problemDispTitle">Add</div>
          <div class="problemDispProblem">
            <span class="var1">${this.problem.input.a}</span> + <span class="var2">${this.problem.input.b}</span>
          </div>
        </div>`,
      solutionIntructions: this.generateInstructionsArray()
    };
  }
  generateInstructionsArray() {
    let instructions = [];
    let small, large;
    if (this.problem.input.a > this.problem.input.b) {
      large = this.problem.input.a;
      small = this.problem.input.b;
    } else {
      large = this.problem.input.b;
      small = this.problem.input.a;
    }
    instructions.push(
      `We are asked ${this.problem.input.a} + ${this.problem.input.b}`
    );

    instructions.push(
      `We need to add <span class="numbSo">${small}</span> more to <span class="numbSo">${large}</span>`
    );
    instructions.push(
      `By adding it up we get <strong>${this.problem.input.a +
        this.problem.input.b}</strong>`
    );
    instructions.push(
      `So, ${this.problem.input.a} + ${this.problem.input.b} = ${this.problem
        .input.a + this.problem.input.b}`
    );
    return instructions;
  }
}
