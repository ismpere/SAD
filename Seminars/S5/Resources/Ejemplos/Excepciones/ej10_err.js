function c() {
	b();
}

function b() {
	a();
}

function a() {
	setTimeout(function() {
		throw new Error('se ha producido error');
    },10);
}

c();
