'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // before ES6 we would write:
  // openingHours: openingHours,

  // ES6 enhanced object literals
  openingHours,

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  orderDelivery({ starterIndex, mainIndex, time, address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here's your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },
  orderPizza(mainIng, ...otherIng) {
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
  
  
  ////// Nullish Coalecing operator ??
  // solving the guests = 0 falsy valuea ( which is not actually fals in this case, we can have 0 guests)
  
  restaurant.numGuests = 0;
  
  const guests = restaurant.numGuests || 10;
  console.log(guests);
  
  // Nullish values are null and undefined
  const guestsCorrect = restaurant.numGuests ?? 10;
  console.log(guestsCorrect);
  
  //////////////////// Coding Challenge #1 //////////////////////////
  
  
We're building a football betting app (soccer for my American friends 😅)!
Suppose we get data from a web service about a certain game ('game' variable on next page). In this challenge we're gonna work with that data.

Your tasks:

1. Create one player array for each team (variables 'players1' and
'players2')

2. The first player in any player array is the goalkeeper and the others are field
players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players

3. Create an array 'allPlayers' containing all players of both teams (22 players)

4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'

5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')

6. Write a function ('printGoals') that receives an arbitrary number of player names (not an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)

7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, without using an if/else statement or the ternary operator.

Test data for 6.: First, use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'.
Then, call the function again with players from game.scored

*/

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

/*

//1

const [players1, players2] = game.players;
console.log(players1, players2);

//2
const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

//3
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

//4
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

//5
const {
  odds: { team1, x: draw, team2 },
} = game;
console.log(team1, draw, team2);

//6
const printGoals = function (...players) {
  console.log(`${players.length} goals were scored`);
};

printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals('Davies', 'Muller');

printGoals(...game.scored);

//7
team1 < team2 && console.log('Team 1 is more likely to win');

team1 > team2 && console.log('Team 2 is more likely to win');


// Looping Arrays: the FOR-OF loop

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu) console.log(item);

// if we need the index

// for (const item of menu.entries()) {
  //   console.log(`${item[0] + 1}: ${item[1]}`); // this is the old way
  // }
  
  // we can do it better with destructuring elem
  for (const [i, el] of menu.entries()) {
    console.log(`${i + 1}: ${el}`);
  }
  // console.log([...menu.entries()]);
  
  
  // Enhanced Object Literals
  
  
  ///////////////// Optional chaining
  
  // console.log(restaurant.openingHours.mon.open); // by adding .open will have an error because the first part is undefined
  
  // we have to use an if statement to find out whether the property exists or not
  
  // if (restaurant.openingHours.fri) console.log(restaurant.openingHours.fri.open); // this one exists
  
  //let's say we don't know if opening hours exist
  
  // if (restaurant.openingHours && restaurant.openingHours.mon)
  // console.log(restaurant.openingHours.mon.open); // this can get really messy in bigger projects, therefore there's another solution for this from ES2020
  
  // ES 2020 introduced optional chaining
  
  // console.log(restaurant.openingHours.mon?.open);
  
  // console.log(restaurant.openingHours?.mon?.open);
  
  // real life example - we want to loop over the below array and to print to the console whether the resto is open or closed on each of days
  
  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  
  for (const day of days) {
    const open = restaurant.openingHours[day]?.open ?? 'closed';
    console.log(`On ${day}, we open at ${open}`);
  }
  
  // for calling methods - we can check if a method exists before we call it.
  
  console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
  
  console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');
  
  // Arrays
  
  // const users = [
    //   {
      //     name: 'Jonas',
      //     email: 'hello@mail.com',
      //   },
      // ];
      
      const users = [];
      console.log(users[0]?.name ?? 'User array empty');
      
      if (users.length > 0) console.log(users[0].name);
      else console.log('user array empty');


 // Looping objects: object keys, values, and entries
      
//looping over property names - also called keys
      
      const properties = Object.keys(openingHours);
      console.log(properties);
      
      let openStr = `We are open on ${properties.length} days `;
      
      for (const day of properties) {
        openStr += `${day},`;
      }
      
      console.log(openStr);
      
// looping over property values
      
      const values = Object.values(openingHours);
      
      console.log(values);

 // looping over the entire object
      
      const entries = Object.entries(openingHours);
      
      // console.log(entries); // we get an array where we have first the key and then the value.
      
      // we are destructuring [key, value]
      for (const [key, { open, close }] of entries) {
        console.log(`On ${key} we open at ${open} and close at ${close}`);
      }
      


///////////////////////Coding Challenge #2

/*
Let's continue with our football betting app! Keep using the 'game' variable from before.

Your tasks:
1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already
studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exactly 

like this:
Odd of victory Bayern Munich: 1.33
Odd of draw: 3.25
Odd of victory Borrussia Dortmund: 6.5

Get the team names directly from the game object, don't hardcode them
(except for "draw"). Hint: Note how the odds and the game objects have the
same property names 😉


4. Bonus: Create an object called 'scorers' which contains the names of the
players who scored as properties, and the number of goals as the value. In this
game, it will look like this:
{
Gnarby: 1,
Hummels: 1,
Lewandowski: 2


//1

for (const [i, player] of game.scored.entries()) {
  console.log(`Goal ${i + 1}: ${player}`);
}

//2

const odds = Object.values(game.odds);
let average = 0;

for (const odd of odds) average += odd;
average /= odds.length;
console.log(average);

//3

for (const [team, odd] of Object.entries(game.odds)) {
  const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
  console.log(`Odd of ${teamStr} ${odd}`);
}


// Sets - another data structure

const orderSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);

console.log(orderSet); // duplicates are removed

// sets are iterable
console.log(new Set('jonas'));
console.log(new Set(''));

// check for size
console.log(orderSet.size);

// check if an elem exists
console.log(orderSet.has('Pizza')); // true
console.log(orderSet.has('Bread')); // false

// add new elem to a set

orderSet.add('Garlic Bread');
orderSet.add('Garlic Bread'); // this will be ignored, because it's a duplicate

// removing an elem from a set
orderSet.delete('Risotto');

//to remove all elem in a set
// orderSet.clear();
console.log(orderSet);

//because it's iterable, we can also loop over them
for (const order of orderSet) console.log(order);

// real life example

const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];

//if we want to use the above array to find out what unique positions are available in a business, we would use a set to retrieve the unique values

const availableUnique = new Set(staff);
// const availableUnique = [...new Set(staff)]; // we can use the spread operator to convert it to an array

console.log(availableUnique);

// if we want to know how many positions are available, use size property

console.log(
  new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size
  );
  
  // we can also count how many letters are in a string
  
  console.log(new Set('boroskinga').size);
  
  
  /////////////////////////  MAPS ////////////////
  
  const rest = new Map();
  rest.set('name', 'Classico Italiano');
  rest.set(1, 'Firenze, Italy');
  // console.log(rest.set(2, 'Lisbon, Portugal'));
  
  rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open')
  .set(false, 'We are closed');
  
  // to read data from the map we use the get method
  
  // console.log(rest.get('name'));
  // console.log(rest.get(true));
  // console.log(rest.get(1));
  
  const time = 8;
  // console.log(rest.get(time > rest.get('open') && time < rest.get('close')));
  
  //check if a map contains a certain key with has
  
  // console.log(rest.has('categories'));
  
  //deleting a key with delete
  rest.delete(2);
  // console.log(rest);
  
  // get the size
  rest.size;
  
  //remove all data
  
  // (rest.clear);
  
  //using objects / arrays as map keys
  
  // in order to work we have to create an array with the object and then use it to get data out from it.
  
  const arr = [1, 2];
  
  rest.set(arr, 'Test');
  
  // useful for dom elements as well
  rest.set(document.querySelector('h1'), 'Heading'); // special type of object
  console.log(rest);
  
  // console.log(rest.get([1, 2])); // it's undefined, because it's not the same as we wrote it above.
  
  console.log(rest.get(arr)); // it works because they refer to at the same place in memory
  
  
  //// MAPS iteration
  
  const question = new Map([
    ['question', 'What is the best programming language in the world'],
    [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct'],
  [false, 'Try again'],
]);

console.log(question);

// convert an object to map

console.log(Object.entries(openingHours)); // returns an array of arrays

const hoursMap = new Map(Object.entries(openingHours));

console.log(hoursMap);

// Quiz app
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}

// const answer = Number(prompt('Your answer:'));
const answer = 3;
console.log(answer);

console.log(question.get(question.get('correct') === answer));

// convert a map to array

console.log([...question]);
console.log([...question.entries()]);
console.log([...question.keys()]);
console.log([...question.values()]);

*/

//////////////////////// Coding Challenge #3
/*
Let's continue with our football betting app! This time, we have a map called 'gameEvents' (see below) with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).


Your tasks:
1. Create an array 'events' of the different game events that happened (no duplicates)

2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.

3. Compute and log the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)

4. Loop over 'gameEvents' and log each element to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this: [FIRST HALF] 17: ⚽ GOAL


const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '🔶 Yellow card'],
]);

//1

// console.log(gameEvents.values());

const events = [...new Set(gameEvents.values(gameEvents))];

console.log(events);

//2

gameEvents.delete(64);
// console.log(gameEvents);

//3
console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes`
  );
  
  //bonus point here
  const time = [...gameEvents.keys()].pop();
  
  console.log(time);
  
  console.log(
    `An event happened, on average, every ${time / gameEvents.size} minutes`
    );
    
    //4
    
    for (const [min, event] of gameEvents) {
      const half = min <= 45 ? 'First' : 'SECOND';
      console.log(`[${half} HALF] ${min}: ${event}`);
    }
    
*/

/////////// Working with strings

const airline = 'TAP Air Portugal';
const plane = 'A320';

/*
console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log('B737'[0]);

console.log(airline.length);
console.log('B737'.length);

// Methods
// get the position of a certain letter in a string
console.log(airline.indexOf('r')); // first occurence
console.log(airline.lastIndexOf('r')); //last occurence

console.log(airline.indexOf('Portugal')); // search for an entire word - case sensitive

console.log(airline.slice(4)); // A starts at position 4 - where it starts to extract - the result is called a sub string (because it's just a part of a string)

console.log(airline.slice(4, 7)); // the result is Air because this will do 7-4 = 3

console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1));

console.log(airline.slice(-2)); // extracts the last 2 letters from the string

console.log(airline.slice(1, -1));

const checkMiddleSeat = function (seat) {
  //B and E are middle seats
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') console.log(`You got the middle seat`);
  else console.log('You got lucky');
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

// this is what JS does behind the scenes whenever we call a method on a string. When the operation is done, the object is converted back to a primitive string.
console.log(new String('jonas'));
console.log(typeof new String('Jonas'));

console.log(typeof new String('jonas').slice(1)); // this is back to string

*/

// Changing a case of a string

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// practical example - to fix the capitalization in name

const pax = 'jOnAs'; // should be 'Jonas'

const paxLower = pax.toLowerCase();
console.log(paxLower);

const paxCorrect = paxLower[0].toUpperCase() + paxLower.slice(1);
console.log(paxCorrect);

// Compare emails - when the capitalization is wrong

const email = 'hello@jonas.io';

const loginEmail = '  Hello@Jonas.Io \n';

// const lowerEmail = loginEmail.toLowerCase();
// const trimmedEmail = lowerEmail.trim(); // to trim empty spaces

const normalizedEmail = loginEmail.toLowerCase().trim();

console.log(normalizedEmail);

console.log(email === normalizedEmail);

// Replacing values of a string

const priceGB = '288, 97£';
const priceUS = priceGB.replace('£', '$').replace(',', '.');

console.log(priceUS);

const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';

console.log(announcement.replace('door', 'gate')); // this will change only the first occurence

console.log(announcement.replaceAll('door', 'gate')); // to change all words in a tring

// console.log(announcement.replace(/door/g, 'gate')); // g stands for global. This is how we would fix before replaceAll method existed.

// Booleans - to verify if something exists in a string

const airplane = 'Airbus A320neo';

console.log(airplane.includes('A320')); // true
console.log(airplane.includes('Boeing')); // false

console.log(airplane.startsWith('Air')); // false

if (airplane.startsWith('Airbus') && airplane.endsWith('neo')) {
  console.log('Part of the NEW Airbus family');
}

// Practice exercise

const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log(
      `You are NOT allowed to boad the place with these items in your baggage!`
    );
  } else {
    console.log('Your baggage is safe for boarding');
  }
};

checkBaggage('I have a laptop, some Food and a pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and a gun for protection');

// must be converted to lower case, because some of the words are different in line 937
