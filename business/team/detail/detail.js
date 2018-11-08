/**
 * Created by gaoyang on 2018/03/27.
 * @title 团队列表js
 */
export default{
    data(){
        return {
            team:{
                "name":"",
                "remark":"",
                "company":"",
                "usernum":""
            }
        }
    },
    components: {
        
    },
    computed:{
        defaultHeadimg:function(){
            return this.$store.state.defaultHeadimg;
        }
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
            this.$http.post("/casion/team/get", {
                id:this.$route.params.id
            }).then((response) => {
                this.team = response.data.data ? response.data.data : {};   
            });     
        },
        back(){
            this.$router.push("../list");
        }
    }
}
    