import stores from 'stores';
export default{
    mixins: [Vue.prototype.yiiModalDefault],
    data() {
        return {
            modalShow: true,
            title: '',
            defaultHeadimg:stores.defaultHeadimg,
            size: "middle",
            panelHeight: 570,
            panelWidth:600,
            defaultParams:{
                merchantId:0//固定
            },
            params: {
                key:""
            },
            selectData:[],
            pages: {
                pageSize: 10,
                currentPage: 1,
                total:0
            },
            dataList: []
        }
    },
    components: {
        
    },

    watch: {

    },
    created(){

    },
    mounted() {
        
    },
    methods:{
        search(){
            this.yiiLoading.show();
            let params = {
                key:this.params.key
            };
            this.$http.post("/casion/userinfo/searchByKey",params)
              .then((response) => { 
                    this.yiiLoading.hide();
                    let res = response.data.data;
                    for(let i=0;i<res.length;i++){
                        let row = res[i];
                        row.checked=false;
                    }
                    this.dataList = res;
              }).catch((e)=>{
                    console.log("e",e);
              })
        },
        currentPageChange(){
            this.list();
        },
        resetParams(){
            this.searchData = Object.assign({},this.defaultParams);
        },
        multipleChange(checks){
            this.selectData = checks;
        },
        confirm(){
            let data = this.dataList.filter((item)=>{
                return item.checked;
            });
            this.$emit("confirm",data);
        },
        close(){
            this.modalShow = false;
        }
    }
  }