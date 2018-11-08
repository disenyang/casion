/**
 * Created by gaoyang on 2018/02/01.
 * @title 用户项目配置列表js
 */
export default{
    data(){
        return {
            formModel:{
                "user":"",
                "project":"",
                "openpageid":"",
                "rootopen":""
            },
            formRules:{
                "user":[{required: true, message: '请输入用户'}],
                "project":[{required: true, message: '请输入项目'}],
                "openpageid":[{required: true, message: '请输入打开的页面'}],
                "rootopen":[{required: true, message: '请输入根结点是否打开'}]
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
            this.$refs.form.validate()
                .then(() => {
                    let params = Object.assign({}, this.formModel,{
                        createuser:userinfo.id,
                        createusername:userinfo.nickname
                    });
                    this.yiiLoading.show();
                    this.$http.post("/casion/userprojectconfig/add", params)
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
            this.$http.post("/casion/userprojectconfig/get", {
                id:this.$route.params.id
            }).then((response) => {
                this.formModel = response.data.data ? response.data.data : {};   
            });     
        },
        back(){
            this.$router.push({"name":"userprojectconfig-list"});
        }
    }
}
    