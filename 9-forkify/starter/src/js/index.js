// Global app controller

import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base';

/*
import string from './models/Search';
import { add, multiply, ID } from "./views/searchView";
Alternates to above statement
import { add as a, multiply as mul, ID } from "./views/searchView";
import * as searchView from "./views/searchView";
console.log(`Model to Controller: ${string}`);
console.log(`View to Controller: Add -> ${add(5, 6)} and Multiply -> ${multiply(5,6)}`);
*/

// https://forkify-api.herokuapp.com/api/search?q=pizza
// https://forkify-api.herokuapp.com/api/get


/*
Global state of the app
- Search Object
- Current recipe object
- Shopping list object
- Liked recipes
*/
const state = {};

const controlSearch = async () => {

    // 1. get query from the view
    const query = searchView.getInput();

    if (query){
        // 2. create new Search object
        state.search = new Search(query);

        // 3. prepare UI for results
        searchView.clearInput();
        searchView.clearResults();

        // 4. call api and get results
        await state.search.getResults();

        // 5. Render results
        searchView.renderResults(state.search.result); //coming for Search.js -> this.result
    }

};

elements.searchForm.addEventListener('submit', e => {
   e.preventDefault();
   controlSearch();
});







