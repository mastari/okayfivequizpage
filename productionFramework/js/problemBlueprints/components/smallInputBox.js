class smallInputBox {
  constructor(callback) {
    this.callback = callback;
  }

  render() {
    return `
      <input type="text" class="answerbox fast" />
        <a href="#" class="answerbutton">
        <div>→</div>
      </a>`;
  }

  listen() {
    $(".answerbox").on("keypress", () => {
      if (event.keyCode == 13) {
        // event.preventDefault();
        this.callback($(".answerbox").val());
      }
    });
    $(".answerbutton").on("click", () => this.callback($(".answerbox").val()));
  }

  focus() {
    $(".answerbox")
      .focus()
      .select();
  }

  animate(success, animationCallback) {
    if (success) {
      $(".answerbox").blur();
      console.log("correct!");
      $(".answerbox").css({ border: "1px solid green" });
      animationCallback(true, true);
      animateCSS(".answerbox", this.getFunSubmit(), function() {
        animationCallback(false, true);
        $(".answerbox")
          .val("")
          .focus()
          .select()
          .removeAttr("style");
      });
    } else {
      $(".answerbox").css({ border: "1px solid red", color: "red" });
      animationCallback(true, false);
      animateCSS(".answerbox", "rotateOut", function() {
        animationCallback(false, false);
        $(".answerbox")
          .removeAttr("style")
          .focus()
          .select();
      });
    }
  }
  getFunSubmit() {
    var funSubmits = ["bounce", "pulse", "jackInTheBox", "rubberBand", "tada"];
    return funSubmits[Math.floor(Math.random() * funSubmits.length)];
  }
}
