/**
 * Created by gaoyang on 2018/04/03.
 * @title 工作记录列表js
 */
export default{
    data(){
        return {
            params:{
                "content":"",
                "createusername":"",
                "createtime":"",
                "updateusername":"",
                "updatetime":""
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
    computed:{
        userinfo:function(){
            return userinfo;
        },
        defaultHeadimg:function(){
            return this.$store.state.defaultHeadimg;
        }
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
            this.yiiLoading.show();
            this.$http.post("/casion/team/getSameUsers", {userid:userinfo.id})
                .then((response) => {
                    this.dataList = response.data.data.data ? response.data.data.data : [];
                    for(let row of this.dataList){
                        this.$set(row,"loading",true);
                        this.$http.post("/casion/workrecord/queryUserCount", {userid:userinfo.id})
                            .then((response) => {
                                let counts = response.data.data || {weekcount:0,monthcount:0,yearcount:0};
                                this.$set(row,"weekcount",counts.weekcount);
                                this.$set(row,"monthcount",counts.monthcount);
                                this.$set(row,"yearcount",counts.yearcount);
                                this.$set(row,"loading",false);
                                console.log(row);
                        });
                    }
            });
        },
        //查询数据
        search(){
            this.pages.currentPage = 1;
            this.list();
        },
        //跳转到新建页面
        goList(){
            this.$router.push({name:"workrecord-list",params:{}});
        },
        //删除一条数据
        del(e, id){
            let _this = this;
            this.yiiConfirm({
            content: "是否删除",
            onConfirm(){
                _this.$http.post("/casion/workrecord/delete",{
                id:id
                }).then((response) => {
                    _this.list();
                });
            }
        });
    }
    }
}
    