  // 1. Create a class Person with attributes name and age. Write a method to display this information.
  class Person {
    constructor(public name: string, public age: number) {}
  
    displayInfo(): void {
      console.log(`Cau 1:\nName: ${this.name}, Age: ${this.age}`);
    }
  }
  // const person1 = new Person("Huynh Anh Trong", 20);
  // person1.displayInfo();


  // 2. Write a class Student extending Person with an additional attribute grade. Add a method to display all info.
  class Student extends Person {
    constructor(name: string, age: number, public grade: string) {
      super(name, age);
    }
  
    displayStudentInfo(): void {
      console.log(`Cau 2:\nName: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`);
    }
  }
  // const student1 = new Student("Huynh Anh Trong", 20, "A+");
  // student1.displayStudentInfo();
  

  // 3. Create a class Car with properties brand, model, year. Write a method to show car info.
class Car {
  constructor(public brand: string, public model: string, public year: number) {}

  showInfo(): void {
    console.log(`${this.year} ${this.brand} ${this.model}`);
  }
}
// const car1 = new Car("Toyota", "Camry", 2024);
// car1.showInfo();


// 4. Create a class Rectangle with width and height. Write a method to calculate area and perimeter.
class Rectangle {
  constructor(public width: number, public height: number) {}

  getArea(): number {
    return this.width * this.height;
  }

  getPerimeter(): number {
    return 2 * (this.width + this.height);
  }
}
// const rect1 = new Rectangle(10, 5);
// console.log(`Câu 4:\nArea: ${rect1.getArea()}, Perimeter: ${rect1.getPerimeter()}`);


// 5. Create a class BankAccount with balance. Add methods deposit() and withdraw().
class BankAccount {
  constructor(public balance: number = 0) {}

  deposit(amount: number): void {
    if (amount > 0) this.balance += amount;
  }

  withdraw(amount: number): boolean {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
      return true;
    }
    return false;
  }
}
const account1 = new BankAccount(100);
account1.deposit(50);
account1.withdraw(30);
// console.log(`Câu 5:\nCurrent Balance: $${account1.balance}`);


// 6. Create a class Book with attributes title, author, year.
class Book {
  constructor(public title: string, public author: string, public year: number) {}
}
const book1 = new Book("Kỹ Thuật Phần Mềm", "Huỳnh Anh Trọng", 2020);
// console.log(`Câu 6:\nBook: "${book1.title}" by ${book1.author} (${book1.year})`);


// 7. Write a class User with private property name and getter/setter.
class User {
  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    if (value.trim()) this._name = value;
  }
}
const user1 = new User("Nam");
// console.log(`Initial name: ${user1.name}`);
user1.name = "Dũng";
// console.log(`Updated name: ${user1.name}`);


// 8. Create a Product class with name, price. Create an array of products and filter products with price > 100.
class Product {
  constructor(public name: string, public price: number) {}
}
const products: Product[] = [
  new Product("Keyboard", 80),
  new Product("Monitor", 250),
  new Product("Mouse", 45),
  new Product("Headphones", 120),
];
const expensiveProducts = products.filter((p) => p.price > 100);
// console.log("Products with price > 100:", expensiveProducts);


// 9. Define an interface Animal with name and method sound().
interface AnimalInterface {
  name: string;
  sound(): void;
}
const lion: AnimalInterface = {
  name: "Lion",
  sound: () => console.log("Lion roars: Roar!"),
};
// lion.sound();


// 10. Create a class Account with public, private and readonly fields.
class Account {
  public holderName: string;
  private balance: number;
  readonly accountNumber: string;

  constructor(holderName: string, balance: number, accountNumber: string) {
    this.holderName = holderName;
    this.balance = balance;
    this.accountNumber = accountNumber;
  }

  getBalance(): number {
    return this.balance;
  }
}
const acc = new Account("Hoang", 500, "ACC-12345");
// console.log(`Holder: ${acc.holderName}, Account No: ${acc.accountNumber}, Balance: $${acc.getBalance()}`);


// 11. Create a base class Animal. Extend Dog and Cat classes with methods bark() and meow().
class BaseAnimal {
  constructor(public name: string) {}
}
class Dog extends BaseAnimal {
  bark(): void {
    console.log(`${this.name} barks: Woof!`);
  }
}
class Cat extends BaseAnimal {
  meow(): void {
    console.log(`${this.name} meows: Meow!`);
  }
}
const dog = new Dog("Corgi");
const cat = new Cat("Kitty");
// dog.bark();
// cat.meow();


