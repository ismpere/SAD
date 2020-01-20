// Point constructor.
function Point(x,y) {
  this.x = x;
  this.y = y;
}

// Function that computes the distance
// between two Point objects.
function distance(a,b) {
  var dx,dy;
    dx=b.x-a.x;
    dy=b.y-a.y;
    return Math.sqrt( dx*dx + dy*dy );
}

// Segment constructor.
function Segment(p1,p2) {
  this.p1 = p1;
  this.p2 = p2;
  this.length = function() {
    return distance(this.p1, this.p2);
  }
}

var point1 = new Point(10,0);
var point2 = new Point(5,5);
var se = new Segment(point1,point2);

// “console” is specific for Node.js
console.log("Length of segment 'se' is: " + se.length() );
