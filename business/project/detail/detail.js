/**
 * Created by gaoyang on 2018/01/22.
 * @title 项目列表js
 */
import stores from 'stores';

export default{
    data(){
        return {
            defaultComImg:"http://oxwmr019d.bkt.clouddn.com/com.png",
            defaultHeadimg:stores.defaultHeadimg,
            enterOpenBtn:false,
            enterDeployBtn:false,
            enterEditBtn:false,
            project:{
                "name":""
            },
            dongtaiTabs:[
                {lab:"我的项目",selected:true},
                {lab:"关注的项目",selected:false},
                {lab:"关注的人",selected:false}
            ]
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
            this.getDetail();
        })
    },
    methods: {
        //获取详情
        getDetail(){
            this.yiiLoading.show();
            this.$http.post("/casion/project/get", {
                id:this.$route.params.id
            }).then((response) => {
                this.project = response.data.data ? response.data.data : {};  
                this.$store.commit("setHead_title",this.project.name); 
            });     
        },
        clickCom(com){
            this.$router.push({name: 'basiccom-detail', params:{id: com.id}});
        },
        back(){
            this.$router.push("../list");
        },
        gotoUser(userid){
            this.$router.push({name: 'personal-home', params:{userid: userid}});
        },
        openProject(){
            //打开项目
            this.$router.push({name:"pagefolder-list",params:{projectid:this.project.id}});
        },
        deployProject(){
            //发布项目
            this.$router.push({name:"project-deploy",params:{id:this.project.id}});
        },
        editProject(){
            //发布项目
            this.$router.push({name:"project-modify",params:{id:this.project.id}});
        },
        delProject(){
            let _this = this;
            this.yiiConfirm({
                content: "确认删除项目?",
                onConfirm(){
                    _this.$http.post("/casion/project/delete",{
                    id:_this.project.id
                    }).then((response) => {
                        _this.$router.go(-1);
                    });
                }
            });
        },
    }
}
    