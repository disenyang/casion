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
                "plan":"",
                "title":"",
                "content":"",
                "finished":"",
                "createusername":"",
                "createtime":"",
                "updateusername":"",
                "updatetime":""
            },
            plan:{
                "name":"",
                "starttime":"",
                "endtime":""
            },
            dataList:[],
            pages:{
                total:0,
                pageSize:15,
                currentPage:1
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
            this.getDetail();
            this.list();
        })
    },
    methods: {
        //获取详情
        getDetail(){
            this.yiiLoading.show();
            this.$http.post("/casion/plan/get", {
                id:this.$route.params.id
            }).then((response) => {
                this.plan = response.data.data ? response.data.data : {};   
            });     
        },
        //跳转到新建页面
        gotoNew(){
            this.$router.push({name:"plandetail-setting",params:{planid:this.$route.params.id}});
        },

        back(){
            this.$router.push("../list");
        },
        //列表
        list() {
            let params = Object.assign({}, this.params, {
                currentPage: this.pages.currentPage,
                pageSize: this.pages.pageSize,
                plan:this.$route.params.id
            });
            this.yiiLoading.show();
            this.$http.post("/casion/plandetail/query", params)
                .then((response) => {
                    this.dataList = response.data.data.data ? response.data.data.data : [];
                    for(let d of this.dataList){
                        d.content=this.replaceContent(d.content);
                    }
                    this.pages.total = response.data.data.page.totalCount;
            });
        },
        replaceContent(content){
            return content.replace(/\n/g,"<br>");
        },
        //查询数据
        search(){
            this.pages.currentPage = 1;
            this.list();
        },
        //删除一条数据
        del(e, id){
            let _this = this;
            this.yiiConfirm({
            content: "是否删除",
            onConfirm(){
                _this.$http.post("/casion/plandetail/delete",{
                id:id
                }).then((response) => {
                    _this.list();
                });
            }
            });
        }
    }
}
    