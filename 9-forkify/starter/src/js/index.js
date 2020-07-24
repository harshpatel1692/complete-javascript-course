// Global app controller

import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import { elements, renderLoader, clearLoader } from './views/base';

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

/*
SEARCH CONTROLLER
*/
const controlSearch = async () => {

    // 1. get query from the view
    const query = searchView.getInput();

    if (query){
        // 2. create new Search object
        state.search = new Search(query);

        // 3. prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            // 4. call api and get results
            await state.search.getResults();

            // 5. Render results
            clearLoader();
            searchView.renderResults(state.search.result); //coming for Search.js -> this.result
        }
        catch (error){
            alert(error);
            clearLoader();
        }
    }

};

elements.searchForm.addEventListener('submit', e => {
   e.preventDefault();
   controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});

/*
RECIPE CONTROLLER
*/
const controlRecipe = async () => {
    const id = window.location.hash.replace('#',''); //remove # symbol from the id
    console.log(id);

    if (id) {
        // Prepare UI for changes
        renderLoader(elements.recipe);
        // Highlight selected search item
        if (state.search) {
            searchView.highlightSelected(id);
        }
        // Create recipe object
        state.recipe = new Recipe(id);
        try {
            // Get recipe data
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // Calculate servings and time
            state.recipe.calcServings();
            state.recipe.calcTime();

            // Render recipe
            clearLoader();
            recipeView.clearRecipe();
            recipeView.renderRecipe(state.recipe);
            // console.log(state.recipe);
        }
        catch (error) {
            alert(error);
        }
    }
};

/*
LIST CONTROLLER
*/
const controlList = () => {
    // Create a new list if there is none yet
    if (!state.list) state.list = new List();

    // Add each ingredient to the list
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
};

/*
window.addEventListener('hashchange', controlRecipe); //capture URL change
window.addEventListener('load', controlRecipe); //trigger on page load with hash
*/
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')){
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }

    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);

    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) { //element or child element
        controlList();

    }

});

// Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    // Handle the delete
    if (e.target.matches('.shopping__delete, .shopping__delete *')){
        //Delete from state
        state.list.deleteItem(id);

        //Delete from UI
        listView.deleteItem(id);

    // Handle the count update
    } else if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }
});

// window.l = new List();

