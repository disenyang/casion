/**
 * Created by gaoyang on 2018/03/07.
 * @title 环境列表js
 */
export default{
    data(){
        return {
            environment:{
                "name":"",
                "remark":"",
                "ftphost":"",
                "ftpport":"",
                "ftpusername":"",
                "ftppassword":"",
                "remotePath":""
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
            this.$http.post("/casion/environment/get", {
                id:this.$route.params.id
            }).then((response) => {
                this.environment = response.data.data ? response.data.data : {};   
            });     
        },
        back(){
            this.$router.push("../list");
        }
    }
}
    