/**
 * Created by gaoyang on 2018/03/07.
 * @title 环境列表js
 */
export default{
    data(){
        return {
            formModel:{
                "name":"",
                "remark":"",
                "ftphost":"",
                "ftpport":"",
                "ftpusername":"",
                "ftppassword":"",
                "remotePath":""
            },
            formRules:{
                "name":[{required: true, message: '请输入名称'}],
                "remark":[{required: true, message: '请输入描述'}],
                "ftphost":[{required: true, message: '请输入ftp主机'}],
                "ftpport":[{required: true, message: '请输入ftp端口'}],
                "ftpusername":[{required: true, message: '请输入ftp用户名'}],
                "ftppassword":[{required: true, message: '请输入ftp密码'}],
                "remotePath":[{required: true, message: '请输入上传目录'}]
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
        this.$nextTick(function() {
            if(this.$route.params.id){
                this.getDetail();
            }
        })
    },
    methods: {
        //保存
        save(){
            let vue = this;
            let id = this.$route.params.id;
            this.$refs.form.validate()
                .then(() => {
                    let params = Object.assign({}, this.formModel,{
                        createuser:userinfo.id,
                        createusername:userinfo.nickname,
                        id:id
                    });
                    if(id){
                        params = Object.assign({}, this.formModel,{
                            updateuser:userinfo.id,
                            updateusername:userinfo.nickname,
                            id:id
                        });
                    }
                    this.yiiLoading.show();
                    this.$http.post(id?"/casion/environment/update":"/casion/environment/add", params)
                        .then((response) => {
                            this.yiiTips({
                              type: "success", 
                              message: "成功啦！", 
                              duration:600,
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
            this.$http.post("/casion/environment/get", {
                id:this.$route.params.id
            }).then((response) => {
                this.formModel = response.data.data ? response.data.data : {};   
            });     
        },
        back(){
            this.$router.push({"name":"environment-list"});
        }
    }
}
    