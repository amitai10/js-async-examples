<!-- $theme: gaia -->

# Asynchronous development in JavaScript

---

### Why?
 - Performance
 - responsiveness
### When?
- Long running operations
- Calculation
- Network
- File access

---
### JavaScript vs Other Languages
 - C++, Java, C#
 -- Multiple threads
 - JavaScript
 --	Single threaded
 -- Uses event driven programming model
 ---
 ### The Event Loop
 - The web browser trigger events, such as mouse events, keyboard events DOM events, etc.
 - The event is queued into the event loop.
 - Each time, the JavaScript thread takes the next event and execute it.
 - When it finish to handle the event, it takes the next one.

---

### JavaScript does one thing at a time?

- The browser expose a set of asynchronous functionalities.
- The commons are network operation such as HTTP requests, local storage operations etc.
- The web browser uses a C++ libraries (Usually) that uses threads and run the “long running” operation on them.
- When the operation is over it will trigger an event (success or failure).
- The browser (through the event loop) will execute the attached functionality.

---
### Callback
- Asynchronous objects allow to attach a callback to the execution of the function.
- The callback is a function that will be called as the operation ended.
---
Implementation of a callback looks like this:
```javascript
function AsyncCall(callback) {
	// create the async object
	var worker = new worker();

	// register on the 'finish' event
	worker.onfinish = function() {
    		// run the callback
		callback(worker.response);
	}
	// run the workload
	worker.doWork();
};

asyncCall(function(){
	alert(“finish!);
});
```
---
## Callback hell
Using callbacks can caused a different type of problem:
- Assuming we need to do a series of operations. Each operation depends on the success of its previous.
- The code can become messy.
- Reviewing, debugging and fixing the code had become a very hard thing to do.
---
Our code will look like a spaghetti:
```javascript
asyncCall(function(response) {
  If (response.status == 200) {
    calculateResult(function(result) {
      If(result.status == OK) {
        loadFile(function(res) {
            If(res == success) {
                doSomthing();
            } else { alert(“file error”) }
          }
        }
        else {
          alert(calculation error”)
        }
      } else {
        alert(“API error”)
      }
  }
}
```
---

# Promises

---

## Promises
- [Promise](https://developer.mozilla.org/he/docs/Web/JavaScript/Reference/Global_Objects/Promise) is a javascript object that is used for deferred and asynchronous computations. A Promise represents an operation that hasn't completed yet, but is expected in the future.

- Promises is a pattern that exists in the web development for a long time. You can find it in [Q](https://github.com/kriskowal/q) or in [JQuery deffered](https://api.jquery.com/category/deferred-object), and more.

- In ECMA6 (ES2016), it has become a officially a part of javascript. The standard for JavaScript Promises is called [Promises/A+](https://promisesaplus.com).

---

### Creation of a promise:
```javascript
var promise = new Promise(function(resolve, reject) {
    doTheWork();
  if (response == success) {
    resolve(response);
  } else {
    reject(response)
  }
```
---
### Usage of a promise
```javascript
promise.then(function(result){
	alert("success");
}, function(result) {
	alert("failed");
})
```

So much cleaner!

---

### Promises states
- __pending__: initial state, not fulfilled or rejected.
- __fulfilled__: meaning that the operation completed successfully.
- __rejected__: meaning that the operation failed.

__It can only succeed ones or rejected once.__

---

## Cascading and multiplicity

Another great feature of Promise is cascading. Promise enables to connect  promises one after the other.

```javascript
promise.then(function(result){
	// success
}, function(result) {
	//failure
}).then(..).then(...).
```

---
### Error handling


```javascript
promise.then(..).then(..).then(...).catch(...)
```
### multiple promises

```javascript
Promise.all([promise1, promise2, promise3] )
.then(function(results){
})
```

---
# Async/Await

---
### Async/Await
ES7 Async new feature


---

# Web Workers

---


### Web workers

- Allows running a code in the background.
- The code actually runs on a separate thread allowing true concurrency.
- Useful for running long scripts without blocking the application.
- Web workers restrictions:
-- Not being allowed to access the DOM.
-- Communicate with one another by messaging.

---
### Web workers on practice
Creating a worker:

```JavaScript
var worker = new Worker("worker.js");
```
Activate it by sending it messages:

```JavaScript
worker.postMessage(“DoSomething!”);
```
The worker code:
```JavaScript
onmessage = function (e) {
	var response = doMyWork(e.data);
	// response back to caller
	postMessage(response);}
```

---
### Registration to the worker:

```JavaScript
worker.onmessage(function (e) {
	var message = e.data
	alert(“worker says: “ + message);
}
```


Like promises, the worker enables to get an error:

```JavaScript
worker.onerror = function(e) {
var error= e.data
	alert(“worker had an error: “ + error);
}
```
---

### Worker termination


There are two ways to terminate a worker, from inside:
```JavaScript
close();

```
Or from the creator of the worker:

```JavaScript
worker.close();
```