// 12. Define interfaces Flyable and Swimmable. Implement them in Bird and Fish classes.
interface Flyable {
  fly(): void;
}
interface Swimmable {
  swim(): void;
}
class Bird implements Flyable {
  fly(): void {
    console.log("Bird is flying in the sky.");
  }
}
class Fish implements Swimmable {
  swim(): void {
    console.log("Fish is swimming in the water.");
  }
}
// new Bird().fly();
// new Fish().swim();


// 13. Create an abstract class Shape with method area(). Implement Square and Circle.
abstract class Shape {
  abstract area(): number;
}
class Square extends Shape {
  constructor(public side: number) {
    super();
  }
  area(): number {
    return this.side * this.side;
  }
}
class Circle extends Shape {
  constructor(public radius: number) {
    super();
  }
  area(): number {
    return Math.PI * this.radius ** 2;
  }
}
const square = new Square(4);
const circle = new Circle(3);
// console.log(`Square Area: ${square.area()}`);
// console.log(`Circle Area: ${circle.area().toFixed(2)}`);


// 14. Create a base class Employee. Extend Manager and Developer with specific methods.
class Employee {
  constructor(public name: string, public salary: number) {}
}
class Manager extends Employee {
  conductMeeting(): void {
    console.log(`${this.name} is conducting a team meeting.`);
  }
}
class Developer extends Employee {
  writeCode(): void {
    console.log(`${this.name} is writing TypeScript code.`);
  }
}
// new Manager("Alice", 3000).conductMeeting();
// new Developer("Bob", 2000).writeCode();


// 15. Create a Library class that can store Book and User objects. Add method to add books.
class Library {
  public books: Book[] = [];
  public users: User[] = [];

  addBook(book: Book): void {
    this.books.push(book);
  }
  addUser(user: User): void {
    this.users.push(user);
  }
}
const lib = new Library();
lib.addBook(new Book("Design Patterns", "Gang of Four", 1994));
lib.addUser(new User("Trong"));
// console.log(`Library has ${lib.books.length} book(s) and ${lib.users.length} user(s).`);


// 16. Create a generic class Box that can store any type of value.
class Box<T> {
  constructor(private content: T) {}
  getValue(): T {
    return this.content;
  }
  setValue(value: T): void {
    this.content = value;
  }
}
const numberBox = new Box<number>(123);
const stringBox = new Box<string>("Hello Generic");
// console.log(`NumberBox: ${numberBox.getValue()}, StringBox: ${stringBox.getValue()}`);


// 17. Write a singleton Logger class that logs messages to console.
class Logger {
  private static instance: Logger;
  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  log(message: string): void {
    console.log(`[LOG]: ${message}`);
  }
}
const logger1 = Logger.getInstance();
const logger2 = Logger.getInstance();
// logger1.log("This is a log message.");
// console.log(`Are loggers the same instance? ${logger1 === logger2}`);


// 18. Create a static class MathUtil with methods add(), subtract(), multiply(), divide().
class MathUtil {
  static add(a: number, b: number): number {
    return a + b;
  }
  static subtract(a: number, b: number): number {
    return a - b;
  }
  static multiply(a: number, b: number): number {
    return a * b;
  }
  static divide(a: number, b: number): number {
    if (b === 0) throw new Error("Division by zero");
    return a / b;
  }
}
// console.log(`Add: ${MathUtil.add(10, 5)}, Divide: ${MathUtil.divide(10, 2)}`);


// 19. Demonstrate method overriding using polymorphism with Animal and subclasses.
class PolyAnimal {
  makeSound(): void {
    console.log("Generic sound");
  }
}
class PolyDog extends PolyAnimal {
  override makeSound(): void {
    console.log("Woof! Woof!");
  }
}
class PolyCat extends PolyAnimal {
  override makeSound(): void {
    console.log("Meow! Purr!");
  }
}
const animals: PolyAnimal[] = [new PolyDog(), new PolyCat()];
// animals.forEach((a) => a.makeSound());


// 20. Write a Vehicle interface and implement it in Car and Bike classes.
interface Vehicle {
  speed: number;
  drive(): void;
}
class VehicleCar implements Vehicle {
  constructor(public speed: number) {}
  drive(): void {
    console.log(`Car driving at ${this.speed} km/h`);
  }
}
class Bike implements Vehicle {
  constructor(public speed: number) {}
  drive(): void {
    console.log(`Bike riding at ${this.speed} km/h`);
  }
}
// new VehicleCar(100).drive();
// new Bike(25).drive();


// 21. Create a generic Repository class with methods add(), getAll().
class Repository<T> {
  private items: T[] = [];
  add(item: T): void {
    this.items.push(item);
  }
  getAll(): T[] {
    return [...this.items];
  }
}
const numRepo = new Repository<number>();
numRepo.add(10);
numRepo.add(20);
// console.log("Repo items:", numRepo.getAll());


