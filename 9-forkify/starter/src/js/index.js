// Global app controller
import string from './models/Search';

import { add, multiply, ID } from "./views/searchView";
// Alternates to above statement
// import { add as a, multiply as mul, ID } from "./views/searchView";
// import * as searchView from "./views/searchView";


console.log(`Model to Controller: ${string}`);
console.log(`View to Controller: Add -> ${add(5, 6)} and Multiply -> ${multiply(5,6)}`);
