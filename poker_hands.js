var Card = function(card){
	this.value = this.getCardValue(card.charAt(0));
	this.suit = card.charAt(1);
}
Card.prototype = {
	specialCards: ['T','J','Q','K','A'],
	getCardValue: function(c){
		if('0' <= c && c <= '9')
			return parseInt(c);
		return 10 + this.specialCards.indexOf(c);
	}
}
var PokerHand = function(cards){
	this.cards = cards.sort(function(a,b){return b.value - a.value});
	this.computeCombos();
}

PokerHand.prototype = {
	isRoyalFlush: function(){
		return this.isRoyal() && this.isFlush();
	},
	isStraightFlush: function(){
		return this.isStraight() && this.isFlush();
	},
	isStraight: function(){
		var prevValue = this.cards[0].value;
		if(prevValue == 14)	prevValue = 6; //special case
		for (var i = 1; i < this.cards.length; i++)
			if(this.cards[i].value == prevValue - 1)
				prevValue = this.cards[i].value;
			else
				return false;
		return true;
	},
	isFlush: function(){
		var suit = this.cards[0].suit;
		for (var i = 1; i < this.cards.length; i++)
			if(this.cards[i].suit != suit )
				return false;
		return true;
	},
	isRoyal: function(){
		var royal = 10;
		for (var i = 0; i < this.cards.length; i++)
			if(this.cards[i].value != royal++)
				return false;
		return true;
	},
	isFour: function(){
		for (var i = 0; i < this.combos.length; i++)
			if(this.combos[i] && this.combos[i].num == 4)
				return true;
		return false;
	},
	isFullHouse: function(){
		return this.isThree() && this.isOnePair();
	},
	isThree: function(){
		for (var i = 0; i < this.combos.length; i++)
			if(this.combos[i] && this.combos[i].num == 3)
				return true;
		return false;
	},
	isTwoPairs: function(){
		var pairs = 0;
		for (var i = 0; i < this.combos.length; i++)
			if(this.combos[i] && this.combos[i].num == 2)
				pairs++;
		return pairs == 2;
	},
	isOnePair: function(){
		for (var i = 0; i < this.combos.length; i++)
			if(this.combos[i] && this.combos[i].num == 2)
				return true;
		return false;
	},
	computeCombos: function() {
		var count = [];
		for (var i = 0; i < this.cards.length; i++){
			var val = this.cards[i].value;
			if(count[val] === undefined)
				count[val] = {value: val, num: 1};
			else
				count[val].num++; 
		}
		var filtered = [];
		for (var i = 0; i < count.length; i++)  
			if(count[i]) filtered.push(count[i]);

		filtered = filtered.sort(function (a,b){ 
			if( a.num != b.num)
				return b.num-a.num; 
			else
				return b.value - a.value;
		});
		this.combos = filtered;
	},
	compare: function(other){
		var score = 0;
		if(score == 0) score = this.isRoyalFlush() - other.isRoyalFlush();
		if(score == 0) score = this.isStraightFlush() - other.isStraightFlush();
		if(score == 0) score = this.isFour() - other.isFour();
		if(score == 0) score = this.isFullHouse() - other.isFullHouse();
		if(score == 0) score = this.isFlush() - other.isFlush();
		if(score == 0) score = this.isStraight() - other.isStraight();
		if(score == 0) score = this.isThree() - other.isThree();
		if(score == 0) score = this.isTwoPairs() - other.isTwoPairs();
		if(score == 0) score = this.isOnePair() - other.isOnePair();

		var lC = this.combos;
		var rC = other.combos;
		if(score == 0 && this.isStraight()) score = this.cards[4].value - other.cards[4].value; //special case
		while(score == 0 && lC.length > 0 && rC.length > 0)
			score = lC.shift().value - rC.shift().value;
		
		return score;
	}
}

var fs = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach( function (line){
	if(line != ""){
		var cards = line.split(' ');
		var left = cards.splice(0,5).map( function(c){ return new Card(c) });
		var right = cards.map( function(c){ return new Card(c) });
		var score  = new PokerHand(left).compare(new PokerHand(right));
		var winner = score > 0 ? 'left' : (score < 0 ? 'right' : 'none');
		console.log(winner);
	}
});