// 22. Create a class Stack with push, pop, peek, isEmpty methods.
class Stack<T> {
  private items: T[] = [];
  push(item: T): void {
    this.items.push(item);
  }
  pop(): T | undefined {
    return this.items.pop();
  }
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }
  isEmpty(): boolean {
    return this.items.length === 0;
  }
}
const stack = new Stack<string>();
stack.push("First");
stack.push("Second");
// console.log(`Popped: ${stack.pop()}, Top element: ${stack.peek()}`);


// 23. Create an interface Payment with method pay(amount). Implement CashPayment and CardPayment.
interface Payment {
  pay(amount: number): void;
}
class CashPayment implements Payment {
  pay(amount: number): void {
    console.log(`Paid $${amount} with cash.`);
  }
}
class CardPayment implements Payment {
  constructor(private cardNumber: string) {}
  pay(amount: number): void {
    console.log(`Paid $${amount} with card ending in ${this.cardNumber.slice(-4)}.`);
  }
}
// new CashPayment().pay(50);
// new CardPayment("1234-5678-9876-5432").pay(150);


// 24. Create an abstract class Appliance with method turnOn(). Implement Fan and AirConditioner.
abstract class Appliance {
  abstract turnOn(): void;
}
class Fan extends Appliance {
  turnOn(): void {
    console.log("Fan is spinning.");
  }
}
class AirConditioner extends Appliance {
  turnOn(): void {
    console.log("Air Conditioner is cooling.");
  }
}
// new Fan().turnOn();
// new AirConditioner().turnOn();


// 25. Create a class Shape with a static method describe().
class ShapeUtil {
  static describe(): void {
    console.log("Shapes are 2D geometric representations.");
  }
}
// ShapeUtil.describe();


// 26. Create a class Order with list of products. Add method to calculate total price.
class Order {
  constructor(public products: Product[] = []) {}
  addProduct(product: Product): void {
    this.products.push(product);
  }
  getTotalPrice(): number {
    return this.products.reduce((sum, item) => sum + item.price, 0);
  }
}
const order = new Order();
order.addProduct(new Product("Shirt", 30));
order.addProduct(new Product("Shoes", 70));
// console.log(`Order Total: $${order.getTotalPrice()}`);


// 27. Create a class Teacher that extends Person. Add subject attribute and introduce method.
class Teacher extends Person {
  constructor(name: string, age: number, public subject: string) {
    super(name, age);
  }
  introduce(): void {
    console.log(`Hello, I am ${this.name} and I teach ${this.subject}.`);
  }
}
const teacher = new Teacher("Dr. Minh", 45, "Computer Science");
// teacher.introduce();


// 28. Create a class Animal with protected method makeSound(). Extend Dog and Cat to override it.
class ProtectedAnimal {
  protected makeSound(): string {
    return "Some noise";
  }
  performSound(): void {
    console.log(`Animal sound: ${this.makeSound()}`);
  }
}
class ProtectedDog extends ProtectedAnimal {
  protected override makeSound(): string {
    return "Woof Woof";
  }
}
class ProtectedCat extends ProtectedAnimal {
  protected override makeSound(): string {
    return "Meow Meow";
  }
}
// new ProtectedDog().performSound();
// new ProtectedCat().performSound();


// 29. Create an interface Movable with method move(). Implement it in Car and Robot.
interface Movable {
  move(): void;
}
class MovableCar implements Movable {
  move(): void {
    console.log("Car moves forward on wheels.");
  }
}
class Robot implements Movable {
  move(): void {
    console.log("Robot walks on two legs.");
  }
}
// new MovableCar().move();
// new Robot().move();


// 30. Create a class School with list of Students and Teachers. Add method to display info.
class School {
  constructor(
    public name: string,
    public students: Student[] = [],
    public teachers: Teacher[] = []
  ) {}

  addStudent(student: Student): void {
    this.students.push(student);
  }

  addTeacher(teacher: Teacher): void {
    this.teachers.push(teacher);
  }

  displaySchoolInfo(): void {
    console.log(`School: ${this.name}`);
    console.log(`Total Teachers: ${this.teachers.length}`);
    console.log(`Total Students: ${this.students.length}`);
  }
}
const school = new School("IUH University");
const sampleTeacher = new Teacher("Dr. Minh", 45, "Computer Science");
const sampleStudent = new Student("Huynh Anh Trong", 20, "A+");
const sampleStudent1 = new Student("Nguyen Van A", 20, "A+");
school.addTeacher(sampleTeacher);
school.addStudent(sampleStudent);
school.addStudent(sampleStudent1);
school.displaySchoolInfo();
