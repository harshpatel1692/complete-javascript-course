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
            }, 500, recipe.publisher);

        }, 200, recipeID[2]);
    }, 200);

}
getRecipe();




//Promises

const getIDs = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        resolve([523, 956, 346, 781, 322]);
    }, 1500);
});

const getRecipe1= recID => {
    return new Promise((resolve, reject)=>{
        setTimeout((id)=>{
            const recipe = {title: 'Fresh fettuccine pasta', publisher:'John Doe'};
            resolve([id, recipe]);
        }, 1000, recID);

    });
};

const getRelated = publisher => {
    return new Promise((resolve, reject) => {
        setTimeout(pub => {
            const recipe = {title: 'Fresh zucchini pasta', publisher:'John Doe'};
            resolve(`${pub}: ${recipe.title}`);
        }, 1500, publisher);
    });
};
getIDs
.then(IDs => {
    console.log('---Promises---');
    console.log(IDs);
    return getRecipe1(IDs[3])
})
.then(([id, recipe]) => {
    console.log(`${id}: ${recipe.title}`);
    return getRelated(recipe.publisher);
})
.then(relatedRecipe=>{
    console.log(relatedRecipe);
})
.catch(error => {
    console.log(error);
});
