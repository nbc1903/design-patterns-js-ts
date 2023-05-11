interface Strategy {
  login(user: string, password: string): boolean;
}

class LoginContext {
  private strategy: Strategy;
  constructor(strategy: Strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }

  login(user: string, password: string): boolean {
    return this.strategy.login(user, password);
  }
}

class LoginDBStrategy implements Strategy {
  login(user: string, password: string): boolean {
    //This could be a DB request
    return user === "admin" && password === "admin";
  }
}

class LoginServiceStrategy implements Strategy {
  login(user: string, password: string): boolean {
    //This could be a third party request
    return user === "admin2" && password === "admin2";
  }
}

class LoginGoogleStrategy implements Strategy {
  login(user: string, password: string): boolean {
    //This could be a third party request
    console.log("requested service from google");
    return user === "admin3" && password === "admin3";
  }
}

const auth = new LoginContext(new LoginDBStrategy());
const res = auth.login("admin", "admin");
console.log("authentication is successful: ", res);

auth.setStrategy(new LoginServiceStrategy());
const res2 = auth.login("admin2", "admin2");
console.log("authentication in third party service is successful: ", res2);

auth.setStrategy(new LoginGoogleStrategy());
const res3 = auth.login("admin3", "admin3");
console.log("authentication in google service is successful: ", res3);
