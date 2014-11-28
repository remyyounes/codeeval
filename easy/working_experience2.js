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
        });

      periods = periods.sort(function(a,b){
        return a.start - b.start;
      });

      // for(var i = 0; i < periods.length; i++) {
      //   current = periods[i];
      //   // console.log("duration", current.monthDuration());
      //   total += current.monthDuration();
      // }

    console.log(periods);
      var streak = periods[0];
      for(var i=1; i<periods.length; i++){
        var p = periods[i];
        if(p.start <= streak.end && p.end >= streak.end){
          streak.end = p.end;
        }else{
          total += streak.monthDuration();
          streak = p;
        }
      }
      total += streak.monthDuration();

      // for(var i=0; i < periods.length; i++) {
      //   var a = periods[i];
      //   for(var j=i+1; j < periods.length; j++){
      //     var b = periods[j];
      //     if( b.start >= a.start && b.start < a.end) {
      //       var overlapEnd = a.end > b.end ? b.end : a.end;
      //       var overlap = new Period(b.start, overlapEnd);
      //       total -= overlap.monthDuration();
      //     }else if(a.start >= b.start && a.start <= b.end) {
      //       console.log("!!!");
      //     }
      //
      //   }
      // }
      //   if( i > 0 && prev.end > current.start ) {
      //     var overlapEnd = prev.end > current.end ? current.end : prev.end;
      //     var overlap = new Period(current.start, overlapEnd);
      //     // console.log("overlap", overlap.monthDuration());
      //     total -= overlap.monthDuration();
      //     prev = new Period(
      //       current.start > prev.start ? prev.start : current.start,
      //       current.end < prev.end ? prev.end : current.end
      //     );
      //   }else{
      //     prev = current;
      //   }
      // }

      console.log( Math.floor(total / 12) );
    }
});
