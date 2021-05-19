'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  orderDelivery: function ({ starterIndex, mainIndex, time, address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here's your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },
  orderPizza: function (mainIng, ...otherIng) {
    console.log(mainIng);
    console.log(otherIng);
  },
};

/*
// Destructuring arrays

// normally this is how we would retrieve these 3 elements
const arr = [1, 2, 3];
// const a = arr[0];
// const b = arr[1];
// const c = arr[2];

// with destructuring we can declare all 3 variables at the same time

const [x, y, z] = arr;
console.log(x, y, z);

let [main, , secondary] = restaurant.categories; // if we want to
console.log(main, secondary);

// switching variables

// const temp = main; // this is how we would do it without destructuring
// main = secondary;
// secondary = temp;

[main, secondary] = [secondary, main];

console.log(main, secondary);

// console.log(restaurant.order(2, 0));

// how we receive 2 values from a function
const [starter, mainCourse] = restaurant.order(2, 0);

console.log(starter, mainCourse);

// Nested array destructuring - one array inside another

const nested = [2, 3, [5, 6]];
// const [i, , j] = nested;
// console.log(i, j);

const [i, , [j, k]] = nested;
console.log(i, j, k);

// Default values

const [p = 1, q = 1, r = 1] = [8, 9];

console.log(p, q, r);

// Destructuring objects

const { name, openingHours, categories } = restaurant;

console.log(name, openingHours, categories);

// assigning new names for property names
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;

console.log(restaurantName, hours, tags);

// setting default values = useful when dealing with 3rd party data
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// mutating variables while destructuring objects

let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };

// { a, b } = obj; // we can't assign anything to a code block using the = sign

// for the above to work, we must add it into ()

({ a, b } = obj);
console.log(a, b);

// Nested objects

const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c);

restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});


// The spread operator (...)

const arr = [7, 8, 9]; // array literal
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];

console.log(badNewArr);

const goodNewArr = [1, 2, ...arr];

console.log(goodNewArr);

console.log(...goodNewArr);

// adding a new menu item

const newMenu = [...restaurant.mainMenu, 'Gnocchi'];

console.log(newMenu);

// copy array

const mainMenuCopy = [...restaurant.mainMenu];
console.log(mainMenuCopy);

// Join 2 arrays

const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(menu);

// iterables: arrays, strings, maps, sets. NOT object

const str = 'Jonas';

const letters = [...str, ' ', 'S.'];

console.log(letters);
console.log(...str);
console.log('j', 'o');
// console.log(`${...str} Schmedtmann`); // we can't use the spread operator like this


// Real life example using the spread operator

// const ingredients = [
  //   prompt(`Let's make pasta! Ingredient 1`),
  //   prompt(`Let's make pasta! Ingredient 2`),
  //   prompt(`Let's make pasta! Ingredient 3`),
  // ];
  
  // restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]); // this is the old way
  
  // restaurant.orderPasta(...ingredients); // using the spread operator
  
  // console.log(ingredients);
  
  // Objects
  
  const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };
  
  console.log(newRestaurant);
  
  const restaurantCopy = { ...restaurant };
  
  restaurantCopy.name = 'Ristorante Roma';
  
  console.log(restaurantCopy.name);
  console.log(restaurant.name);
  
  
  /////////////////////// REST pattern /////////////////////
  
  /////// Destructuring with REST pattern
  
  //SPREAD- because on RIGHT side of =
  const arr = [1, 2, ...[3, 4]];
  
  //REST- because on LEFT side of =
  const [a, b, ...others] = [1, 2, 3, 4, 5];
  console.log(a, b, others);
  
  const [pizza, , risotto, ...otherFood] = [
    ...restaurant.mainMenu,
    ...restaurant.starterMenu,
  ];

  console.log(pizza, risotto, otherFood);
  
  // Object
  
  const { sat, ...weekdays } = restaurant.openingHours;
  
  console.log(weekdays);
  
  /////////// Functions
  
  const add = function (...numbers) {
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) sum += numbers[i];
    console.log(sum);
  };
  
  add(2, 3);
  add(5, 3, 7, 2);
  add(8, 6, 6, 5, 3, 7, 2);
  
  const x = [23, 5, 7];
  add(...x);
  
  restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
  
  restaurant.orderPizza('mushrooms');
  
  
  //////// short circuiting with && and ||
  
  // Use ANY data type, return ANY data type - called short cirtuiting
  console.log('------- OR --------');
  console.log(3 || 'Jonas');
  
  console.log('' || 'Jonas');
  
  console.log(true || 0);
  
  console.log(undefined || null);
  
  console.log(undefined || 0 || '' || 'Hello' || 23 || null);
  
  // creating a variable with the number of guest, but we don't know whether the property exists already
  
  restaurant.numGuests = 0; // if the number of guests is 0 the below operations won't work, it'll show 10. It's a problem because the number of guest is actually 0
  
  const guests = restaurant.numGuests ? restaurant.numGuests : 10;
  console.log(guests);
  
  // we can do it with short circuiting as well
  const guests2 = restaurant.numGuests || 10; // it's 23 because it's already defined above. If it's not defined, it'll be 10.
  console.log(guests2);
  
  console.log('------- AND --------');
  
  console.log(0 && 'Jonas');
  console.log(7 && 'Jonas');
  
  console.log('Hello' && 23 && null && 'Jonas'); // displayed null because all are truthy until null.
  
  //practical example
  if (restaurant.orderPizza) {
    restaurant.orderPizza('mushrooms', 'spinach');
  } // we can use short circuiting instead, whenever we want to check if a certain property exists
  
  restaurant.orderPizza && restaurant.orderPizza('mushroom', 'spinach');
  
  */

////// Nullish Coalecing operator ??
// solving the guests = 0 falsy valuea ( which is not actually fals in this case, we can have 0 guests)

restaurant.numGuests = 0;

const guests = restaurant.numGuests || 10;
console.log(guests);

// Nullish values are null and undefined
const guestsCorrect = restaurant.numGuests ?? 10;
console.log(guestsCorrect);