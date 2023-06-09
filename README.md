# design-patterns-js-ts

## Structural Design Patterns

### Bridge

It splits some implementation or functionality from the class that uses it. Lets you split a large class or a set of closely related classes into two separate hierarchies — abstraction and implementation — which can be developed independently of each other.

### Decorator

Decorator is used to wrap functionality over some other functionality. This can have as many levels as needed. Solves problems where there is a lot of hierarchy involved.

## Behavioral Design Patterns

### Strategy

Adds functionality (scalability) to the context without changing it. Useful when having change in behavior of an object during execution time.

### Observer

Used to make a subject notify observers that an action has been triggered. Lets you define a subscription mechanism to notify multiple objects about any events that happen to the object they're observing.

### State

To have different behaviors depending on the state that is active in the class

## Creational Design Patterns

### Builder

Usually used when there are too many properties in the constructor and some are optional. Enables the creation of objects with different structures but that still have most of the initial class, through a very clean way. A middleware to control the properties of the class. It can have a director which is useful to have different presets of the class

### Singleton

Used to create one instance for all references of the class. Lets you ensure that a class has only one instance, while providing a global access point to this instance.
