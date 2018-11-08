/**
 * Created by gaoyang on 2018/04/08.
 * @title 计划明细列表js
 */
export default{
    data(){
        return {
            plandetail:{
                "plan":"",
                "title":"",
                "content":"",
                "finished":""
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
            this.$http.post("/casion/plandetail/get", {
                id:this.$route.params.id
            }).then((response) => {
                this.plandetail = response.data.data ? response.data.data : {};   
            });     
        },
        back(){
            this.$router.push("../list");
        }
    }
}
    