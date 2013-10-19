//Calculator parser
var Parser = function() {
	this.operations = [];
	this.precedence =  {
		oparen: '1',
		cparen: '1',
		neg: '2',
		exp: '3',
		mul: '4',
		div: '4',
		add: '5',
		sub: '5',
	};
}

Parser.prototype = {
	parseString: function(expr){
		this.expr = expr.split('');
		return this.tokenize().lex().execute();
	},
	tokenize: function(){
		this.tokenArray = [];
    	var expGrp = 0;
    	var lastToken;
    	var lastTokenKey;
    	for (var i = 0; i < this.expr.length; i++) {

    		if(this.tokenArray)
		      {
		      	lastTokenKey = this.tokenArray.length-1;
		      	lastToken = this.tokenArray[lastTokenKey];

		      } else {
		        lastToken = [];
		        lastTokenKey = null;
		      }

    		var t = this.expr[i];
    		if('0' <= t && t <= '9' || t == '.'){
    			if(lastToken &&  lastToken['type'] == 'number'){
    				this.tokenArray[this.tokenArray.length-1]['value'] += t;
    			}else{
    				var newToken = [];
    				newToken['value'] = t;
    				newToken['type'] = 'number';
    				newToken['offset'] = i;
    				this.tokenArray.push(newToken);
    			}
    		}else{

	    		switch(t){
	    			case ' ':
	    			case '\t':
		    			if(lastToken && lastToken['type'] == 'space'){
		    				this.tokenArray[lastTokenKey]['value'] += t;
		    			}else{
		    				var newToken = [];
		    				newToken['value'] = t;
		    				newToken['type'] = 'space';
		    				newToken['offset'] = i;
		    				this.tokenArray.push(newToken);
		    			}
			            break;
	    			case '-':
	    				var filtered = this.tokenArray.filter(function(x){ return x['type']!='space'; })
	    				var fToken = filtered[filtered.length-1];

	    				if(fToken== undefined || fToken['type'] != 'number' && fToken['type'] != 'cparen'){
    						var newToken = [];
		    				newToken['value'] = t;
		    				newToken['type'] = 'neg';
		    				newToken['offset'] = i;
		    				this.tokenArray.push(newToken);
    					}else{
		    				var newToken = [];
		    				newToken['value'] = t;
		    				newToken['type'] = 'sub';
		    				newToken['offset'] = i;
		    				this.tokenArray.push(newToken);
    					}
	    				break;
	    			case '+':
	    				var newToken = [];
	    				newToken['value'] = t;
	    				newToken['type'] = 'add';
	    				newToken['offset'] = i;
	    				this.tokenArray.push(newToken);
	    				break;
	    			case '/':
	    				var newToken = [];
	    				newToken['value'] = t;
	    				newToken['type'] = 'div';
	    				newToken['offset'] = i;
	    				this.tokenArray.push(newToken);
	    				break;
	    			case '*':
	    				var newToken = [];
	    				newToken['value'] = t;
	    				newToken['type'] = 'mul';
	    				newToken['offset'] = i;
	    				this.tokenArray.push(newToken);
	    				break;
	    			case '^':
	    				var newToken = [];
	    				newToken['value'] = t;
	    				newToken['type'] = 'exp';
	    				newToken['offset'] = i;
	    				this.tokenArray.push(newToken);
	    				break;
	    			case '(':
	    				var newToken = [];
	    				newToken['value'] = t;
	    				newToken['type'] = 'oparen';
	    				newToken['offset'] = i;
	    				this.tokenArray.push(newToken);
	    				expGrp++;
	    				break;
	    			case ')':
	    				var newToken = [];
	    				newToken['value'] = t;
	    				newToken['type'] = 'cparen';
	    				newToken['offset'] = i;
	    				this.tokenArray.push(newToken);
	    				expGrp--;
	    				break;
	    			default:
	    				// console.log('ERROR' + t + "<" );
	    				break;
	    		}
    		}
    	};
    	return this;
	},
	lex: function(){
		this.cleanTokens();
		debugger;
		var operators = [];
		var output = [];

		for (var i = 0; i < this.tokenArray.length; i++) {
			var token = this.tokenArray[i];
			if(token['type'] == 'number'){
				output.push(token);
			}else if(token['type'] == 'oparen'){
				operators.push(token);
			}else if(token['type'] == 'cparen'){
				var brace = false;
				do{
					var lastOp = operators.pop();
					if(lastOp['type'] == 'oparen'){
						brace = true;
					}else{
						output.push(lastOp);
					}
				}while(!brace);
			}else{
				do{
					// + / * - ^
					var lastOp = operators[operators.length-1];
					if(	lastOp 
					&&	this.getOpPrec(token['type']) >= this.getOpPrec(lastOp['type']) 
					&&	lastOp['type'] != 'oparen'
					&&	token['type'] != 'neg'
					&&	output.length)
					{
						output.push(operators.pop());
					}else{
						lastOp = null;
					}
				}while(lastOp);
				operators.push(token);
			}
		};

		while(operators.length)
	    {
	    	lastOp = operators.pop();
	      	output.push(lastOp);
	    }
	    this.operations = output;
	    return this;
	},

	cleanTokens: function(){
		var newTokenArray = [];
		for (var i = 0; i < this.tokenArray.length; i++) {
			if(this.tokenArray[i]['type'] != 'space'){
				newTokenArray.push( this.tokenArray[i] );
			}
		};
		this.tokenArray = newTokenArray;
	},

	getOpPrec: function(type){
		return this.precedence[type];	
	},execute: function(){
		do{
			var op = null;
			var opIdx = null;
			for (var i = 0; i < this.operations.length; i++) {
				if(this.operations[i]['type'] != 'number') { 
					opIdx = i; 
					op=this.operations[i];
					break; 
				}
			};

			var numOperands = 2;
			if(op['type'] == 'neg'){
				numOperands = 1;
			}
			var spliceIndex = opIdx - numOperands;
			var operands = this.operations.splice(spliceIndex, numOperands);
			this.operations.splice(spliceIndex , 1, this.executeOp(operands, op));
		}
		while(this.operations.length > 1);

		return this.operations[0]['value'];
	},executeOp: function(operands, operator){
		var lhv = parseFloat(operands[0]['value']);
		if(operator['type'] == 'neg'){
			lhv *= -1;
		}else{
			var rhv = parseFloat(operands[1]['value']);
			switch(operator['type']){
				case 'add':
					lhv += rhv;
					break;
				case 'sub':
					lhv -= rhv;
					break;
				case 'div':
					lhv /= rhv;
					break;
				case 'mul':
					lhv *= rhv;
					break;
				case 'exp':
					lhv = Math.pow(lhv, rhv);
					break;
			}
		}
		operands[0]['value'] = lhv;
		return operands[0];
	}
}

var parser = new Parser();

var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line != "") {
    	var ans = parser.parseString(line);
    	ans = parseFloat( ans.toFixed(5) );
    	console.log(ans);
    }
});

