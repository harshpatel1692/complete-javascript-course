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
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp:[],
            inc:[]
        },
        total: {
            exp: 0,
            inc: 0
        }
    }

    return {
        addItem: function(type, des, val){
            var newItem, ID;

            //last ID plus one
            ID = data.allItems[type].length > 0 ? data.allItems[type][data.allItems[type].length-1].id+1 : 0;

            if (type === 'exp'){
                newItem = new Expense(ID, des, val)
            } else if (type === 'inc') {
                newItem = new Income (ID, des, val)
            }

            data.allItems[type].push(newItem);
            return newItem;
        },
        testing: function(){
            return console.log(data);
        }
    };
})();

var UIController = (function(){
    //some code
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'

    }
    return {
        getinput: function(){
            return {
                type: document.querySelector(DOMstrings.inputType).value, // inc or exp value
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },
        getDOMstrings: function(){
            return DOMstrings
        }
    };
})();


var controller = (function (budgetCtrl, UICtrl){
    var setupEventListeners = function (){
        var DOMstrings = UICtrl.getDOMstrings();
        document.querySelector(DOMstrings.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress',function(event){
            if (event.keyCode === 13 || event.which === 13){
                ctrlAddItem();
            }
        });
    };

    var ctrlAddItem = function(){
        var input, newItem;
        //To do list
        //1. Get the field input data
        input = UICtrl.getinput();
        // console.log(input);
        //2. Add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        //3. Add item to the UI
        //4. Calculate the budge and display on UI

        // console.log('This is working');

    };

    return {
        init: function(){
            console.log('Application has started.');
            setupEventListeners();
        }
    };

})(budgetController, UIController);

controller.init();