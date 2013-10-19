// lastBranchIndex
// minDistance
// activeLength
// suffixLink
// lastBranchIndex(i,i) >= i + activeLength + minDistance. 

var UkkonenSuffixTree = function(str){
  this.S = str+"#";
  this.root = new Node();
  this.activeNode = this.root;
  // this.activeLength = 0;
  // this.minDistance = 0;
  // this.lastInsertedSplitNode;
  for (var i = 0; i < this.S.length; i++) {
    this.addSuffix(this.S.substring(i));
  }
}
UkkonenSuffixTree.prototype = {
  getSuffixes: function (){
    return this.root.print(this.S);
  },
  addSuffix: function(s){
    //walk through suffix links
    this.activeNode = this.root.followSuffixLinks();

    var j = 0;
    var offset = this.S.length - s.length;
    //find matching node
    var ch = s[j];
    var cn = this.activeNode.nodes[ ch ];
    
    //create branch if doesnt exist
    if(!cn){
      var info = new Node(offset, undefined, this.activeNode,[]);
      this.activeNode.nodes[this.S[info.startIndex]] = info;
      return;
    }

    //cn is the node that starts with s[j];
    var i = cn.startIndex;
    while ( i < this.S.length) {
      var end = cn.endIndex!==undefined ? cn.endIndex : this.S.length;
      if(i <= end){
        if(this.S[i] == s[j]){
          i++;
          j++;
        }else{
          break;
        }
      }else{
        //go down the branch and update active node
        var cnn = cn.nodes[s[j]];
        if(cnn == undefined){
          var newChar = new Node(offset+j, undefined, cn, []);
          cn.nodes[s[j]] = newChar;
          return;
        }else{
          cn = cnn;
          i = cn.startIndex;
        }
      }
    }

    //inside split
    if(cn.numChildren() > 0){
      var p = cn.up;
      var newSplitNode = new Node(cn.startIndex, i-1, p, []);
      var a = new Node(offset+j, undefined, newSplitNode, []);
      cn.startIndex = i;
      cn.up = newSplitNode;
      newSplitNode.nodes[this.S[a.startIndex]] = a;
      newSplitNode.nodes[this.S[cn.startIndex]] = cn;
      p.nodes[this.S[newSplitNode.startIndex]] = newSplitNode;
      // this.lastInsertedSplitNode = newSplitNode;
    }else{
      //modify node
      cn.endIndex = Math.max(0,i-1);
      //add children
      var a = new Node(i, undefined, cn, []);
      var b = new Node(offset+j, undefined, cn, []);
      cn.nodes[this.S[a.startIndex]] = a;
      cn.nodes[this.S[b.startIndex]] = b;
    }
  }
}

Node = function(s,e,u,n){
  this.startIndex = s;
  this.endIndex = e;
  this.suffixLink;
  this.nodes = n?n:[];
  this.up = u;
};

Node.prototype = {
  followSuffixLinks: function(){
    if(this.suffixLink == undefined)
      return this;
    else
      return this.suffixLink.followSuffixLinks();
  },
  numChildren: function(){
    var count=0
    for (var key in this.nodes)
      count++
    return count;
  },
  getText: function(s){
    if(this.startIndex==undefined)return '';
    var end = this.endIndex!==undefined ? this.endIndex+1 : s.length;
    var text = s.substring(this.startIndex,end);
    return text;
  },
  print: function(s){
    var out = [];
    var text = this.getText(s);
    if(this.numChildren() == 0){
      out.push(text);
    }else{
      for(var n in this.nodes){
        var childOut = this.nodes[n].print(s); 
        for ( var i in childOut){
          out.push(text + childOut[i]);
        }
      }
    }
    return out;
  },
  getLongestChild: function(s){
    var longest = '';
    if(this.numChildren() > 0){
      var t = this.getText(s);
      var longest = t;
      for(var n in this.nodes){
        var c = t + this.nodes[n].getLongestChild(s);
        if(c.length > longest.length){
          longest = c;
        }
      }
    }
    return longest;
  }
}

var test = new UkkonenSuffixTree("remysansremyfamille");
var ans = test.getSuffixes();
var longestRepeatedSubString = test.root.getLongestChild(test.S);
console.log(longestRepeatedSubString);