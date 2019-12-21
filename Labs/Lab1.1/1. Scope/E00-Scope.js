function alert(x) { // Needed in Node.js in order
    console.log(x); // to print messages to stdout.
}
var global = 'this is global';
var alsoGlobal, stillGlobal;
function scopeFunction() {
    alert('\n******* Start scopeFunction *******')
    alsoGlobal = 'This is also global!';
    var notGlobal = 'This is private to scopeFunction!';
    function subFunction() {
        alert('\n**** Start subFunction ****\n')
        alert(notGlobal); 
        stillGlobal = 'No var keyword so this is global!';
        var isPrivate = 'This is private to subFunction!';    
        alert(isPrivate);
        alert('\n**** End subFunction ****\n')
    }
    alert(stillGlobal); 
    subFunction();  
    alert(stillGlobal);  
    alert(global);
    alert(notGlobal);  
    alert('******* Finish scopeFunction *******\n')
}
alert(global);      
alert(alsoGlobal);  
scopeFunction();
alert(alsoGlobal);     
