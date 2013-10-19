var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line != "") {
        var l = line.split(";");
        var m = parseInt(l[0]);
        var n = parseInt(l[1]);
        matrix_list = l[2].split(" ");
        l = [];
        for (var i = 0; i < m; i++) {
            l[i] = [];

            for (var j = 0; j < n; j++) {
                l[i][j] = matrix_list.shift();
            };
        };
        var cn = n;
        var cm = m;
        var x0 = 0;
        var y0 = 0;
        var i = 0;
        var j = 0;
        var ans = []

        while( cm > 0 && cn > 0){
            j = x0;
            i = y0;    
            
            for(i = x0; i < x0 + cn; i++){
                ans.push( l[j][i] );
            }
            i--;

            for( j = y0 + 1; j < y0 + cm; j++){
                ans.push( l[j][i] );
            }
            j--;

            for( i = i - 1; i >= x0 && cm>1; i--){
              ans.push( l[j][i] );
            }
            i++;

            for( j = j - 1; j > y0 && cn>1; j--){
                ans.push( l[j][i] );
            }

            x0++;
            y0++;
            cn-=2;
            cm-=2;
        }

        console.log(ans.join(" "));
        return 0;
    }
});












