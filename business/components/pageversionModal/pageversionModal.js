export default{
    mixins: [Vue.prototype.yiiModalDefault],
    data() {
        return {
            modalShow: true,
            title: '',
            panelHeight:570,
            panelWidth:800,
            activeName:"first",
            pageversion:{
                content:"",
                styleContent:"",
                viewModelContent:""
            },
            pageversions:[],
            pages:{
                total:0,
                pageSize:20,
                currentPage:1
            }
        }
    },
    props:{
        pageid:{
        }
    },
    components: {
        
    },
    watch: {
        pageversion(val){
            console.log("val====",val);
        }
    },
    created(){
        this.size = "large";
    },
    mounted() {
        this.list();
    },
    methods:{
        list(){
            let params = Object.assign({}, this.params, {
                currentPage: this.pages.currentPage,
                pageSize: this.pages.pageSize,
                pageid:this.pageid
            });
            this.yiiLoading.show();
            this.$http.post("/casion/pageversion/query", params)
                .then((response) => {
                    this.pageversions = response.data.data.data ? response.data.data.data : [];
                    this.pages.total = response.data.data.page.totalCount;
            });
        },
        confirm(){
            
        },
        close(){
            this.modalShow = false;
        },
        recover(){
            this.yiiConfirm({title:"确认",content:"确认恢复到此版本?",onConfirm:()=>{
                this.$emit("confirm",this.pageversion);
            }});
        },
        clickTreeComNode(node){
            this.vmParent.clickTreeComNode(node);
        }
    }
}