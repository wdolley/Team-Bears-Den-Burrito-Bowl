function csv() {
    const fs = require('blocks.csv');
    var delimiter = ',';
    var newline = '\n';
    var reader = new FileReader();
    reader.onload = function (e) { 
        var list = parseCSV(e.target.result);
        // Print the 2D array to the console
        for (var i = 0; i < list.length; i++) {
            var row = list[i];
            for (var j = 0; j < row.length; j++) {
                console.log(row[j]);
            }
        }
    }
    reader.readAsText(readFile("blocks.csv","utf8"));  
}

function parseCSV(text) {
    var rows = text.split(newline);
    var result = [];
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i].split(delimiter);
        result.push(row);
    }
    return result;
}