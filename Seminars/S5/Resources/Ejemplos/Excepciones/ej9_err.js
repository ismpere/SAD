function c() {
	b();
}

function b() {
	a();
}

function a() {
		throw new Error('se ha producido error');
}

c();
