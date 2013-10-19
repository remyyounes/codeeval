var triangle = [];
var lines = 0;
function codeEvalExecute(line) 
{
	triangle[lines++] = line.split(" ");

	if(lines==100){
		for( var i = lines - 1; i > 0; i--){
			var cLine = triangle[i];
			var pLine = triangle[i-1];
			for( var j = 0; j < pLine.length; j++){
				triangle[i-1][j] = parseInt(pLine[j]) + Math.max(cLine[j], cLine[j+1]);
			}
		}
		console.log(triangle[0][0]);
		return triangle[0][0];
	}
}
