/**
 * Created by gaoyang on 2018/04/08.
 * @title 计划列表js
 */
import utils from "utils"
export default{
    mixins:[utils.mixins],
    data(){
        return {
            params:{
                "name":"",
                "starttime":"",
                "endtime":"",
                "createusername":"",
                "createtime":"",
                "updateusername":"",
                "updatetime":""
            },
            dataList:[],
            tabSelectIndex:1,
            pages:{
                total:0,
                pageSize:15,
                currentPage:1
            },
            showUpload:false,
            userinfo:{}
        }
    },
    components: {
        
    },
    watch: {

    },
    created(){
        this.getUser();
    },
    mounted() {
        
    },
    methods: {
        //列表
        getUser() {
            this.yiiLoading.show();
            this.$http.post("/casion/userinfo/get", {id:this.$route.params.userid})
                .then((response) => {
                    this.userinfo = response.data.data;

            });
        },
        //查询数据
        search(){
            this.pages.currentPage = 1;
            this.list();
        },
        upload(){
            let upload = this.yiiUpload({
                title: '上传图片',
                size: 'middle',
                url: '/casion/upload',
                uploadFileFieldName: 'file',
                allowCrop: true,
                minWidth: 100,
                minHeight: 100,
                cropOutputRatio: '1:1',
                cropMaxSize: '50KB',
                cropOutputPattern: '.png'
            });
            upload.$on("complete", (v)=>{
                this.userinfo.headimg = v;
                this.$http.post("/casion/userinfo/update", {id:this.userinfo.id,headimg:this.userinfo.headimg})
                    .then((response) => {
                        if(this.userinfo.id===userinfo.id){
                            userinfo.headimg = v;
                        }
                });
            })
        },
        updateNickname(){
            this.$http.post("/casion/userinfo/update", {id:this.userinfo.id,nickname:this.userinfo.nickname})
                .then((response) => {
                if(this.userinfo.id===userinfo.id){
                    userinfo.nickname = this.userinfo.nickname;
                    this.$store.commit("setHead_title",this.userinfo.nickname);
                }
            });
        },
        updateName(){
            this.$http.post("/casion/userinfo/update", {id:this.userinfo.id,name:this.userinfo.name})
                .then((response) => {
                if(this.userinfo.id===userinfo.id){
                    userinfo.name = this.userinfo.name;
                }
            });
        },
        //跳转到新建页面
        gotoNew(){
            this.$router.push("setting");
        },
        //跳转到新建页面
        gotoEdit(row){
            this.$router.push({name:"plan-modify",params:{id:row.id}});
        },
        //跳转到新建页面
        gotoDetail(row){
            this.$router.push({name:"plan-detail",params:{id:row.id}});
        },
        //删除一条数据
        del(e, id){
            let _this = this;
            this.yiiConfirm({
            content: "是否删除",
            onConfirm(){
                _this.$http.post("/casion/plan/delete",{
                id:id
                }).then((response) => {
                    _this.list();
                });
            }
        });
    }
    }
}
    