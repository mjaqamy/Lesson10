// Добавить в задачу 1 валидацию на то, чтобы любая сторона была больше 0, 
// если например ширина меньше 0 или равна 0 - выводим ошибку: ${sideName} must be greater than 0`

// Перечисление типов фигур
enum FigureType {
  Square = "square",
  Rectangle = "rectangle",
  Triangle = "triangle",
}

// Абстрактный класс Figure
abstract class Figure {
  // Добавление защитного свойства type при создании класса
  constructor(protected readonly type: string) {}

   protected checkSide(value: number, sideName: string) {
    if (value<=0){
     throw new Error(`${sideName} must be greater than 0`);
    }
   }

  // Добавление публичного метода получения type
  getType(): string {
    return this.type;
  }

  // Добавление публичных абстрактный методов для фигур - получение площади и периметра
  abstract getArea(): number;
  abstract getPerimeter(): number;

  // Добавление публичного метода описание класса
  getDescription(): string {
    return this.constructor.name;
  }
}

// Класс Square (квадрат)
class Square extends Figure {
  //  Добавление приватного свойства side
  constructor(private readonly side: number) {
    // Указание типа при создании класса
    super(FigureType.Square);
    this.checkSide(side, "side");
  }

  // Получение площади
  getArea(): number {
    return this.side**2;
  }

  // Получение периметра
  getPerimeter(): number {
    return this.side*4;
  }

  // Получение описания
  getDescription(): string {
    return `Square with side ${this.side}`;
  }
}

// Класс Rectangle (прямоугольник)
class Rectangle extends Figure {
  //  Добавление приватных свойств ширина и высоты
  constructor(
    private readonly width: number,
    private readonly height: number,
  ) {
    // Указание типа при создании класса
    super(FigureType.Rectangle);
     this.checkSide(width, "width");
     this.checkSide(height, "height");
  }

  // Получение площади
  getArea(): number {
    return this.width * this.height;
  }

  // Получение периметра
  getPerimeter(): number {
    return 2 * (this.width + this.height);
  }

  // Получение описания
  getDescription(): string {
    return `Rectangle with width ${this.width} and height ${this.height}`;
  }
}

//Класс Triangle (треугольник)
class Triangle extends Figure {
    // Указание типа при создании класса
  constructor(
    private readonly side1: number,
    private readonly side2: number,
    private readonly side3: number,
  ){
    if (side1 <= side2 + side3 || side2 <= side1 + side3 || side3 <= side1 + side2) {
      throw new Error("Invalid triangle: sum of any two sides must be greater than the third");
    }
    super(FigureType.Triangle);
    this.checkSide(side1,"side1");
    this.checkSide(side2,"side2");
    this.checkSide(side3,"side3");
  }
  // Получение площади
  getArea(): number {
    const p = this.getPerimeter() / 2;
    return Math.sqrt(p * (p - this.side1) * (p - this.side2) * (p - this.side3));
  }

  // Получение периметра
  getPerimeter(): number {
    return this.side1 + this.side2 + this.side3;
  }

  // Получение описания
  getDescription(): string {
    return `Triangle with side1 ${this.side1}, side2 ${this.side2} and side3 ${this.side3}`;
  }
}

// Пример использования
const square = new Square(-5);
console.log(square.getArea()); // 25
console.log(square.getPerimeter()); // 20
console.log(square.getType()); // square
console.log(square.getDescription()); // Square with side 5

console.log("-----------");

const rectangle = new Rectangle(4, 6);
console.log(rectangle.getArea()); // 24
console.log(rectangle.getPerimeter()); // 20
console.log(rectangle.getType()); // rectangle
console.log(rectangle.getDescription()); // Rectangle with width 4 and height 6

console.log("-----------");

const triangle = new Triangle(1, 4, 5);
console.log(triangle.getArea()); // 6
console.log(triangle.getPerimeter()); // 12
console.log(triangle.getType()); // triangle
console.log(triangle.getDescription()); // Triangle with side1 3, side2 4 and side3 5
