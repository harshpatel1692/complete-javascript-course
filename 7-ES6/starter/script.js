// ES5 vs ES6


//ES5 - Function scope
function driversLicense5(passedTest){
    if (passedTest){
        var firstName = 'John';
        var yearOfBirth = 1990;
    }
    console.log(firstName, yearOfBirth);
}
//ES6 - Block scope i.e. the scope is wherever the vars are declared.
//ES6 - CONST can't be declared without value and later assigned a value.
function driversLicense6(passedTest){
    let firstName;
    const yearOfBirth = 1990;
    if (passedTest){
        firstName = 'John';
    }
    console.log(firstName, yearOfBirth);
}

driversLicense5(true);
driversLicense6(true);


//Template literals
let firstName = 'John';
let lastName = 'Smith';
console.log(`The name is ${firstName} ${lastName}`);

const n = `${firstName} ${lastName}`;
console.log(n.startsWith('J'));
console.log(n.endsWith('th'));
console.log(n.includes('oh'));
console.log(firstName.repeat(5));
console.log(`${firstName} `.repeat(5));


//ES5
var box5 = {
    color:'green',
    position:1,
    clickMe: function(){
        document.querySelector('.green').addEventListener('click', function(){
            alert('This is box number ' + this.position + ' and it is ' + this.color)
        });
    }
}

box5.clickMe(); //This is popup as undefined as function inside query selector doesn't have access to this variables


const box6 = {
    color:'green',
    position:1,
    clickMe: function(){
        document.querySelector('.green').addEventListener('click', () => {
            alert(`This is box number ${this.position} and it is ${this.color}`)
        });
    }
}
box6.clickMe(); //value of this keyword is preserved from its surrounding or outer block

//this will fail
/*
const box6 = {
    color:'green',
    position:1,
    clickMe: () => {
        document.querySelector('.green').addEventListener('click', () => {
            alert('This is box number ' + this.position + ' and it is ' + this.color)
        });
    }
}*/

const boxes = document.querySelectorAll('.box')
//ES5
var boxesArr5 = Array.prototype.slice.call(boxes);

boxesArr5.forEach(function(cur){
   cur.style.backgroundColor = 'dodgerblue';
});

//ES6
const boxesArr6 = Array.from(boxes);
boxesArr6.forEach(cur => cur.style.backgroundColor = 'green');


//ES6
var ages = [12, 17, 29, 5, 16, 11, 50]
console.log('Ages: ' + ages.findIndex(cur => cur >=18));
console.log('Ages: ' + ages.find(cur => cur >=18));

//Parks and Streets
class Element{
    constructor(name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }
}
class Park extends Element{
    constructor(name, buildYear, area, numTrees) {
        super(name, buildYear);
        this.area = area;
        this.numTrees = numTrees;
    }
    treeDensity(){
        const density = this.numTrees/this.area;
        console.log(`${name} has  a tree density of ${density} trees per square km.`)
    }
}

class Street extends Element{
    constructor(name, buildYear, length, size=3) {
        super(name, buildYear);
        this.length = length;
        this.size = size;
    }
    classifyStreet(){
        const classification = new Map();
        classification.set(1, 'tiny');
        classification.set(2, 'small');
        classification.set(3, 'normal');
        classification.set(4, 'big');
        classification.set(5, 'huge');
        console.log(`${this.name}, build i ${this.buildYear}, is a ${classification.get(this.size)} street`);
    }
}

const allParks = [new Park('Green Park', 1989, 0.2, 215),
                    new Park('National Park', 1894, 2.9, 3541),
                    new Park('Oak Park', 1953, 0.4, 949)];

const allStreets = [new Street('Ocean Avenue', 1999, 1.1,4),
                    new Street('Evergreen', 2015, 0.8, 2),
                    new Street('Sunset Boulevard', 1982, 2.5, 5)];

function calc(arr){
    const sum = arr.reduce((prev, cur, index) => prev+cur, 0)

    return [sum, sum/arr.length];
}

function reportParks(p){

    console.log('-----------PARKS REPORT-----------');

    // Density
    p.forEach(el => el.treeDensity());

    // Avg age
    const ages = p.map(el => new Date().getFullYear() -el.buildYear);
    const [totalAge, avgAge] = calc(ages);
    console.log(`Our ${p.length} parks have total age of ${totalAge} and an average of ${avgAge} years.`);

    // Which park has more than 1000 trees
    const i = p.map(el => el.numTrees).findIndex(el => el>= 1000);
    console.log(`${p[i].name} has more than 1000 trees.`);
}

function reportStreets(s){
    console.log('-----------Streets REPORT-----------');
    //Total and avg streets
    const [totalLength, avgLength] = calc(s.map(el => el.length));
    console.log(`Our ${s.length} streets have a total length of ${totalLength} km, with an average of ${avgLength} km.`);

    //Classify sizes
    s.forEach(el => el.classifyStreet());
}

reportParks(allParks);
reportStreets(allStreets);