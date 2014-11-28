var Period = function (start, end){
  this.start = start;
  this.end = end;
}

Period.prototype = {
  monthDuration: function(){
    var yearDiff = this.end.getYear() - this.start.getYear(),
      monthDiff = this.end.getMonth() - this.start.getMonth();
    return yearDiff * 12  + (monthDiff + 1);
  }
};

var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line != "") {
      var dates = line.split("; "),
        total = 0, prev = null, current = null,
        overlap = null, overlapEnd = null,
        periods = dates.map( function (period) {
          period = period.split("-");
          period = new Period (new Date(period[0]), new Date(period[1]));
          return period;
        }).sort(function(a,b){
          return a.start - b.start;
        });

      for(var i = 0; i < periods.length; i++) {
        current = periods[i];
        total += current.monthDuration();
        if( i > 0 && prev.end > current.start ) {
          var overlapEnd = prev.end > current.end ? current.end : prev.end;
          var overlap = new Period(current.start, overlapEnd);
          total -= overlap.monthDuration();
          prev = new Period(
            current.start > prev.start ? prev.start : current.start,
            current.end < prev.end ? prev.end : current.end
          );
        }else{
          prev = current;
        }
      }

      console.log( Math.floor(total / 12) );
    }
});
