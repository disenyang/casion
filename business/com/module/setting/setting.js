/**
 * Created by gaoyang on 2018/03/08.
 * @title 模版列表js
 */
export default{
    data(){
        return {
            formModel:{
                "name":"",
                "viewContent":"",
                "cssContent":"",
                "jsContent":"",
                "image":"",
                "coid":"",
                "remark":""
            },
            formRules:{
                "name":[{required: true, message: '请输入名称'}],
                "image":[{required: true, message: '请输入图片'}],
                "remark":[{required: true, message: '请输入说明'}]
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
                    let params;
                    if(!this.$route.params.id){
                        params = Object.assign({}, this.formModel,{
                            createuser:userinfo.id,
                            coid:this.$route.params.coid,
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
                    this.$http.post(params.id?"/casion/module/update":"/casion/module/add", params)
                        .then((response) => {
                            let id = response.data.data.id || params.id;
                            this.yiiTips({
                              type: "success", 
                              message: "成功啦！", 
                              duration:500,
                              closehandler(el){
                                vue.$router.push({name: 'module-detail', params:{id:id}})
                              }
                            });
                    }).catch(function(){
                        
                    });
                })
                .catch(() => {
                    
                });
        },
        //获取详情
        getDetail(){
            this.yiiLoading.show();
            let vm = this;
            this.$http.post("/casion/module/get", {
                id:this.$route.params.id
            }).then((response) => {
                this.formModel = response.data.data ? response.data.data : {};  
            });     
        },
        back(){
            this.$router.go(-1);
        },
        upload(){
            let upload = this.yiiUpload({
                title: '上传图片',
                size: 'middle',
                url: '/casion/upload',
                uploadFileFieldName: 'file',
                allowCrop: false,
                minWidth: 30,
                minHeight: 30,
                cropOutputRatio: '1:1',
                cropMaxSize: '200KB',
                cropOutputPattern: '.png'
            });
            upload.$on("complete", (v)=>{
                this.formModel.image =v;
            })
        }
    }
}
    