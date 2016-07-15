var p1 = new Promise((resolve, reject) => {
  setTimeout(resolve(1), 1000);
});
var p2 = new Promise((resolve, reject) => {
  setTimeout(resolve(2), 1000);
});
var p3 = new Promise((resolve, reject) => {
  setTimeout(resolve(3), 1000);
});
var p4 = new Promise((resolve, reject) => {
  setTimeout(resolve(4), 1000);
});
var p5 = new Promise((resolve, reject) => {
  setTimeout(reject("reject"), 1000);
});

Promise.all([p1, p2, p3, p4]).then(value => {
  console.log(value);
}, function(reason) {
  console.log(reason)
});
