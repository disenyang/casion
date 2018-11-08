/**
 * Created by gaoyang on 2018/01/05.
 * @title 数据库列表js
 */
export default{
    data(){
        return {
            formModel:{
                "name":"",
                "database":"",
                "ip":"",
                "port":"",
                "username":"",
                "project":"",
                "password":""
            },
            projectList:[],
            formRules:{
                "name":[{required: true, message: '请输入名称'}],
                "project":[{required: false, message: '请选择项目'}],
                "database":[{required: true, message: '请输入数据库'}],
                "ip":[{required: true, message: '请输入ip地址'}],
                "port":[{required: true, message: '请输入端口'}],
                "username":[{required: true, message: '请输入用户名'}],
                "password":[{required: true, message: '请输入密码'}]
            }
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
        this.getProjectList();
    },
    methods: {
        //获取项目列表
        getProjectList(){
            let params = {
                currentPage: 1,
                pageSize: 30
            };
            this.yiiLoading.show();
            this.$http.post("/casion/project/query", params)
                .then((response) => {
                    this.projectList = response.data.data.data ? response.data.data.data : [];
            });
        },
        //保存
        save(){
            let vue = this;
            this.$refs.form.validate()
                .then(() => {

                    let params;
                    if(!this.$route.params.id){
                        params = Object.assign({}, this.formModel,{
                            createuser:userinfo.id,
                            createusername:userinfo.nickname
                        });
                    }else{
                        params = Object.assign({}, this.formModel,{
                            updateuser:userinfo.id,
                            updateusername:userinfo.nickname,
                            id:this.$route.params.id
                        });
                    }
                    
                    this.yiiLoading.show();
                    this.$http.post(params.id?"/casion/db/update":"/casion/db/add", params)
                        .then((response) => {
                            this.yiiTips({
                              type: "success", 
                              message: "成功啦！", 
                              duration:1000,
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
            this.$http.post("/casion/db/get", {
                id:this.$route.params.id
            }).then((response) => {
                this.formModel = response.data.data ? response.data.data : {};   
            });     
        },
        back(){
            this.$router.go(-1);
        }
    }
}
    