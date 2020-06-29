var budgetController = (function(){
/*
    var x =23;
    var add = function(a) {
        return x+a;
    }
    return {
        publicTest: function(b) {
            console.log(add(b));
        }
    }
*/

})();

var UIController = (function(){
    //some code
})();


var controller = (function (budgetCtrl, UICtrl){
    var ctrlAddItem = function(){
        //To do list
        //1. Get the field input data
        //2. Add the item to the budget controller
        //3. Add item to the UI
        //4. Calculate the budge and display on UI
        console.log('This is working');
    };
    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress',function(event){
        if (event.keyCode === 13 || event.which === 13){
            ctrlAddItem();
        }
    });

})(budgetController, UIController);