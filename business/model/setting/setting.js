/**
 * Created by gaoyang on 2018/01/04.
 * @title 数据模型列表js
 */
export default{
    data(){
        return {
            formModel:{
                "title":"",
                "name":"",
                "remark":""
            },
            formRules:{
                "title":[{required: true, message: '请输入标题'}],
                "name":[{required: true, message: '请输入名称'}],
                "remark":[{required: true, message: '请输入描述'}]
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
            this.$refs.form.validate()
                .then(() => {
                    let params ;
                    if(!this.$route.params.id){
                        params = Object.assign({}, this.formModel,{
                            createuser:userinfo.id,
                            createusername:userinfo.nickname,
                            dbid:this.$route.params.dbid
                        })
                    }else{
                        params = Object.assign({}, this.formModel,{
                            updateuser:userinfo.id,
                            updateusername:userinfo.nickname,
                            id:this.$route.params.id
                        })
                    }
                    this.yiiLoading.show();
                    this.$http.post(params.id?"/casion/model/update":"/casion/model/add", params)
                        .then((response) => {
                            this.yiiTips({
                              type: "success", 
                              message: "成功啦！", 
                              duration:1000,
                              closehandler:(el)=>{
                                this.back();
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
            this.$http.post("/casion/model/get", {
                id:this.$route.params.id
            }).then((response) => {
                this.formModel = response.data.data ? response.data.data : {};   
            });     
        },
        back(){
            this.$router.push({"name":"model-list"});
        }
    }
}
    