function codeEvalExecute() 
{ 
	var ans = '';
	var buffer = new ArrayBuffer(2);
	var i16 = new Uint16Array(buffer);
	var i8 = new Uint8Array(buffer);
	i16[0]= 0xffaa;
	if(i8[0] == 0xaa){
		ans = "LittleEndian";
	}else if(i8[0] == 0xff){
		ans = "BigEndian";
	}
	return ans;
}
