// Use the functions eatBreakfast, eatLunch, eatDinner, and eatDessert to eat your meals in the traditional order.



// Do NOT modify below this line until instructed to do so.
exports.eatBreakfast = function(callback) {
  console.log("The eatBreakfast function started executing.")
  setTimeout(function() {
    console.log("You just ate breakfast.")
    if (callback) callback()
  }, 800)
}

exports.eatLunch = function(callback) {
  console.log("The eatLunch function started executing.")
  setTimeout(function() {
    console.log("You just ate lunch.")
    if (callback) callback()
  }, 300)
}

exports.eatDinner = function(callback) {
  console.log("The eatDinner function started executing.")
  setTimeout(function() {
    console.log("You just ate dinner.")
    if (callback) callback()
  }, 600)
}

exports.eatDessert = function(callback) {
  console.log("The eatDessert function started executing.")
  setTimeout(function() {
    console.log("You just ate dessert.")
    if (callback) callback()
  }, 40)
}

