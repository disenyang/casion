
Date.prototype.Format = function (fmt) {

  var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "h+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
  };

  if (/(y+)/.test(fmt)) 
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));

  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) 
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));

  return fmt;
};


export let DateFormate = (value, formate = "yyyy-MM-dd")=>{

  if(!value) return value;

  let temp = new Date(value);

  if(temp.toString() === "Invalid Date") return value;

  return temp.Format(formate);
};


export let DateTimeFormate = (value, formate = "yyyy-MM-dd hh:mm:ss") => {
  return DateFormate(value, formate);
};


export let TimeFormate = (value, formate = "hh:mm:ss") => {
  return DateFormate(value, formate);
};

