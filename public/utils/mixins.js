
export default {
    computed:{
        userinfo:function(){
            return this.$store.state.userinfo;
        },
        defaultHeadimg:function(){
            return this.$store.state.defaultHeadimg;
        }
    },
    methods:{
       domOn(element, event, handler){
         if (document.addEventListener) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false);
            }
         }else{
            if (element && event && handler) {
                element.attachEvent('on' + event, handler);
            }
         }
       },
       domOff(element, event, handler){
         if (document.addEventListener) {
            if (element && event && handler) {
                element.removeEventListener(event, handler, false);
            }
         }else{
            if (element && event && handler) {
                element.detachEvent('on' + event, handler);
            }
         }
       },
       /**
         * 获取某个父级组件
         */
        getParent(componentName) {
            var parent = this.$parent || this.$root;
            var name = parent.$options._componentTag;

            while (parent && (!name || name !== componentName)) {
                parent = parent.$parent;
                
                if (parent) {
                    name = parent.$options._componentTag;
                }
            }
            if (parent) {
                return parent;
            }
            return null;
        },
        dateAddDay(date, days) {
            if (days == undefined || days == '') {
                days = 1;
            }
            var date = new Date(date);
            date.setDate(date.getDate() + days);
            return date;
        },
        //字符串转日期
        stringToDate(fDate){  
            var fullDate = fDate.split("-");  
            if(fullDate.length==3){
                 return new Date(fullDate[0], fullDate[1]-1, fullDate[2], 0, 0, 0);  
            }else if(fullDate.length==4){
                 return new Date(fullDate[0], fullDate[1]-1, fullDate[2], fullDate[3], 0, 0);  
            }else if(fullDate.length==5){ 
                 return new Date(fullDate[0], fullDate[1]-1, fullDate[2],fullDate[3], fullDate[4], 0);  
            }else if(fullDate.length==6){
                 return new Date(fullDate[0], fullDate[1]-1, fullDate[2],fullDate[3], fullDate[4], fullDate[5]);  
            }
            return null;
        },
        //刷新用户信息
        reloadUserinfo(){
            this.$http.post("/casionj/user/get", {id:userinfo.id}).then((response) => {
              window.userinfo = response.data.result;
              this.$store.commit("setUserinfo",userinfo);
              window.localStorage.setItem("userinfo",JSON.stringify(userinfo));
            });
        },
        //设置set get 方法
        set(obj,key,val){
            if(Object.prototype.toString.call(obj)==='[object Array]'){
                for(let o of obj){
                    this.$set(o,key,val)
                }
            }else{
                this.$set(obj,key,val);
            }
        },
        weekDay(date){
            var weekday=new Array(7);
            weekday[0]="周日";
            weekday[1]="周一";
            weekday[2]="周二";
            weekday[3]="周三";
            weekday[4]="周四";
            weekday[5]="周五";
            weekday[6]="周六";
            return weekday[date.getDay()];
        },
        //日期转字符串
        formatDate(date,fmt){
            if(!date){
                date = new Date();
            }
            if(!fmt){
                fmt = "yyyy-MM-dd hh:mm:ss";
            }
            var o = {   
                "M+" : date.getMonth()+1,                 //月份   
                "d+" : date.getDate(),                    //日   
                "h+" : date.getHours(),                   //小时   
                "m+" : date.getMinutes(),                 //分   
                "s+" : date.getSeconds(),                 //秒   
                "q+" : Math.floor((date.getMonth()+3)/3), //季度   
                "S"  : date.getMilliseconds()             //毫秒   
            };   
            if(/(y+)/.test(fmt))   
            fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
            for(var k in o)   
            if(new RegExp("("+ k +")").test(fmt))   
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
            return fmt;   
        },
        /**
         * 获取某个父级组件
         */
        post(url,params) {
            let ps = {...params};
            ps.api_url = url;
            //return this.$http.post("/casion/http",ps)
        },
        //存储数据
        saveStorage(key,value){
            localStorage.setItem(key,value);
        },
        //读取数据数据
        getStorageValue(key){
            return localStorage.getItem(key);
        }
    }
};
