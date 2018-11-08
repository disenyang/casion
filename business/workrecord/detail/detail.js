/**
 * Created by gaoyang on 2018/04/03.
 * @title 工作记录列表js
 */
export default{
    data(){
        return {
            workrecord:{
                "content":""
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
            this.$http.post("/casion/workrecord/get", {
                id:this.$route.params.id
            }).then((response) => {
                this.workrecord = response.data.data ? response.data.data : {};   
            });     
        },
        back(){
            this.$router.push("../list");
        }
    }
}
    