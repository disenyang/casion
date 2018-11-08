/**
 * Created by gaoyang on 2018/01/22.
 * @title 项目列表js
 */
import stores from 'stores';

export default{
    data(){
        return {
            params:{
                "name":"",
                "createusername":"",
                "createtime":"",
                "updateusername":"",
                "updatetime":""
            },
            dataList:[],
            selectedTab:null,
            defaultProjectimg:stores.defaultProjectimg,
            tabs:[{
                    lab:"我的项目",
                    selected:true
                },
                {
                    lab:"我创建的项目",
                    selected:false
                }
            ],
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
        this.selectedTab = this.tabs[0];
        this.$nextTick(function() {
            this.list();
        })
    },
    methods: {
        //列表
        list() {
            let params = Object.assign({}, this.params, {
                currentPage: this.pages.currentPage,
                pageSize: this.pages.pageSize,
                userid:userinfo.id
            });
            this.yiiLoading.show();
            this.$http.post("/casion/project/queryTeam", params)
                .then((response) => {
                    this.dataList = response.data.data.data ? response.data.data.data : [];
                    this.pages.total = response.data.data.page.totalCount;
            });
        },
        search(){
            this.pages.currentPage = 1;
            this.list();
        },
        gotoNew(){
            this.$router.push("setting");
        },
        clickTab(tab){
            if(this.selectedTab){
                this.selectedTab.selected = false;
            }
            this.selectedTab=tab;
            this.selectedTab.selected = true;
        },
        del(e, id){
            let _this = this;
            this.yiiConfirm({
                content: "是否删除",
                onConfirm(){
                    _this.$http.post("/casion/project/delete",{
                    id:id
                    }).then((response) => {
                        _this.list();
                    });
                }
            });
        },
        goProject(project){
            this.$router.push({name:"project-detail",params:{id:project.id}});
        },
        createProject(com){
            this.$router.push({name: 'project-setting'});
        }
    }
}
    