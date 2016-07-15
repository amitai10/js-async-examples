var promise = new Promise(function(resolve, reject) {
  setTimeout(function(){
  resolve();
  }, 2000);
});

promise.then(function(result){
    console.log("success");
}, function(result) {
    console.log("failed");
});

console.log("after promise declaration");
