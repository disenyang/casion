/**
 * Created by gaoyang on 2018/02/01.
 * @title 用户项目配置列表js
 */
export default{
    data(){
        return {
            userprojectconfig:{
                "user":"",
                "project":"",
                "openpageid":"",
                "rootopen":""
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
            this.$http.post("/casion/userprojectconfig/get", {
                id:this.$route.params.id
            }).then((response) => {
                this.userprojectconfig = response.data.data ? response.data.data : {};   
            });     
        },
        back(){
            this.$router.push("../list");
        }
    }
}
    