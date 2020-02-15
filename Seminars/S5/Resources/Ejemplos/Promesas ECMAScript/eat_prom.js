// Use the functions eatBreakfast, eatLunch, eatDinner, and eatDessert to eat your meals in the traditional order.



// Do NOT modify below this line until instructed to do so.
exports.eatBreakfast = function() {
  return new Promise(function(resolve, reject) {
    console.log("The eatBreakfast function started executing.")
    setTimeout(function() {
        console.log("You just ate breakfast.")
        resolve("Data")
    }, 800)
  })
}

exports.eatLunch = function() {
   return new Promise(function(resolve, reject) {
    console.log("The eatLunch function started executing.")
    setTimeout(function() {
      console.log("You just ate lunch.")
      resolve()
    }, 300)
  })
}

exports.eatDinner = function() {
  return new Promise(function(resolve, reject) {
    console.log("The eatDinner function started executing.")
    setTimeout(function() {
      console.log("You just ate dinner.")
      resolve()
    }, 600)
  })
}


exports.eatDessert = function() {
  return new Promise(function(resolve, reject) {
    console.log("The eatDessert function started executing.")
    setTimeout(function() {
      console.log("You just ate dessert.")
      resolve()
    }, 40)
  })
}

