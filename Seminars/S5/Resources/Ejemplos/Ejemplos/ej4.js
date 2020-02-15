// pseudocode

// this a typical code block to process asynchronous tasks with promises (with error handling)

asyncCall()
.then(function(data1){
    // do something...
    return anotherAsyncCall();
})
.then(function(data2){
    // do something...  
    return oneMoreAsyncCall();    
})
.then(function(data3){
   // the third and final async response
})
.fail(function(err) {
   // handle any error resulting from any of the above calls    
})
.done();