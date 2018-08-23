// https://www.codingame.com/training/easy/horse-racing-duals

var array = [];

var N = parseInt(readline());
for (var i = 0; i < N; i++) {
    var pi = parseInt(readline());
    array.push(pi);
}
// By default the sort method sorts elements alphabetically.
// So we provide a function which handles numeric sorts.
array.sort(function (a,b) {
    return a - b;
});
printErr(array);
var p1,p2, minDiff, tmpDiff;
for (var i = 0; i < N-1; i++) {
    p1=array[i];
    p2=array[i+1];
    tmpDiff = (p2-p1);
    if ((minDiff === undefined) || (minDiff > tmpDiff)) {
        minDiff = tmpDiff;
    }
}

// Print the result.
print(minDiff);


/* BEST RATED SOLUTION IN CODING GAME. 

//  read in an array of all of the horses and sort them ascending
var horses = new Array(parseInt(readline())).fill(1).map((x)=>+readline()).sort((a,b)=>a-b);

//  compare each horse to the next one and store the differences in a new array
//  we need to slice off the first value since it is always null 
var differences = horses.map((current,index,array)=> Math.abs(current-array[index-1])).slice(1);

//  sort the differences ascending and print the lowest
print(differences.sort((a,b)=>a-b)[0]);

*/
