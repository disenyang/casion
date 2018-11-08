/**
 * Created by gaoyang on 2018/04/03.
 * @title 导师任务列表js
 */
export default{
    data(){
        return {
            tutortask:{
                "title":"",
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
            this.$http.post("/casion/tutortask/get", {
                id:this.$route.params.id
            }).then((response) => {
                this.tutortask = response.data.data ? response.data.data : {};   
            });     
        },
        back(){
            this.$router.push("../list");
        }
    }
}
    