export default{
    mixins: [Vue.prototype.yiiModalDefault],
    data(){
        return {
            tableList:[],
            tableId:null,
            modalShow:true,
            columnList:[],
            panelWidth:1200,
            panelHeight:600,
            queryChecked:false,
            listChecked:false,
            detailChecked:false,
            settingChecked:false,
            table:null,
            queryColumns:[],
            listColumns:[],
            detailColumns:[],
            settingColumns:[] 
        }
    },
    props:{
        modelid:{
            type:String
        }
    },
    mounted(){
        this.getColumns();
    },
    watch:{
        queryChecked:function(newValue){
            for(let row of this.columnList){
                row.queryChecked=newValue;
            }
        },
        listChecked:function(newValue){
            for(let row of this.columnList){
                row.listChecked=newValue;
            }
        },
        detailChecked:function(newValue){
            for(let row of this.columnList){
                row.detailChecked=newValue;
            }
        },
        settingChecked:function(newValue){
            for(let row of this.columnList){
                row.settingChecked=newValue;
            }
        }
    },
    methods:{
        getColumns(){
            this.yiiLoading.show();
            this.$http.post("/casion/modelitem/query",{modelid:this.modelid})
            .then((response) => {
                    let res = response.data.data;
                    let list = res ? res.data : [];
                    for(let row of list){
                        if(row.name=="id" || row.name=="createuser"|| row.name=="updateuser" || row.name=="d_flag"){
                            row.queryChecked=false;
                            row.listChecked=false;
                            row.settingChecked=false;
                            row.detailChecked=false;
                        }else if(row.name=="createusername"||row.name=="updateusername"||row.name=="createtime"||row.name=="updatetime"){
                            row.queryChecked=false;
                            row.listChecked=true;
                            row.settingChecked=false;
                            row.detailChecked=true;
                        }else{
                            row.queryChecked=true;
                            row.listChecked=true;
                            row.settingChecked=true;
                            row.detailChecked=true;
                        }
                    }
                    this.columnList = list;
                }).catch((e)=>{
                    console.error("e",e);
                })
        },
        //确定
        confirm(){
            this.queryColumns=this.columnList.filter((column)=>column.queryChecked);
            this.listColumns=this.columnList.filter((column)=>column.listChecked);
            this.settingColumns=this.columnList.filter((column)=>column.settingChecked);
            this.detailColumns=this.columnList.filter((column)=>column.detailChecked);
            this.$emit("confirm",this.queryColumns,this.listColumns,this.settingColumns,this.detailColumns);
        },
        //关闭
        close(){
            this.modalShow = false;
        },
        filters:{
            getItemTypeText(type){
                return type;
            },
            getItemRequiredText(required){
                let str;
                switch(required){
                    case 1:str="必填";break;
                    case 2:str="非必填";break;
                }
                return str;
            }
        }
    }
}