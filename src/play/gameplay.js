

localStorage.setItem('setarray', JSON.stringify(gamearray));
var getarray = JSON.parse(localStorage.getItem('setarray'));
console.log(getarray);
localStorage.setItem('userarray', JSON.stringify(userarray));
var getuserarray = JSON.parse(localStorage.getItem('userarray'));
console.log(getuserarray);


Items needed for local storage:
- final answer?
- user responses
- provided numbers

[[6,9,8,2,5,7,1,3,4]
[5,4,2,3,6,1,9,8,7]
[7,1,3,9,4,8,6,5,2]
[9,5,4,7,8,2,3,1,6]
[2,8,6,4,1,3,7,9,5]
[3,7,1,5,9,6,2,4,8]
[8,2,9,6,3,4,5,7,1]
[1,3,7,8,2,5,4,6,9]
[4,6,5,1,7,9,8,2,3]]

[[0,0,0,2,0,7,1,3,0]
[5,4,0,0,6,0,0,8,0]
[0,1,0,9,0,0,0,5,2]
[9,5,0,0,8,2,0,0,6]
[0,0,6,0,0,0,7,0,0]
[3,0,0,5,9,0,0,4,8]
[8,2,0,0,0,4,0,7,0]
[0,3,0,0,2,0,0,6,9]
[0,6,5,1,0,9,0,0,0]]



