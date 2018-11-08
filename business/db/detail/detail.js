/**
 * Created by gaoyang on 2018/01/05.
 * @title 数据库列表js
 */
export default{
    data(){
        return {
            db:{
                "name":"",
                "database":"",
                "ip":"",
                "port":"",
                "username":"",
                "password":""
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
            this.$http.post("/casion/db/get", {
                id:this.$route.params.id
            }).then((response) => {
                this.db = response.data.data ? response.data.data : {};   
            });     
        },
        back(){
            this.$router.push("../list");
        }
    }
}
    