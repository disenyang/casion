/**
 * Created by gaoyang on 2018/04/03.
 * @title 导师列表js
 */
export default{
    data(){
        return {
            formModel:{
                "tutor":"",
                "student":"",
                "finishing":""
            },
            formRules:{
                "tutor":[{required: true, message: '请输入导师'}],
                "student":[{required: true, message: '请输入学生'}],
                "finishing":[{required: true, message: '请输入完成度'}]
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
                    this.$http.post("/casion/tutor/add", params)
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
            this.$http.post("/casion/tutor/get", {
                id:this.$route.params.id
            }).then((response) => {
                this.formModel = response.data.data ? response.data.data : {};   
            });     
        },
        back(){
            this.$router.push({"name":"tutor-list"});
        }
    }
}
    