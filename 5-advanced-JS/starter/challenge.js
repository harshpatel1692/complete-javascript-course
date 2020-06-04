/*
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).
*/
//Using IIFE (Immediately invoked function expression) so when the block is implemented in some other code, the variables doesn't clash or override.
/*
(function(){
    function Question(question, answers, correct){
        this.question = question;
        this.answers = answers;
        this.correct = correct;
    }

    Question.prototype.displayQuestion = function(){
        console.log(this.question);
        for (var i =0; i<this.answers.length; i++){
            console.log(i + ': ' + this.answers[i]);
        }
    }
    Question.prototype.checkAnswer = function(ans){
        if (ans===this.correct){
            console.log('Correct Answer!')
        }else{
            console.log('Wrong Answer!')
        }
    }
    var q1 = new Question('Is Javascript easy to learn?', ['Yes', 'No'], 0);
    var q2 = new Question('What is my name?', ['John', 'Harsh', 'Meet'], 1);
    var q3 = new Question('Sky is?', ['Red', 'Green', 'Blue'], 2);
    var q4 = new Question('Grass is?', ['Green', 'red', 'Blue'], 0);

    var questions = [q1, q2, q3, q4];
    var n = Math.floor(Math.random() * questions.length);

    questions[n].displayQuestion();

    var answer = parseInt(prompt('Please select the correct answer.'));
    questions[n].checkAnswer(answer);

})();
*/

//Challenge-2
(function(){
    function Question(question, answers, correct){
        this.question = question;
        this.answers = answers;
        this.correct = correct;
    }

    Question.prototype.displayQuestion = function(){
        console.log(this.question);
        for (var i =0; i<this.answers.length; i++){
            console.log(i + ': ' + this.answers[i]);
        }
    }

    Question.prototype.checkAnswer = function(ans, callback){
        var sc;
        if (ans===this.correct){
            console.log('Correct Answer!');
            sc=callback(true);

        }else{
            console.log('Wrong Answer!');
            sc=callback(false);
        }
        this.displayScore(sc);
    }

    Question.prototype.displayScore = function(score){
        console.log('Your current score is:'+ score);
        console.log('--------------------------------------------------');

    }

    var q1 = new Question('Is Javascript easy to learn?', ['Yes', 'No'], 0);
    var q2 = new Question('What is my name?', ['John', 'Harsh', 'Meet'], 1);
    var q3 = new Question('Sky is?', ['Red', 'Green', 'Blue'], 2);
    var q4 = new Question('Grass is?', ['Green', 'red', 'Blue'], 0);

    var questions = [q1, q2, q3, q4];

    function score(){
        var sc=0;
        return function(correct){
            if (correct){
                sc++;
            }
            return sc;
        }
    }
    var keepScore = score();
    function nextQuestion(){
        var n = Math.floor(Math.random() * questions.length);

        questions[n].displayQuestion();

        var answer = prompt('Please select the correct answer.');


        if (answer !== 'exit') {
            questions[n].checkAnswer(parseInt(answer), keepScore);
            nextQuestion(); //Looped forever but can break on 'exit'!
        }
        //nextQuestion(); //Looped forever!
    }
    nextQuestion(); //Call it once
})();