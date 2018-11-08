/**
 * Created by gaoyang on 2018/02/01.
 * @title 用户项目配置列表js
 */
export default{
    data(){
        return {
            params:{
                "user":"",
                "project":"",
                "openpageid":"",
                "rootopen":""
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
            this.list();
        })
    },
    methods: {
        //列表
        list() {
            let params = Object.assign({}, this.params, {
                currentPage: this.pages.currentPage,
                pageSize: this.pages.pageSize
            });
            this.yiiLoading.show();
            this.$http.post("/casion/userprojectconfig/query", params)
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
        del(e, id){
            let _this = this;
            this.yiiConfirm({
            content: "是否删除",
            onConfirm(){
                _this.$http.post("/casion/userprojectconfig/delete",{
                id:id
                }).then((response) => {
                    _this.list();
                });
            }
        });
    }
    }
}
    