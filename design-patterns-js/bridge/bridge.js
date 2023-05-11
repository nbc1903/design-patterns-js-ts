/*
 * It splits some implementation or functionality from the class that uses it
 * This is a structural design pattern
 */

// Refined Abstraction
class EncoderTextAbstraction {
  constructor(encoder) {
    this.encoder = encoder;
  }

  encode(str) {
    return this.encoder.encode(str);
  }

  decode(str) {
    return this.encoder.decode(str);
  }
}
// Implementor 1
class Base64EncoderImplementor {
  encode(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
  }
  decode(str) {
    return decodeURIComponent(escape(window.atob(str)));
  }
}
// Implementor 2
class HTMLEncoderImplementor {
  encode(str) {
    return str.split(".").reduce((ac, e) => {
      return ac + `<p>${e.trim()}</p>`;
    }, "");
  }
  decode(str) {
    return str.split("</p>").reduce((ac, e) => {
      return e !== "" ? ac + e.replace("<p>", "") + ". " : ac + "";
    }, "");
  }
}

// Execution
const encoder1 = new EncoderTextAbstraction(new Base64EncoderImplementor());
console.log(encoder1.encode("duck"));
console.log(encoder1.decode("ZHVjaw=="));

const encoder2 = new EncoderTextAbstraction(new HTMLEncoderImplementor());
console.log(
  encoder2.encode(
    "This is a text. Here starts another one. And here goes one more"
  )
);
console.log(
  encoder2.decode(
    "<p>This is a text</p><p>Here starts another one</p><p>And here goes one more</p>"
  )
);
