
// const taskA = () => {
//     return new Promise(resolve => {
//         setTimeout(() =>{
//             resolve("a");
//         }, delay());
//     });
// };

// const delay = () =>{
//     return Math.random() * (2000 - 100) + 100;
// }

// //Generator function
// function* nums(){

//     console.log("a");
//     yield 1;
//     console.log("b");
//     yield 2;
//     console.log("c");
//     yield 3;
// }

// const gen = nums();
// for (let num of gen){
//     console.log("In the loop");
//     console.log(num);
// }


import { Observable } from "rxjs";
import { take, skip, map, tap } from "rxjs/operators";


//pull
const o = new Observable<number>(subscriber => {
    console.log('get the interval started');
    let t = 0;
    
    

    const handle = setInterval(() => {
        //This stops generating if sub stops listening
        if (subscriber.closed){
            clearInterval(handle);
            return;
        }
        console.log('generate a new t');
        subscriber.next(t++);
    }, 500);


    
    // setTimeout(() => {
    //     clearInterval(handle);
    //     subscriber.complete();
    // }, 4000);
});


//This activates the observable
const sub  = o.pipe(
    take(5),  //Only use the first 5
    map(x => x * 2 ), //jump in and operate
    tap(x => console.log(x)), //tap into the stream
    skip(5),
).subscribe({
    next: (result) => console.log(result),
});

//unsubcribes from the observable, but observable keeps generating data 
setTimeout(() =>{
    sub.unsubscribe();
}, 10000);