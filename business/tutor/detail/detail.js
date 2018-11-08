/**
 * Created by gaoyang on 2018/04/03.
 * @title 导师列表js
 */
export default{
    data(){
        return {
            tutor:{
                "tutor":"",
                "student":"",
                "finishing":""
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
            this.$http.post("/casion/tutor/get", {
                id:this.$route.params.id
            }).then((response) => {
                this.tutor = response.data.data ? response.data.data : {};   
            });     
        },
        back(){
            this.$router.push("../list");
        }
    }
}
    