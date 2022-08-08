var fs = require('fs');
fs.readFile('./medium.txt', function(err, data) {
    if(err) throw err;
    var array = data.toString().split("\n");
    var arr = []
    for(i in array) {
      if(array[i]) {
        arr[i] = array[i]
      }
    }
    console.log('arr',arr);
});


