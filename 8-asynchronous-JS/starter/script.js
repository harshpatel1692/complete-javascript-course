//Async/Await, AJAX, Promises

/*
const second = () =>{
    setTimeout(() => {
        console.log('Second - Async');
    }, 2000);
}


const first = () => {
    console.log('Hey there');
    second();
    console.log('The end');
}

first();
*/

//Callback Hell - ES5
function getRecipe(){
    setTimeout(()=>{
        const recipeID = [523, 956, 346, 781, 322];
        console.log(recipeID);

        setTimeout((id)=>{
            const recipe = {title: 'Fresh tomato pasta', publisher:'John Doe'};
            console.log(`${id}: ${recipe.title}`);

            setTimeout(publisher => {
                const recipe2 = {title: 'Italian Pizza', publisher:publisher};
                console.log(`${id}: ${recipe2.title}`);
            }, 1500, recipe.publisher);

        }, 1000, recipeID[2]);
    }, 1500);

}
getRecipe();

