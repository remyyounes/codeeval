function precision(date) {
  var date = date.split(" ");
  var time = date[1].split(":");
  var date = date[0].split("/");

  if(time[2] == 59){
    console.log( date[0] 
    + "/" + date[1]
    + "/" + date[2]
    + " " + time[0]
    + ":" + time[1]
    + ":" + 60);
    return;
  }else if(time[2] == 60){
    time[2]--;
  }

  var d = new Date(Date.UTC(
      date[2],
      (date[0]-1),
      date[1],
      time[0],
      time[1],
      time[2],
      0
    ));

  
  var precise = new Date(d.getTime() + 1000); 
  console.log(
    ("0" + (precise.getUTCMonth()+1)).slice(-2) + '/' +
    ("0" + (precise.getUTCDate())).slice(-2) + '/' +
    precise.getUTCFullYear() + ' ' + 
    ("0" + precise.getUTCHours()).slice(-2) + ':' +
    ("0" + precise.getUTCMinutes()).slice(-2) + ':' +
    ("0" + precise.getUTCSeconds()).slice(-2));
}


 precision("06/30/1982 23:59:60");
