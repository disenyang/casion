export default{
    mixins: [Vue.prototype.yiiModalDefault],
    data() {
        return {
            modalShow: true,
            title: '',
            size: "large",
            panelHeight: 570,
            checkedAll:false,
            selectedCo:null,
            defaultParams:{
                merchantId:0//固定
            },
            searchData: {},
            selectData:[],
            pages: {
                pageSize: 10,
                currentPage: 1,
                total:0
            },
            cos: [],
            coms: [],
            defaultComImg:"http://oxwmr019d.bkt.clouddn.com/com.png"
        }
    },
    components: {
        
    },
    computed:{
        
    },
    watch: {

    },
    created(){

    },
    mounted() {
        console.log("this",this);
        this.$nextTick(function() {
            this.resetParams();
            this.list();
        })
    },
    methods:{
        list(){
            this.yiiLoading.show();
            let params = Object.assign({}, this.searchData, {
                currentPage: this.pages.currentPage,
                pageSize: this.pages.pageSize
            });
            this.$http.post("/casion/basiccomco/query",params)
              .then((response) => {
                    this.yiiLoading.hide();
                    let res = response.data.data;
                    let list = res ? res.data : [];
                    for(let i=0;i<list.length;i++){
                        let co = list[i];
                        co.selected=false;
                        co.checked = false;
                    }
                    this.cos = list;
                    if(res.page){
                        this.pages.total = res.page.totalCount;
                    }
              }).catch((e)=>{
                    console.log("e",e);
              })
        },
        getComs(){
            this.yiiLoading.show();
            let params = Object.assign({}, this.searchData, {
                coid:this.selectedCo.id
            });
            this.$http.post("/casion/basiccom/query",params)
              .then((response) => {
                    this.yiiLoading.hide();
                    let res = response.data.data;
                    let list = res ? res.data : [];
                    for(let i=0;i<list.length;i++){
                        let com = list[i];
                        com.selected=false;
                    }
                    this.coms = list;
                    
            }).catch((e)=>{
                    console.log("e",e);
            })
        },
        clickCo(co){
            if(this.selectedCo){
                this.selectedCo.selected = false;
            }
            this.selectedCo=co;
            console.log("co",co);
            this.selectedCo.selected = true;
            this.getComs();
        },
        checkCo(co,event){
            co.checked=!co.checked;

            event.stopPropagation();
        },
        clickCom(com){

        },
        checkAll(){
            this.checkedAll = !this.checkedAll;
            for(let com of this.coms){
                com.selected = this.checkedAll;
            }
        },
        currentPageChange(){
            this.list();
        },
        search(){
            this.pages.currentPage = 1;
            this.list();
        },
        resetParams(){
            this.searchData = Object.assign({},this.defaultParams);
        },
        multipleChange(checks){
            this.selectData = checks;
        },
        confirm(){
            let data = this.coms.filter((item)=>{
                return item.selected;
            });
            let selectedCos = this.cos.filter((item)=>{
                return item.checked;
            });
            this.$emit("confirm",data,selectedCos);
        },
        close(){
            this.modalShow = false;
        }
    }
  }