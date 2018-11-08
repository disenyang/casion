/**
 * Created by gaoyang on 2018/01/09.
 * @title 页面文件夹列表js
 */
export default{
    data(){
        return {
            pagefolder:{
                "name":"",
                "showname":"",
                "parentid":""
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
            this.$http.post("/casion/pagefolder/get", {
                id:this.$route.params.id
            }).then((response) => {
                this.pagefolder = response.data.data ? response.data.data : {};   
            });     
        },
        back(){
            this.$router.push("../list");
        }
    }
}
    