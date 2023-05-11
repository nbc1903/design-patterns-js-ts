/*
 * To have different behaviors depending on the state that is active in the class
 * This is a behavior design pattern.
 */

// Context
class DocumentContext {
  constructor() {
    this.state = new BlankState();
    this.content = "";
  }

  setState(state) {
    this.state = state;
  }

  write(text) {
    this.state.write(this, text);
  }
}

// State blank
class BlankState {
  write(documentContext, text) {
    documentContext.content = text;
    documentContext.setState(new WithContentState());
  }
}
// State with content
class WithContentState {
  write(documentContext, text) {
    documentContext.content += text;
  }
}

// State approved
class ApprovedState {
  write(documentContext, text) {
    console.error("Already approved, can't be modified");
  }
}

// Execution
const doc = new DocumentContext();
console.log("current state: ", doc.state);
doc.write("Hello");
console.log("current content: ", doc.content);
console.log("current state: ", doc.state);

doc.write(" Nicolas");
doc.write(", Do you like");
console.log("current content: ", doc.content);

doc.setState(new ApprovedState());
console.log("current state: ", doc.state);
console.log("current content: ", doc.content);

doc.write(" Games?");

doc.setState(new WithContentState());
console.log(doc.state);
doc.write(" Sports?");
console.log(doc.content);
