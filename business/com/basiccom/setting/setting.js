/**
 * Created by gaoyang on 2018/01/20.
 * @title 基础组件列表js
 */
export default{
    data(){
        return {
            formModel:{
                "name":"",
                "icon":"",
                "viewcode":"",
                "stylecode":"",
                "jscode":"",
                "type":"",
                "enname":""
            },
            checkParams:{
                name:{
                    error:false,
                    msg:"名称不能为空"
                },
                enname:{
                    error:false,
                    msg:"标签名称不能为空"
                },
                icon:{
                    error:false,
                    msg:"请选择图片"
                }
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
            let params ;
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
            this.$http.post(params.id?"/casion/basiccom/update":"/casion/basiccom/add", params)
                .then((response) => {
                    let id = response.data.data.id || params.id;
                    let vm = this;
                    this.yiiTips({
                      type: "success", 
                      message: "成功啦！", 
                      duration:600,
                      closehandler(el){
                        vm.$router.push({name:"basiccom-detail",params:{id:id}});
                      }
                    });
            }).catch(function(){
                
            });
        },
        //获取详情
        getDetail(){
            this.yiiLoading.show();
            this.$http.post("/casion/basiccom/get", {
                id:this.$route.params.id
            }).then((response) => {
                this.formModel = response.data.data ? response.data.data : {};   
                this.formModel.type = this.formModel.type+"";
            });     
        },
        back(){
            this.yiiConfirm({content:"当前数据未保存，是否跳转？",onConfirm:()=>{
                this.$router.go(-1);
            }});
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
                this.formModel.icon = v;
            })
        }
    }
}
    