var arr = [[1, 1, 1], [2, 2, 2], [3, 3, 3]];

// goes through the arrays and adds them separately
var sum = function(array){
  return array.reduce(function(a ,b){
    return a + b;
  }, 0);
};

console.log(arr.map(sum));

// vertical sum
console.log(arr.map(function(row, i){
  return sum(arr.map(function(row){
    return row[i];
  }));
}));

// **************

var numbers = [
  { one: "1",
    two: "2",
    three: "3"
  },
  { four: "4",
    five: "5",
    six: "6"
  },
  { seven: "7",
    eight: "8",
    nine: "9" 
  }
];

var arrayFilter = {
  filter: function(item, filter) {
    var matches = [];
    for (var i = 0; i < item.length; i++) {
      if(filter(item[i]))
        matches.push(item[i]);
    }
     console.log(matches);
  }
};

var getNumber = arrayFilter.filter(numbers, function(item) {
  return item.four === "4"
});

// console.log(arrayFilter.filter.matches); currently undefined

// ****************
// callback stuff
// when findWaldo is called, there's an array with Waldo included. That array is the first argument. The second argument is the
// callback where the actionWhenFound function is called as the 'found' argument. So, if the findWaldo loop finds "Waldo", then
// that will trigger the actionWhenFound function - the callback. If not, nothing happens.

// initially, just used a for loop to find where Waldo is located in the array and then, executes the callback function 
// -- actionWhenFound -- would log before, "found him" or something like that...as commented above.

// Now, it loops throught he array, also finds the index of Waldo which is put into a a var called index. Index is then used as
// argument of the callback - found(index). The actionWhenFound function now just needs to use the expression ${index} in the 
// console.log to get the index from the findWaldo function - also
//  needs index as it's own argument. At the end when the functions called including the callback,
// the array is looped and when the callback function hits, it has the index and it will be printed.

function findWaldo(arr, found) {
  for (var i = 0; i < arr.length; i++) {
    var index = arr.indexOf("Waldo"); // get the index of Waldo and keep that as a var
    if (arr[i] == "Waldo") { // if a Waldo is in the array while looping...
      found(index); // if there is, execute callback - the second argument. Now takes the index as an argument. Used on execution.
    }
  }
};

function actionWhenFound(index) { //takes index as an argument. Index being from the findWaldo function
  console.log(`Waldo is located at index ${index}`);
};

findWaldo(["Alice", "Bob", "fdsa", "fdsfsd", "Waldo"], actionWhenFound); 

// another example
function greeting(hi, bye, callback){
  console.log(`say ${hi} and then say ${bye}`);
  callback(bye);
};

function callbackFunction(someWord){
  console.log(`You say hello, and I say ${someWord}`);
};

greeting("eat", "shit", callbackFunction);

// ***************************************

var dayName = function(){ //creates an anonymous function
  var days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  return function(number){
    return days[number];
  };
}(); // calls the anonymous function that was just created

console.log(dayName(4));

// ****************************

var weekDay = function() {
  var days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  return {
    name: function(number) { 
      return days[number];
    },
    number: function(name) {
      return days.indexOf(name);
    } // takes the name as a number for the number function
  };
}();

console.log(weekDay.name(weekDay.number("monday"))); // give the number the name "monday" which will print the 
// day with that exact name. Roundabout in this example, but useful with other code in mind

// another way by declaring an object and adding properties

(function(exports) {
  var days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  exports.name = function(number) {
    return days[number];
  };
  exports.number = function(name) {
    return days.indexOf(name)
  };  
})(this.weekDay = {});

console.log(weekDay.name(weekDay.number("tuesday")));

// *********************************************

var plusOne = new Function("n", "return n + 1;");// data as code
console.log(plusOne(10));

// *********************************************

// recursive example ~~~~~~~~

function findSolution(target) {
  function find(start, history) {
    if (start == target)
      return history;
    else if (start > target)
      return null;
    else
      return find(start + 5, "(" + history + " + 5)") ||
             find(start * 3, "(" + history + " * 3)")
  }
  return find(1, "1");
}

// example being find 13
// findSolution would start off with the find(1, "1") then find(6, (1 + 5)) which works so far in the function so it
// will build on that. Next, find(11, (1 + 5) + 5) which also still works so continues to find(16, (((1 + 5) + 5) + 5)).
// That's too big now, so it'll go back to the last working iteration and try * 3... find(33, (((1 + 5) + 5) * 3)).
// Also too big now, so it returns another step and tries * 3...find(18, ((1 + 5) * 3))...again too big.
// Back to the start, but beginning with * 3 now. find(3, (1 * 3)) works, so it'll build from that initially with + 5 as
// per the return. find(8, ((1 * 3) + 5))...works so continue...find(13, (((1 * 3) + 5) + 5))...tada
// function find() calls itself each time (it recurses) until the target is reached. oooOOOoooOOOoooOOOoooOOO

console.log(findSolution(9));
console.log(findSolution(21));
console.log(findSolution(18));
console.log(findSolution(15));

// ******************************
// Math.min/max

// function min(arg1, arg2){
//   return Math.min(arg1, arg2)
// }; //will find the min of the two args, limited to 2 args...

// non global Math obj method. Can use multiple arguments. Infinity is also a global object...who knew
function min() {
  var result = Infinity;
  for(var i in arguments) {
    if(arguments[i] < result) {
      result = arguments[i];
    }
  }
  return result;
}

console.log(min(3, 10, 4, 7));

// **************************

var arrayValues = [
  ["One", "Uno", "Un"],
  ["Two", "Dos", "Deux"],
  ["Three", "Tres", "Trois"]
];

// goes through the array using reduce, using the memo argument to take index [0] and attach it to the next index[1].
// the memo is returned where it's gone through again.
var arrayMap = arrayValues.reduce(function(memo, curr) {
  memo[curr[0]] = curr[1];
  memo[curr[1]] = curr[2];
  return memo;
}, {});

console.log(arrayMap);

// **************************

var fahrenheit = [0, 20, 30, 45, 50, 66, 80, 90];

// var celsius = fahrenheit.map(function(elem) {
//  return Math.round((elem -32) * 5 / 9);
// });

var celsius = fahrenheit.map(elem => Math.round((elem - 32) * 5 / 9));
// es6 ^^^^^

console.log(celsius);
