/**
 * Created by gaoyang on 2018/04/04.
 * @title 积分明细列表js
 */
export default{
    data(){
        return {
            params:{
                "user":"",
                "createtime":"",
                "type":"",
                "score":""
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
            this.$http.post("/casion/scoredetail/query", params)
                .then((response) => {
                    this.dataList = response.data.data.data ? response.data.data.data : [];
                    this.pages.total = response.data.data.page.totalCount;
            });
        },
        //查询数据
        search(){
            this.pages.currentPage = 1;
            this.list();
        },
        //跳转到新建页面
        gotoNew(){
            this.$router.push("setting");
        },
        //删除一条数据
        del(e, id){
            let _this = this;
            this.yiiConfirm({
            content: "是否删除",
            onConfirm(){
                _this.$http.post("/casion/scoredetail/delete",{
                id:id
                }).then((response) => {
                    _this.list();
                });
            }
        });
    }
    }
}
    