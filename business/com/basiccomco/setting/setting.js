/**
 * Created by gaoyang on 2018/01/20.
 * @title 基础组件库列表js
 */
export default{
    data(){
        return {
            formModel:{
                "name":"",
                "remark":"",
                "count":"",
                "images":""
            },
            formRules:{
                "name":[{required: true, message: '请输入组件库名称'}],
                "remark":[{required: true, message: '请输入描述'}],
                "count":[{required: true, message: '请输入组件数量'}],
                "images":[{required: true, message: '请输入图片'}]
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
                    this.$http.post(params.id?"/casion/basiccomco/update":"/casion/basiccomco/add", params)
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
            this.$http.post("/casion/basiccomco/get", {
                id:this.$route.params.id
            }).then((response) => {
                this.formModel = response.data.data ? response.data.data : {};   
            });     
        },
        back(){
            this.$router.push({"name":"basiccomco-list"});
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
                cropOutputRatio: '4:3',
                cropMaxSize: '50KB',
                cropOutputPattern: '.png'
            });
            upload.$on("complete", (v)=>{
                this.formModel.images = v;
            })
        }
    }
}
    