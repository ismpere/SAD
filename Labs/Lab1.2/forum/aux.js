function doHomework(u,p,callback) {
    console.log('Starting my subject homework');
    let res = u+p;

    console.log('algo');
    let rr = 5*39;
    console.log(rr);
    console.log('Esperando.......');
    setTimeout( function() {
        callback(res);
    }, 3000)
}

doHomework(2,3,function(res) {
    console.log(res);
    console.log('Finished my homework');
})