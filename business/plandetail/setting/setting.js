/**
 * Created by gaoyang on 2018/04/08.
 * @title 计划明细列表js
 */
export default{
    data(){
        return {
            formModel:{
                "plan":"",
                "title":"",
                "content":"",
                "finished":""
            },
            formRules:{
                "plan":[{required: true, message: '请输入'}],
                "title":[{required: true, message: '请输入'}],
                "content":[{required: true, message: '请输入'}],
                "finished":[{required: true, message: '请输入完成度'}]
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
                    let id = this.$route.params.id;
                    let params = Object.assign({}, this.formModel,{
                        createuser:userinfo.id,
                        createusername:userinfo.name||userinfo.nickname,
                        plan:this.$route.params.planid,
                        id:id
                    });
                    if(id){
                        params = Object.assign({}, this.formModel,{
                            updateuser:userinfo.id,
                            updateusername:userinfo.name||userinfo.nickname,
                            id:id
                        });
                    }
                    this.yiiLoading.show();
                    this.$http.post(id?"/casion/plandetail/update":"/casion/plandetail/add", params)
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
            this.$http.post("/casion/plandetail/get", {
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
    