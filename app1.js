var doTheWork = function () {

}

var promise = new Promise(function(resolve, reject) {
  setTimeout(function(){
    //throw "error"
  resolve();
  }, 2000);
});

  promise.then(function(result){
    console.log("success");
    return "got success";
}, function(result) {
    console.log("failed");
}).then(function(val){
  console.log(val);
}).catch(function() {
  console.log("error");
});

console.log("after promise declaration");
