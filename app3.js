var p1 = new Promise((resolve, reject) => {
  setTimeout(resolve(1), 1000);
});
var p2 = new Promise((resolve, reject) => {
  setTimeout(resolve(2), 1000);
});
var p3 = new Promise((resolve, reject) => {
  setTimeout(resolve(3), 1000);
});

async function foo() {
  let x = await p1;
  console.log(x);
  x = await p2;
  console.log(x);
  x = await p3;
  console.log(x);
}

foo();
