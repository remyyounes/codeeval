//Advanced Calculator parser
Math.factorial = function(n){
	if(n==1){
		return 1;
	}else{
		return n * Math.factorial(n-1);
	}
}

var Parser = function() {
	this.operations = [];
	this.funcs = ['cos','sin','tan','sqrt','lg','ln','e','Pi','fac','abs'];
	this.precedence =  {
		oparen: '1',
		cparen: '1',
		absparen: '1',
		cos: '2',
		sin: '2',
		tan: '2',
		lg: '2',
		ln: '2',
		abs: '2',
		sqrt: '2',
		fac: '2',
		neg: '2',
		exp: '3',
		mod: '4',
		mul: '5',
		div: '5',
		add: '6',
		sub: '6',
	};
}

Parser.prototype = {
	parseString: function(expr){
		this.expr = expr.replace("mod",'%').split('');
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
    		}else if('a' <= t && t <= 'z' || 'A' <= t && t <= 'Z'){
    			if(lastToken && lastToken['type'] == 'undertermined'){
	    			var o = this.tokenArray[this.tokenArray.length-1]['value'] + t;
	    			//special case PI
	    			if(o == "Pi"){ 
	    				this.tokenArray[this.tokenArray.length-1]['type'] = 'number';	
	    				this.tokenArray[this.tokenArray.length-1]['value'] = Math.PI;	
	    			}else{
		    			if(this.isCalcFunc(o)){
	    					this.tokenArray[this.tokenArray.length-1]['type'] = o;	
	    				}
	    				this.tokenArray[this.tokenArray.length-1]['value'] = o;
	    			} 
    			}else{
    				var newToken = [];
    				newToken['value'] = t;
    				newToken['type'] = 'undertermined';
    				newToken['offset'] = i;
    				//special case Euler
    				if(t == 'e'){
    					newToken['value'] = Math.E;
    					newToken['type'] = 'number';
    				}
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
	    			case '%':
	    				var newToken = [];
	    				newToken['value'] = t;
	    				newToken['type'] = 'mod';
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
	    			case '|':
	    				var newToken = [];
	    				newToken['value'] = t;
	    				newToken['type'] = 'absparen';
	    				newToken['offset'] = i;
	    				this.tokenArray.push(newToken);
	    				expGrp--;
	    				break;
	    			case '!':
	    				var newToken = [];
	    				newToken['value'] = '!';
	    				newToken['type'] = 'fac';
	    				newToken['offset'] = i;
	    				this.tokenArray.push(newToken);
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
		var operators = [];
		var output = [];
		var openAbs = false;
		var absGrp = 0;
		var closableAbsGrp = false;
		for (var i = 0; i < this.tokenArray.length; i++) {
			var token = this.tokenArray[i];
			if(token['type'] == 'number'){
				output.push(token);
				if(openAbs) closableAbsGrp = true;
			}else if(token['type'] == 'oparen'){
				operators.push(token);
			}else if(token['type'] =='absparen' && !openAbs && !closableAbsGrp ){
				operators.push(token);
				absGrp++;
				openAbs=true;
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
			}else if(token['type'] == 'absparen' && openAbs && closableAbsGrp){
				do{
					var lastOp = operators.pop();
					if(lastOp['type'] == 'absparen'){
						openAbs = false;
					}else{
						output.push(lastOp);
					}
				}while(openAbs);

				//handle groupings
				absGrp--;
				if(absGrp >= 0)
					openAbs = true;
				else
					closableAbsGrp = false;
				var abs = [];
				abs['value'] - 'abs';
				abs['type'] = 'abs';
				output.push(abs);
			}else{
				do{
					// + / * - ^ % 
					var lastOp = operators[operators.length-1];
					if(	lastOp 
					&&	this.getOpPrec(token['type']) >= this.getOpPrec(lastOp['type']) 
					&&	lastOp['type'] != 'oparen'
					&&	lastOp['type'] != 'absparen'
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
		while(this.operations.length > 1){
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
			if(this.isCalcFunc( op['type'] ) || op['type'] == 'neg'){
				numOperands = 1;
			}
			var spliceIndex = opIdx - numOperands;
			var operands = this.operations.splice(spliceIndex, numOperands);
			this.operations.splice(spliceIndex , 1, this.executeOp(operands, op));
		}

		return this.operations[0]['value'];
	},executeOp: function(operands, operator){
		var lhv = parseFloat(operands[0]['value']);
		if(operator['type'] == 'neg' || this.isCalcFunc(operator['type']) ){
			switch(operator['type']){
				case 'neg':
					lhv *= -1;
					break;
				case 'cos':
					lhv = Math.cos(lhv * (Math.PI / 180) );
					break;
				case 'sin':
					lhv = Math.sin(lhv * (Math.PI / 180) );
					break;
				case 'tan':
					lhv = Math.tan(lhv * (Math.PI / 180) );
					break;
				case 'sqrt':
					lhv = Math.sqrt(lhv);
					break;
				case 'lg':
					lhv = Math.log(lhv) / Math.LN10;
					break;
				case 'ln':
					lhv = Math.log(lhv);
					break;
				case 'fac':
					lhv = Math.factorial(lhv);
					break;
				case 'abs':
					lhv = Math.abs(lhv);
					break;
			}
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
				case 'mod':
					lhv %= rhv;
					break;
				case 'exp':
					lhv = Math.pow(lhv, rhv);
					break;
			}
		}
		operands[0]['value'] = lhv;
		return operands[0];
	},isCalcFunc: function(type){
		for (var i = 0; i < this.funcs.length; i++) {
			if(this.funcs[i] == type) return true;
		};
		return false;
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

