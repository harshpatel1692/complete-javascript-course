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
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    }
    var calculateTotal = function(type){
        var sum = 0;
        data.allItems[type].forEach(function(curr){
            sum += curr.value;
        });
        data.totals[type] = sum;
    };
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
        calculateBudget: function(){
            //Calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');
            //Calculate budget
            data.budget = data.totals.inc - data.totals.exp;
            //Calculate the percentage of income that is spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
        },
        getBudget: function(){
            return {
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage,
                budget: data.budget
            }
        },
        deleteItem: function(type, id){
            var ids, index;
            ids = data.allItems[type].map(function(current){
                return current.id;
            });
            index = ids.indexOf(id);
            if (index !== -1){
                data.allItems[type].splice(index, 1);
            }
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
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container'
    }
    return {
        getinput: function(){
            return {
                type: document.querySelector(DOMstrings.inputType).value, // inc or exp value
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value) //Need it as float to total the amount in budget
            };
        },
        addListItem: function(obj, type){
            var html, newHtml, element;
            // Create HTML strings with placeholder text

            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div>\<' +
                    'div class="right clearfix"><div class="item__value">%value%</div>\<' +
                    'div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div> </div></div>';
            }else if (type === 'exp') {
                element = DOMstrings.expenseContainer;
                html =  '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div>\<' +
                        'div class="right clearfix"><div class="item__value">%value%</div> <div class="item__percentage">21%</div>\<' +
                        'div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        clearFields: function(){
            var fields, fieldsArr;
            /*Important info: Use of prototype and forEach*/
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function(current, index, array){
                current.value = "";
            });
            fieldsArr[0].focus(); //move the cursor
        },
        displayBudget: function(obj){
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;
            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '0%';
            }
        },
        deleteItem: function(selectorId){
            var el =  document.getElementById(selectorId);
            el.parentNode.removeChild(el);
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

        document.querySelector(DOMstrings.container).addEventListener('click', ctrlDeleteItem);
    };
    var updateBudget = function(){
        //1. Calculate the budget
        budgetCtrl.calculateBudget();
        //2. Return the budget
        var budget = budgetCtrl.getBudget();
        //3. Display the budget on the UI
        //console.log(budget)
        UICtrl.displayBudget(budget);
    };
    var ctrlAddItem = function(){
        var input, newItem;
        //To do list
        //1. Get the field input data
        input = UICtrl.getinput();
        // console.log(input);
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            //2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            //3. Add item to the UI
            UICtrl.addListItem(newItem, input.type);
            //4. Clear fields
            UICtrl.clearFields();
            //5. Calculate the budget and display on UI
            updateBudget();
            // console.log('This is working');
        } else {
            alert("Requires Description and Amount!");
        }
    };

    //dynamically deleting n number of components/elements
    var ctrlDeleteItem = function(event){
        var itemId, splitId, type, id;
        itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if (itemId) {
            splitId = itemId.split('-');
            type = splitId[0];
            id = parseInt(splitId[1]);

            //1. Delete the item from data structure
            budgetCtrl.deleteItem(type, id);
            //2. Delete the item from the UI
            UICtrl.deleteItem(itemId); //need to pass the whole id and not the split parts
            //3. Update and show the new budget
            updateBudget();
        }
    };
    return {
        init: function(){
            console.log('Application has started.');
            UICtrl.displayBudget({
                totalInc: 0,
                totalExp: 0,
                percentage: '-',
                budget: 0
            })
            setupEventListeners();
        }
    };

})(budgetController, UIController);

controller.init();