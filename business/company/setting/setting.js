/**
 * Created by gaoyang on 2018/03/27.
 * @title 公司列表js
 */
export default{
    data(){
        return {
            formModel:{
                "name":"",
                "remark":"",
                "site":"",
                "logo":"",
                "owner":"",
                "usernum":""
            },
            formRules:{
                "name":[{required: true, message: '请输入名称'}],
                "logo":[{required: true, message: '请上传logo'}],
                "remark":[{required: true, message: '请输入描述'}],
                "site":[{required: true, message: '请输入官网'}],
                "owner":[{required: true, message: '请输入管理员'}],
                "usernum":[{required: true, message: '请输入用户数量'}]
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
                    let params ;
                    if(!this.$route.params.id){
                        params = Object.assign({}, this.formModel,{
                            createuser:userinfo.id,
                            owner:userinfo.id,
                            createusername:userinfo.nickname
                        }); 
                    }else{
                        params = Object.assign({}, this.formModel,{
                            id:this.$route.params.id,
                            updateuser:userinfo.id,
                            updateusername:userinfo.nickname
                        }); 
                    }

                    this.yiiLoading.show();
                    this.$http.post(params.id?"/casion/company/update":"/casion/company/add", params)
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
        upload(){
            let upload = this.yiiUpload({
                title: '上传图片',
                size: 'middle',
                url: '/casion/upload',
                uploadFileFieldName: 'file',
                allowCrop: true,
                minWidth: 30,
                minHeight: 30,
                cropOutputRatio: '1:1',
                cropMaxSize: '50KB',
                cropOutputPattern: '.png'
            });
            upload.$on("complete", (v)=>{
                this.formModel.logo = v;
            })
        },
        //获取详情
        getDetail(){
            this.yiiLoading.show();
            this.$http.post("/casion/company/get", {
                id:this.$route.params.id
            }).then((response) => {
                this.formModel = response.data.data ? response.data.data : {};   
            });     
        },
        back(){
            this.$router.push({"name":"company-list"});
        }
    }
}
    