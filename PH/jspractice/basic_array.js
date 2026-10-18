const friends = ["fuad", "ferdous", "jaman", "mosarrof"];
console.log(friends);

//includes()
if (friends.includes("fuaad"))
    console.log("party");
else console.log("no party");
//indexof()
console.log(friends.indexOf("sami"));
console.log(friends.indexOf("mosarrof"));
let age = 15;
let name = 'this is not an array';
//isArray()
console.log(Array.isArray(friends));
console.log(Array.isArray(name));
console.log(Array.isArray(age));
//join
const result = friends.join(' || ');
console.log(result);