//Async/Await, AJAX, Promises

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