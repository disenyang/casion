/**
 * Created by gaoyang on 2018/03/27.
 * @title 需求列表js
 */
export default{
    data(){
        return {
            formModel:{
                "name":"",
                "status":0,
                "dev_start_date":"",
                "dev_end_date":"",
                "couplet_start_date":"",
                "couplet_end_date":"",
                "test_start_date":"",
                "test_end_date":"",
                "online_date":"",
                "developer":"",
                "developername":"",
                "maxreqbugnum":0,
                "maxcodebugnum":"",
                "codebugnum":0
            },
            formRules:{
                "name":[{required: true, message: '请输入需求名称'}],
                "status":[{required: true, message: '请输入状态'}],
                "dev_start_date":[{required: true, message: '请输入开发开始时间'}],
                "dev_end_date":[{required: true, message: '请输入开发结束时间'}],
                "couplet_start_date":[{required: true, message: '请输入联调开始时间'}],
                "couplet_end_date":[{required: true, message: '请输入联调结束时间'}],
                "test_start_date":[{required: true, message: '请输入测试开始时间'}],
                "test_end_date":[{required: true, message: '请输入测试结束时间'}],
                "online_date":[{required: true, message: '请输入上线时间'}],
                "developer":[{required: true, message: '请输入开发者'}],
                "maxreqbugnum":[{required: true, message: '请输入最大需求bug量'}],
                "maxcodebugnum":[{required: true, message: '请输入最大代码bug量'}]
            },
            users:[]
        }
    },
    components: {
        
    },
    watch: {

    },
    created(){

    },
    mounted() {
        if(this.$route.params.id){
            this.getDetail();
        }
        this.getUsers();
    },
    methods: {
        getUsers(){
            this.$http.post("/casionj/user/queryUserTeamUser", {userid:userinfo.id})
                .then((response) => {
                this.users = response.data.result.data ? response.data.result.data : [];;
            });
        },
        //保存
        save(){
            let vue = this;
            this.$refs.form.validate()
                .then(() => {

                    let params = Object.assign({}, this.formModel,{
                        createuser:userinfo.id,
                        createusername:userinfo.nickname
                    });
                    for(let u of this.users){
                        if(u.id===params.developer){
                            params.developername = u.name;
                        }
                    }
                    this.yiiLoading.show();
                    this.$http.post(params.id?"/casionj/requirement/update":"/casionj/requirement/add", params)
                        .then((response) => {
                            this.yiiTips({
                              type: "success", 
                              message: "成功啦！", 
                              closehandler(el){
                                vue.back();
                              }
                            });
                    }).catch(function(){
                        
                    });
                })
                .catch(() => {
                    console.log('form1 validate fail')
                });
        },
        //获取详情
        getDetail(){
            this.yiiLoading.show();
            this.$http.post("/casionj/requirement/get", {
                id:this.$route.params.id
            }).then((response) => {
                this.formModel = response.data.result ? response.data.result : {};   
            });     
        },
        back(){
            this.$router.push({"name":"requirement-list"});
        }
    }
}
    