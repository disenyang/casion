/**
 * Created by gaoyang on 2018/01/04.
 * @title 数据模型列表js
 */
export default{
    data(){
        return {
            model:{
                "name":"",
                "title":"",
                "dbname":"",
                "moduleid":"",
                "remark":""
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
            this.$http.post("/casion/model/get", {
                id:this.$route.params.id
            }).then((response) => {
                this.model = response.data.data ? response.data.data : {};   
            });     
        },
        back(){
            this.$router.push("../list");
        }
    }
}
    