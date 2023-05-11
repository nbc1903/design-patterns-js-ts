// context
class Ball {
  constructor(ctx, canvas, ballSize) {
    this.ctx = ctx;
    this.width = canvas.width;
    this.height = canvas.height;
    this.ballSize = ballSize;
    this.positionX = 0;
    this.positionY = 0;

    this.state = new State1();
  }

  setState(state) {
    this.state = state;
  }

  print() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.ctx.fillRect(
      this.positionX,
      this.positionY,
      this.ballSize,
      this.ballSize
    );
    this.state.print(this);
  }
}
// states
// Goes right
class State1 {
  print(ball) {
    if (ball.positionX < ball.width - ball.ballSize)
      ball.positionX += ball.ballSize;
    else ball.setState(new State2());
  }
}
// Goes down
class State2 {
  print(ball) {
    if (ball.positionY < ball.height - ball.ballSize)
      ball.positionY += ball.ballSize;
    else ball.setState(new State3());
  }
}
// Goes left
class State3 {
  print(ball) {
    if (ball.positionX > 0) ball.positionX -= ball.ballSize;
    else ball.setState(new State4());
  }
}
// Goes up
class State4 {
  print(ball) {
    if (ball.positionY > 0) ball.positionY -= ball.ballSize;
    else ball.setState(new State1());
  }
}

// execution
const ctx = canvas.getContext("2d");
ctx.fillStyle = "red";
const ball = new Ball(ctx, canvas, 20);
setInterval(() => ball.print(), 100);
