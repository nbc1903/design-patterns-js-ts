// Product
class Form {
  constructor(controls, action) {
    this.controls = controls;
    this.action = action;
  }

  getContent() {
    return `<form method="post" action="${this.action}" >
            ${this.controls.reduce((ac, c) => {
              return (
                ac +
                `<div>
                        ${this.getLabel(c)}
                        ${this.getInput(c)}
                </div>`
              );
            }, "")}
            <button type="submit">Send</button>
        </form>`;
  }

  getLabel(control) {
    return `<label>${control.text}</label>`;
  }

  getInput(control) {
    return `<input type="${control.type}"
            id="${control.name}"
            name="${control.name}"
        />`;
  }
}

// ConcreteBuilder
class FormBuilder {
  constructor() {
    this.reset();
  }

  reset() {
    this.action = "";
    this.controls = [];
  }

  setAction(action) {
    this.action = action;
    return this;
  }

  setText(name, text) {
    this.controls.push({
      name: name,
      text: text,
      type: "text",
    });
    return this;
  }

  setEmail(name, text) {
    this.controls.push({
      name: name,
      text: text,
      type: "email",
    });
    return this;
  }

  setCheckBox(name, text) {
    this.controls.push({
      name: name,
      text: text,
      type: "checkbox",
    });
    return this;
  }

  setColor(name, text) {
    this.controls.push({
      name: name,
      text: text,
      type: "color",
    });
    return this;
  }

  build() {
    const frm = new Form(this.controls, this.action);
    this.reset();
    return frm;
  }
}

// Director
class FormDirector {
  constructor(formBuilder) {
    this.setBuilder(formBuilder);
  }

  setBuilder(formBuilder) {
    this.formBuilder = formBuilder;
  }

  createPeopleForm() {
    this.formBuilder.reset();
    this.formBuilder
      .setText("firstName", "Name")
      .setText("lastName", "Last Name");
  }

  createContactForm() {
    this.formBuilder.reset();
    this.formBuilder
      .setText("name", "Name")
      .setEmail("email", "Email")
      .setText("message", "Message");
  }
}

// builder 1
const frmBuilder = new FormBuilder();
const formPeople = frmBuilder
  .setAction("add.php")
  .setText("firstName", "Name")
  .setText("lastName", "Last Name")
  .setCheckBox("gamer", "Is gamer?")
  .setColor("favoriteColor", "Favorite Color")
  .build();
form1.innerHTML = formPeople.getContent();
// builder 2
const formMail = frmBuilder
  .setAction("send.php")
  .setText("name", "Name")
  .setEmail("email", "Email")
  .build();
form2.innerHTML = formMail.getContent();

// director
// creation of form 1 with director
const director = new FormDirector(frmBuilder);
director.createPeopleForm();
form3.innerHTML = frmBuilder.build().getContent();

// creation of form 2 with director
director.createPeopleForm();
form4.innerHTML = frmBuilder.build().getContent();

// creation of form 3 with director
director.createContactForm();
form5.innerHTML = frmBuilder.build().getContent();
