var Node = function(n){
	this.value = n;
	this.left;
	this.right;
	this.add = function(x){
		if(x < this.value){
			if(this.left == undefined){
				this.left = new Node(x);
			}else{
				this.left.add(x);
			}
		}else if(x > this.value){
			if(this.right == undefined){
				this.right = new Node(x);
			}else{
				this.right.add(x);
			}
		}
	}
}

var tree = new Node(30);
tree.add(8);
tree.add(52);
tree.add(3);
tree.add(20);
tree.add(10);
tree.add(29);

var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
	if (line != "") {
		var cur = tree;
		var ans = 0;
		var l = line.split(" ");
		var a = parseInt(l[0]);
		var b = parseInt(l[1]);
		while(1){
			if(a < cur.value && b < cur.value ){
				cur = cur.left;
			}else if(a > cur.value && b > cur.value){
				cur = cur.right;
			}else{
				ans = cur.value;
				break;
			}
		}
		console.log(ans);
	}
});