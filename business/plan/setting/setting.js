/**
 * Created by gaoyang on 2018/04/08.
 * @title 计划列表js
 */
export default{
    data(){
        return {
            formModel:{
                "name":"",
                "starttime":"",
                "endtime":"",
                "remark":""
            },
            formRules:{
                "name":[{required: true, message: '请输入计划内容'}],
                "remark":[{required: true, message: '请输入计划描述'}],
                "starttime":[{required: true, message: '请输入开始时间'}],
                "endtime":[{required: true, message: '请输入结束时间'}]
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
                    this.$http.post(id?"/casion/plan/update":"/casion/plan/add", params)
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
            this.$http.post("/casion/plan/get", {
                id:this.$route.params.id
            }).then((response) => {
                this.formModel = response.data.data ? response.data.data : {};   
            });     
        },
        back(){
            this.$router.push({"name":"plan-list"});
        }
    }
}
    