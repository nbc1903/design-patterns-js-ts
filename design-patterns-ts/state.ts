// Interface
interface State {
  next(ticket?: Ticket): number | null;
  add(ticket?: Ticket, quantity?: number): void;
}

// Context
class Ticket {
  private state: State;
  quantity: number;
  readonly limit: number;
  private number: number;

  constructor(limit: number) {
    console.log("created with limit: ", limit);
    this.quantity = 0;
    this.limit = limit;
    this.number = 0;
    this.state = new EmptyState();
  }

  get getNumber(): number {
    return this.number++;
  }
  set setState(state: State) {
    this.state = state;
  }

  get getState() {
    return this.state;
  }

  next(): number | null {
    return this.state.next(this);
  }

  add(quantity: number): void {
    console.log("adding: ", quantity);
    this.state.add(this, quantity);
    console.log("current quantity: ", this.quantity);
  }
}

// States
class EmptyState implements State {
  next(): null {
    return null;
  }

  add(ticket: Ticket, quantity: number): void {
    if (ticket.quantity + quantity < ticket.limit) {
      ticket.quantity += quantity;
      ticket.setState = new WithDataState();
    } else if (ticket.quantity + quantity === ticket.limit) {
      ticket.quantity += quantity;
      ticket.setState = new FullState();
    } else if (ticket.quantity + quantity > ticket.limit) {
      console.error("preventing addition, overload");
    }
  }
}
class WithDataState implements State {
  next(ticket: Ticket): number {
    ticket.quantity--;
    if (ticket.quantity <= 0) {
      ticket.setState = new EmptyState();
    }
    return ticket.getNumber;
  }
  add(ticket: Ticket, quantity: number): void {
    if (ticket.quantity + quantity < ticket.limit) {
      ticket.quantity += quantity;
      ticket.setState = new WithDataState();
    } else if (ticket.quantity + quantity === ticket.limit) {
      ticket.quantity += quantity;
      ticket.setState = new FullState();
    } else if (ticket.quantity + quantity > ticket.limit) {
      console.error("preventing addition, overload");
    }
  }
}

class FullState implements State {
  next(ticket: Ticket): number {
    ticket.quantity--;
    if (ticket.quantity <= 0) ticket.setState = new EmptyState();
    else ticket.setState = new WithDataState();
    return ticket.getNumber;
  }
  add(): void {
    console.error("preventing addition, ticket is full");
  }
}

// Execution

const ticket = new Ticket(5);
console.log("current state: ", ticket.getState);
console.log("next: ", ticket.next());
ticket.add(6);
console.log("current state: ", ticket.getState);
console.log("next: ", ticket.next());
ticket.add(4); // needs one more to be full
console.log("current state: ", ticket.getState);
console.log("next: ", ticket.next()); //substracts one on read
console.log("next: ", ticket.next());
ticket.add(3); // with 3 now it's full
ticket.add(1); // cannot add more because it's full
console.log("current state: ", ticket.getState);
console.log("next: ", ticket.next());
console.log("current state: ", ticket.getState);
console.log("next: ", ticket.next());
console.log("next: ", ticket.next());
console.log("next: ", ticket.next());
console.log("current state: ", ticket.getState);
console.log("next: ", ticket.next());
console.log("current state: ", ticket.getState); // empty state
console.log("next: ", ticket.next()); // no more tickets
