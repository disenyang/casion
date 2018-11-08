/**
 * Created by gaoyang on 2018/03/27.
 * @title 需求列表js
 */
export default{
    data(){
        return {
            requirement:{
                "name":"",
                "status":"",
                "dev_start_date":"",
                "dev_end_date":"",
                "couplet_start_date":"",
                "couplet_end_date":"",
                "test_start_date":"",
                "test_end_date":"",
                "online_date":"",
                "developer":""
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
            this.$http.post("/casion/requirement/get", {
                id:this.$route.params.id
            }).then((response) => {
                this.requirement = response.data.data ? response.data.data : {};   
            });     
        },
        back(){
            this.$router.push("../list");
        }
    }
}
    