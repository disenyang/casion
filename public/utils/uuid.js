export default{
	uuid:function(){
		var guid = "a";
		for (var i = 1; i <= 31; i++) {
			var n = Math.floor(Math.random() * 16).toString(16);
			guid += n;
			if ((i == 8) || (i == 12) || (i == 16) || (i == 20)) {
				guid += "";
			}
		}
		guid += "";
		return guid;
	}
}