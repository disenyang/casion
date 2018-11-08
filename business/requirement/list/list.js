/**
 * Created by gaoyang on 2018/03/27.
 * @title 需求列表js
 */
import Utils from 'utils';
export default{
    mixins:[Utils.mixins],
    data(){
        return {
            params:{
                "name":"",
                "status":"",
                "date_start":"",
                "date_end":"",
            },
            dataList:[],
            users:null,
            pages:{
                total:0,
                pageSize:15,
                currentPage:1
            },
            dayList:[],
            dev_start_date_left:"0%",
            dev_end_date_left:"20%",
            couplet_start_date_left:"",
            couplet_end_date_left:"",
            test_start_date_left:"",
            test_end_date_left:"",
            online_date_left:"",
            showEndDate:true,
            users:[]
        }
    },
    components: {
        
    },
    watch: {

    },
    created(){
        let date = new Date();
        this.params.date_start =this.formatDate(this.dateAddDay(date,-30),"yyyy-MM-dd");
        this.params.date_end =this.formatDate(this.dateAddDay(date,30),"yyyy-MM-dd");
        this.changeDate();
    },
    mounted() {
        this.list();
        this.changeDate();
        this.getUsers();
    },
    methods: {
        getUsers(){
            this.$http.post("/casionj/user/queryUserTeamUser", {userid:userinfo.id})
                .then((response) => {
                this.users = response.data.result.data ? response.data.result.data : [];;
            });
        },
        changeStartDate(){
            this.showEndDate = false;
            window.setTimeout(()=>{
                this.showEndDate = true;
            },0);
        },
        changeDate(){
            let day_today = this.stringToDate(this.formatDate(new Date(),"yyyy-MM-dd"));
            let date_start = this.params.date_start;
            let date_end = this.params.date_end;
            let date_s = this.stringToDate(date_start);
            let date_e = this.stringToDate(date_end);
            let days = (date_e.getTime()-date_s.getTime())/(1000*24*3600);
            this.dayList = [];
            for(let i=0;i<days;i++){
                let dateNew = this.dateAddDay(date_s,i);
                let isToday = false;
                if(dateNew.getTime()==day_today.getTime()){
                    isToday = true;
                }
                this.dayList.push({day:this.formatDate(dateNew,"MM/dd"),dayWhole:this.formatDate(dateNew,"yyyy-MM-dd"),week:this.weekDay(dateNew),editable:false,isToday:isToday,mode:0});
            }
        },
        //列表
        list() {
            let params = Object.assign({}, this.params, {
                currentPage: this.pages.currentPage,
                pageSize: this.pages.pageSize,
                userid:userinfo.id
            });
            for(let key in params){
                if(params[key]===""){
                    delete params[key];
                }
            }

            this.yiiLoading.show();
            this.$http.post("/casionj/requirement/queryTeamByUser", params)
                .then((response) => {
                    let dataList = response.data.result.data ? response.data.result.data : [];
                    for(let i=0;i<dataList.length;i++){
                        let d = dataList[i];
                        this.createDistance(d);
                    }
                    this.dataList = dataList;
                    this.pages.total = response.data.result.page.totalCount;
            });

            this.$http.post("/casionj/user/queryUserTeamUser", {userid:userinfo.id})
                .then((response) => {
                    this.users = response.data.result.data ? response.data.result.data : [];;
            });
        },
        //创建距离
        createDistance(requirement){
            let dev_start_date = new Date(requirement.dev_start_date+" 23:59:59");
            let dev_end_date = new Date(requirement.dev_end_date+" 23:59:59");

            let couplet_start_date = new Date(requirement.couplet_start_date+" 23:59:59");
            let couplet_end_date = new Date(requirement.couplet_end_date+" 23:59:59");
            let test_start_date = new Date(requirement.test_start_date+" 23:59:59");
            let test_end_date = new Date(requirement.test_end_date+" 23:59:59");
            let online_date = new Date(requirement.online_date+" 23:59:59");

            let total = online_date.getTime()-dev_start_date.getTime();

            requirement.dev_start_date_left = "0%";
            requirement.dev_end_date_left =((dev_end_date.getTime()-dev_start_date.getTime())/total)*100+"%";
            requirement.couplet_start_date_left = ((couplet_start_date.getTime()-dev_start_date.getTime())/total)*100+"%";
            requirement.couplet_end_date_left = ((couplet_end_date.getTime()-dev_start_date.getTime())/total)*100+"%";
            requirement.test_start_date_left = ((test_start_date.getTime()-dev_start_date.getTime())/total)*100+"%";
            requirement.test_end_date_left = ((test_end_date.getTime()-dev_start_date.getTime())/total)*100+"%";
            requirement.online_date_left = "100%";

            requirement.dev_start_date = this.formatDate(dev_start_date,"MM/dd");
            requirement.dev_end_date = this.formatDate(dev_end_date,"MM/dd");
            requirement.couplet_start_date = this.formatDate(couplet_start_date,"MM/dd");
            requirement.couplet_end_date = this.formatDate(couplet_end_date,"MM/dd");
            requirement.test_start_date = this.formatDate(test_start_date,"MM/dd");
            requirement.test_end_date = this.formatDate(test_end_date,"MM/dd");
            requirement.online_date = this.formatDate(online_date,"MM/dd");
            requirement.today_left = "0%";
            if(requirement.status!=7){
                window.setTimeout(()=>{
                    requirement.today_left = ((new Date().getTime()-dev_start_date.getTime())/total)*100+"%";
                },60);
            }else{
                requirement.today_left = "100%";
            }
            
        },
        //创建天
        createDays(requirement){
            let day_today = this.formatDate(new Date(),"yyyy-MM-dd");

            let length = this.dayList.length;
            let days = [];
            for(let i=0;i<length;i++){
                let day = this.dayList[i];
                console.log("requirement.dev_end_date",requirement.dev_end_date);
                let dev = (requirement.dev_start_date && requirement.dev_end_date && day.dayWhole>=requirement.dev_start_date && day.dayWhole<=requirement.dev_end_date)||day.dayWhole===requirement.dev_start_date||day.dayWhole===requirement.dev_end_date;
                let couplet = (requirement.couplet_start_date && requirement.couplet_end_date && day.dayWhole>=requirement.couplet_start_date && day.dayWhole<=requirement.couplet_end_date)||day.dayWhole==requirement.couplet_start_date||day.dayWhole==requirement.couplet_end_date;
                let test = (requirement.test_start_date && requirement.test_end_date && day.dayWhole>=requirement.test_start_date && day.dayWhole<=requirement.test_end_date)||day.dayWhole==requirement.test_start_date||day.dayWhole==requirement.test_end_date;
                let online = requirement.online_date==day;
                let mode = null;
                if(day.dayWhole==requirement.dev_start_date){
                    mode = "dev_start_date";
                }else if(day.dayWhole==requirement.dev_end_date){
                    mode = "dev_end_date";
                }else if(day.dayWhole==requirement.couplet_start_date){
                    mode = "couplet_start_date";
                }else if(day.dayWhole==requirement.couplet_end_date){
                    mode = "couplet_end_date";
                }else if(day.dayWhole==requirement.test_start_date){
                    mode = "test_start_date";
                }else if(day.dayWhole==requirement.test_end_date){
                    mode = "test_end_date";
                }else if(day.dayWhole==requirement.online_date){
                    mode = "online_date";
                }

                let isToday = false;
                if(day_today===day.dayWhole){
                    isToday = true;
                }

                days.push({day:day.dayWhole,isToday:isToday,dev:dev,couplet:couplet,test:test,online:online,editable:false,mode:mode});
            }
            requirement.days = days;
        },
        changeModeDate(dayObj,row){
            console.log("dayObj.mode",dayObj.day);
            dayObj.editable = false;
            row[dayObj.mode]  = dayObj.day;
            this.createDays(row);
            this.changeRow(row);
        },
        //查询数据
        search(){
            this.pages.currentPage = 1;
            this.list();
        },
        //跳转到新建页面
        gotoNew(){
            this.$router.push("setting");
        },
        //跳转到新建页面
        edit(row){
            this.$router.push("modify/"+row.id);
        },
        //删除一条数据
        del(e, id){
            let _this = this;
            this.yiiConfirm({
            content: "是否删除",
            onConfirm(){
                    _this.$http.post("/casionj/requirement/delete",{
                    id:id
                    }).then((response) => {
                        _this.list();
                    });
                }
            });
        },
        addRow(){
            this.$router.push({name:"requirement-setting",params:{}});
            // let row = {
            //     status:0
            // };
            // this.createDays(row);
            // this.dataList.splice(0,0,row);
        },
        changeRow(row){
            //改变行
            let params = null;
            if(!row.id){
                params = Object.assign({}, row,{
                    createuser:userinfo.id,
                    createusername:userinfo.nickname
                }); 
            }else{
                params = Object.assign({}, row,{
                    id:row.id,
                    updateuser:userinfo.id,
                    updateusername:userinfo.nickname
                }); 
            }
            if(params.developer){
                let u = this.users.filter(function(item){return item.id===row.developer})[0];
                params.developername = u.name?u.name:u.nickname;
            }

            delete params.days;
            
            this.$http.post(params.id?"/casionj/requirement/update":"/casionj/requirement/add", params)
                .then((response) => {

                    let id = response.data.result.id; 
                    if(id){
                        row.id = id;
                    }
                    
            }).catch(function(){
                
            });
        },
        updateStatus(row,status){
            if(status==7){
                this.yiiConfirm({
                    content: "确认您的代码已经合并到主分支了？",
                    onConfirm:()=>{
                        this.updateStatusDo(row,status);
                    }
                });
            }else{
                this.yiiConfirm({
                    content: "确认要进行此次操作？",
                    onConfirm:()=>{
                        this.updateStatusDo(row,status);
                    }
                });
            }
            
        },
        updateStatusDo(row,status){
            this.$http.post("/casionj/requirement/update", {
                id:row.id,
                status:status,
                updateuser:userinfo.id,
                updateusername:userinfo.name?userinfo.name:userinfo.nickname
            }).then((response) => {
               row.status = status;
            }).catch(function(){
                
            });
        },
        selectUser(row){
            // 创建弹窗，并传递参数
            let vm = this.yiiModal({}, Vue.extend(require('../../components/usersel/usersel.vue')));
            // 监听子组件自定义事件
            vm.$on('close', (v)=>{
            })
            //监听确认事件
            vm.$on('confirm', (selectData)=>{
                for(let newUser of selectData){
                    let find = false;
                    for(let user of this.users){
                        if(user.id === newUser.id){
                            find = true;
                        }
                    }
                    if(!find){
                        this.users.push(newUser);
                    }
                }

                this.users=selectData;
                console.log("users",this.users);
                vm.close();
            })
        }
    }
}
    