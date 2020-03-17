class CCSS3OIMULT {
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
      answer == this.problem.input.a * this.problem.input.b && answer != "";
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
          <div class="problemDispTitle">Multiply</div>
          <div class="problemDispProblem">
            <span class="var1">${this.problem.input.a}</span> x <span class="var2">${this.problem.input.b}</span>
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
      `We are asked ${this.problem.input.a} x ${this.problem.input.b}`
    );
    let string = "";
    for (var x = 0; x < small - 1; x++) {
      string += `<span class="numbSo">${large}</span> + `;
    }
    if (small !== 0) {
      string += `<span class="numbSo">${large}</span>`;
    } else {
      string += `<span class="numbSo">Nothing!</span>`;
    }
    instructions.push(`This is the same as <br/>${string}`);
    instructions.push(
      `Adding all the <span class="numbSo">${large}</span>'s you get <strong>${this
        .problem.input.a * this.problem.input.b}</strong>`
    );
    instructions.push(
      `So, ${this.problem.input.a} x ${this.problem.input.b} = ${this.problem
        .input.a * this.problem.input.b}`
    );
    return instructions;
  }
}
