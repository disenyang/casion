export default{
    mixins: [Vue.prototype.yiiModalDefault],
    data() {
        return {
            modalShow: true,
            title: '',
            panelHeight:570,
            panelWidth:800,
            selectedIndex:0,
            table:"",
            items:[],
            modelTitle:""
        }
    },
    props:{
        dbid:{
            
        }
    },
    components: {
        
    },
    watch: {

    },
    created(){
        this.size = "large";
    },
    mounted() {
        
    },
    methods:{
        getDbTables(){
            this.$http.post("/casion/model/queryDbTables",{dbid:this.dbid,table:this.table})
            .then((response) => {
                this.yiiLoading.hide();
                let res = response.data.data;
                console.log("res====",res);
                this.items = res;
            }).catch((e)=>{
                console.log("e",e);
            })
        },
        confirm(){
            this.$emit("confirm",this.table,this.modelTitle,this.items);
        },
        close(){
            this.modalShow = false;
        }
    }
}