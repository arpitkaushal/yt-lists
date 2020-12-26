// kick off both things, one after another
const coffeePromise = makeCoffee();
const breakfastPromise = makeBreakfast();

// then once each are done, deal with them
coffeePromise.then(coffee => {
    drinkcoffee();
});

breakfastPromise.then( ([eggs,poha]) => {
    eat(eggs,poha);
});

// you can also wait until both are done
Promise
    .all([coffeePromise, breakfastPromise])
    .then(([coffee, breakfast]) => {
        sitDownWith(coffee,breakfast);
    });



function sleep (amount) {
    return new Promise( (resolve, reject) => {
        if(amount <=300) {
            return reject('That is too fast, cool it down!');
        }
        setTimeout(() => resolve(`Slept for ${amount}`), amount);
    });
}



moveTo(50,50)
    .then(() =>  moveTo(20,100))
    .then(() => moveTo(100,200))
    .then(() => moveTo(2,10))

// becomes

async function animate() {
    await moveTo(50,50);
    await moveTo(20,100);
    await moveTo(100,200);
    await moveTo(2,10);
}