/****************************
        Utitlities
****************************/

//----------------- Functions -----------------//

// Map returns a value, maped from an input range onto a target range
function map(value, start1, stop1, start2, stop2) {
    if (
        typeof value == "number" &&
        typeof start1 == "number" &&
        typeof stop1 == "number" &&
        typeof start2 == "number" &&
        typeof stop2 == "number"
    ) {
        let slope = (stop2 - start2) / (stop1 - start1);
        return start2 + (value - start1) * slope;
    } else {
        console.error("Invalid data type, all parameter of map accept Number");
    }
}

// Returns a number between 0 and 1
// Returns a random number between min and max
// Returns a random number between 0 and max
// Returns a random item from an array
function random(input1 = 0, input2 = 0) {
    if (input1 == 0 && input2 == 0) {
        return Math.random();
    } else if (input2 == 0) {
        if (input1 instanceof Array) {
            let arrayIndex = Math.floor(Math.random() * input1.length);
            return input1[arrayIndex];
        } else if (typeof input1 == "number") {
            return Math.random() * input1;
        } else {
            console.error(
                "Invalid data type, first parameter of random accepts Number or Array"
            );
        }
    } else if (typeof input2 == "number" && typeof input1 == "number") {
        return Math.random() * (input2 - input1) + input1;
    } else {
        console.error(
            "Invalid data type, second and first parameters of random accept Number"
        );
    }
}

// Linearly interpolates between two values
function lerp(end, start, t) {
    return start * (1 - t) + end * t;
}

//----------------- Vectors -----------------//

class Vector {
    constructor(_x, _y) {
        this.x = _x;
        this.y = _y;
    }
    // MATHS
    // Simple addition of two vectors
    static add(vector1, vector2) {
        if (vector1 instanceof Vector && vector2 instanceof Vector) {
            let newX = vector1.x + vector2.x;
            let newY = vector1.y + vector2.y;

            return new Vector(newX, newY);
        } else {
            console.error("Invalid data type, input vectors");
        }
    }
    add(vector2) {
        if (vector2 instanceof Vector) {
            this.x = this.x + vector2.x;
            this.y = this.y + vector2.y;

            return this;
        } else {
            console.error("Invalid data type, input vectors");
        }
    }
    // Calculates distance between two points, returns as vector
    static distance(vector1, vector2) {
        if (vector1 instanceof Vector && vector2 instanceof Vector) {
            let newX = vector1.x - vector2.x;
            let newY = vector1.y - vector2.y;

            return new Vector(-newX, -newY);
        } else {
            console.error("Invalid data type, input vectors");
        }
    }
    distance(vector2) {
        if (vector2 instanceof Vector) {
            this.x = this.x - vector2.x;
            this.y = this.y - vector2.y;

            return this;
        } else {
            console.error("Invalid data type, input vectors");
        }
    }
    // Multiplies the vector with a number
    static multiply(vector1, num) {
        if (vector1 instanceof Vector && typeof num == "number") {
            let newX = vector1.x * num;
            let newY = vector1.y * num;

            return new Vector(newX, newY);
        } else {
            console.error("Invalid data type, input vector and number");
        }
    }
    multiply(num) {
        if (typeof num == "number") {
            this.x = this.x * num;
            this.y = this.y * num;

            return this;
        } else {
            console.error("Invalid data type, input number");
        }
    }
    // Normalizes the vector
    static normalize(vector) {
        if (vector instanceof Vector) {
            let mag = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
            if (mag != 0) {
                let newX = vector.x / mag;
                let newY = vector.y / mag;

                return new Vector(newX, newY);
            } else {
                return Vector.zero();
            }
        } else {
            console.error("Invalid data type, input vector");
        }
    }
    normalize() {
        let mag = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
        if (mag != 0) {
            this.x /= mag;
            this.y /= mag;
        } else {
            return Vector.zero();
        }
        return this;
    }
    // PROPERTIES
    // Returns the magnitude
    static zero() {
        return new Vector(0, 0);
    }
    magnitude() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
    // Returns the vector as a string for debugging
    toString() {
        return [this.x, this.y];
    }
}
