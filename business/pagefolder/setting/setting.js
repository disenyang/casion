/**
 * Created by gaoyang on 2018/01/09.
 * @title 页面文件夹列表js
 */
export default{
    data(){
        return {
            formModel:{
                "name":"",
                "showname":"",
                "parentid":""
            },
            formRules:{
                "name":[{required: true, message: '请输入名称'}],
                "showname":[{required: true, message: '请输入显示名称'}],
                "parentid":[{required: true, message: '请输入父文件夹'}]
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
                    this.$http.post("/casion/pagefolder/add", params)
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
            this.$http.post("/casion/pagefolder/get", {
                id:this.$route.params.id
            }).then((response) => {
                this.formModel = response.data.data ? response.data.data : {};   
            });     
        },
        back(){
            this.$router.push({"name":"pagefolder-list"});
        }
    }
}
    