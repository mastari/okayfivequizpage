class KCCA1EF {
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
    let isCorrect = answer == this.problem.input.dots && answer != "";
    this.inputBox.animate(isCorrect, this.animateText.bind(this));
    submitProblem(this.problem, answer, isCorrect);
  }

  animateText(acting, success) {
    if (acting && success) {
      // $("#problemCanvas").css({ border: "1px solid green" });
    } else if (!acting && success) {
      // $("#problemCanvas").removeAttr("style");
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
    this.setupCanvasProblem();

    createEasel("problemCanvas", 1000, 250, this.drawCanvasProblem.bind(this));
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
          <div class="problemDispTitle">How many dots are there?</div>
          <div class="problemDispProblem">
          <canvas id="problemCanvas" width="1000" height="500">
          </canvas>
          </div>
        </div>`,
      solutionIntructions: this.generateInstructionsArray()
    };
  }
  generateInstructionsArray() {
    if (this.problem.input.dots == 1) {
      return [
        `There is <span class="numbSo">${this.problem.input.dots}</span> dot.`
      ];
    } else {
      return [
        `There are <span class="numbSo">${this.problem.input.dots}</span> dots.`
      ];
    }
  }
  setupCanvasProblem() {
    this.dots = [];
    for (let i = 0; i < this.problem.input.dots; i++) {
      this.dots.push({
        x: i,
        y: Math.random(),
        color: `rgb(${Math.random() * 100},${Math.random() *
          100},${Math.random() * 255 + 100})`
      });
    }
  }

  drawCanvasProblem() {
    noStroke();
    let size;
    if (this.problem.input.dots == 1) {
      size = 100;
    } else if (this.problem.input.dots > 1 && this.problem.input.dots < 6) {
      size = 75;
    } else if (this.problem.input.dots >= 6 && this.problem.input.dots < 10) {
      size = 50;
    } else {
      size = 30;
    }
    for (let i = 0; i < this.dots.length; i++) {
      fill(this.dots[i].color);
      ellipse(
        size + (getEaselWidth() * this.dots[i].x) / this.dots.length,
        size / 2 + getEaselHeight() / 2 - size / 2,
        size,
        size
      );
    }
  }
}
size * this.dots.length;
