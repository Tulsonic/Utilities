/****************************
        Utitlities
****************************/

//-------------------------------------------//
//---------------- Functions ----------------//
//-------------------------------------------//

/**
 * Map returns a value, maped from an input range onto a target range
 * @method  map
 * @param   {Number}    value   The value to map
 * @param   {Number}    start1  Start of the input range
 * @param   {Number}    stop1   End of the input range
 * @param   {Number}    start2  Start of the target range
 * @param   {Number}    stop2   End of the target range
 * @returns {Number}            The maped value
 * @example
 *  console.log(map(0.5, 0, 1, 0, 100)); => 50
 */
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

/**
 * Returns a number between 0 and 1 (no parameters given)
 *
 * Returns a random number between min and max (both parameters gieven)
 *
 * Returns a random number between 0 and max (single parameter given)
 *
 * @method  random
 * @param   {Number | Array}    [input1]    The value to map
 * @param   {Number}            [input2]    Start of the input range
 * @returns {*}                             Random item or number based on parameters
 * @example
 *  console.log(random()); => 0.3557
 *  console.log(random(15)); => 10.89083
 *  console.log(random(["Apple", "Orange", "Banana"])); => Orange
 */
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

// makes the code wait for ms amount of miliseconds
function sleep(ms) {
    let now = Date().now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - now != ms);
}

//-------------------------------------------//
//-------------- Math Functions -------------//
//-------------------------------------------//

function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

function relu(x) {
    return x < 0 ? 0 : x;
}

//-------------------------------------------//
//----------------- Vectors -----------------//
//-------------------------------------------//

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

//-------------------------------------------//
//----------------- Matrices ----------------//
//-------------------------------------------//

class Matrix {
    constructor(_rows, _cols, _data = []) {
        this.rows = _rows;
        this.cols = _cols;
        this.data = _data;

        if (_data.length == 0 || _data == null) {
            for (let i = 0; i < this.rows; i++) {
                this.data[i] = [];
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] = 0;
                }
            }
        } else if (_data.length != this.rows || _data[0].length != this.cols) {
            console.error("Invalid data size");
        }
    }
    randomize(min, max, floor) {
        for (let i = 0; i < this.rows; i++) {
            this.data[i] = [];
            for (let j = 0; j < this.cols; j++) {
                if (floor) {
                    this.data[i][j] = Math.floor(random(min, max));
                } else {
                    this.data[i][j] = random(min, max);
                }
            }
        }
    }
    add(input) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (input instanceof Matrix) {
                    this.data[i][j] += input.data[i][j];
                } else if (typeof input == "number") {
                    this.data[i][j] += input;
                }
            }
        }
    }
    static add(mat1, mat2) {
        let newMat = new Matrix(mat1.rows, mat1.cols);
        for (let i = 0; i < newMat.rows; i++) {
            for (let j = 0; j < newMat.cols; j++) {
                if (mat2 instanceof Matrix) {
                    newMat.data[i][j] = mat1.data[i][j] + mat2.data[i][j];
                } else if (typeof mat2 == "number") {
                    newMat.data[i][j] = mat1.data[i][j] + mat2;
                }
            }
        }
        return newMat;
    }
    subtract(input) {
        let sub = null;
        if (input instanceof Matrix) {
            sub = Matrix.multiply(input, -1);
        } else {
            sub = -input;
        }
        this.add(sub);
    }
    static subtract(mat1, mat2) {
        let sub = null;
        if (mat2 instanceof Matrix) {
            sub = Matrix.multiply(mat2, -1);
        } else {
            sub = -mat2;
        }
        return Matrix.add(mat1, sub);
    }
    multiply(input) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (input instanceof Matrix) {
                    this.data[i][j] *= input.data[i][j];
                } else if (typeof input == "number") {
                    this.data[i][j] *= input;
                }
            }
        }
    }
    static multiply(mat1, mat2) {
        let newMat = new Matrix(mat1.rows, mat1.cols);
        for (let i = 0; i < newMat.rows; i++) {
            for (let j = 0; j < newMat.cols; j++) {
                if (mat2 instanceof Matrix) {
                    newMat.data[i][j] = mat1.data[i][j] * mat2.data[i][j];
                } else if (typeof mat2 == "number") {
                    newMat.data[i][j] = mat1.data[i][j] * mat2;
                }
            }
        }
        return newMat;
    }
    static matMultiply(mat1, mat2) {
        if (mat1.cols == mat2.rows) {
            let newMat = new Matrix(mat1.rows, mat2.cols);
            for (let i = 0; i < newMat.rows; i++) {
                for (let j = 0; j < newMat.cols; j++) {
                    let sum = 0;
                    for (let k = 0; k < mat1.cols; k++) {
                        sum += mat1.data[i][k] * mat2.data[k][j];
                    }
                    newMat.data[i][j] = sum;
                }
            }
            return newMat;
        } else {
            console.error(
                "Coloms of the input must equal to the caller matrixes rows"
            );
        }
    }
    map(fn) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let val = this.data[i][j];
                this.data[i][j] = fn(val);
            }
        }
    }
    static map(mat, fn) {
        let newMat = new Matrix(mat.rows, mat.cols);
        for (let i = 0; i < mat.rows; i++) {
            for (let j = 0; j < mat.cols; j++) {
                let val = mat.data[i][j];
                newMat.data[i][j] = fn(val);
            }
        }
        return newMat;
    }
    static transpose(mat) {
        let newMat = new Matrix(mat.cols, mat.rows);
        for (let i = 0; i < mat.rows; i++) {
            for (let j = 0; j < mat.cols; j++) {
                newMat.data[j][i] = mat.data[i][j];
            }
        }
        return newMat;
    }
    print() {
        console.table(this.data);
    }
}

m = new Matrix(2, 4, [
    [1, -5, 3, 6],
    [6, 4, 2, 5]
]);
m1 = new Matrix(2, 4, [
    [4, 2, 5, 2],
    [1, 8, 7, 3]
]);
console.table(m.data);
m2 = Matrix.map(m, relu);
console.table(m2.data);
