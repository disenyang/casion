/**
 * Created by gaoyang on 2018/04/04.
 * @title 积分明细列表js
 */
export default{
    data(){
        return {
            scoredetail:{
                "user":"",
                "type":"",
                "score":""
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
        })
    },
    methods: {
        //获取详情
        getDetail(){
            this.yiiLoading.show();
            this.$http.post("/casion/scoredetail/get", {
                id:this.$route.params.id
            }).then((response) => {
                this.scoredetail = response.data.data ? response.data.data : {};   
            });     
        },
        back(){
            this.$router.push("../list");
        }
    }
}
    