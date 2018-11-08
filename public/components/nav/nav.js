export default {
    name:"yi-nav",
    data(){
        return {
            selectedItem:null
        }
    },
    config:{
        insert:{
            inner:false,
            before:true,
            after:true
        }
    },
    computed:{
        
    },
    created(){
        console.log("route",this.$route);
    },
    methods:{
        clickItem(item){
            if(item.url){
                this.$router.push({path:item.url}); 
            }else{
                item.showChildren = !item.showChildren;
            }

            this.selectedItem = item;
            
        }
    },
    props:{
        direction:{
            type:[String],
            default:"vertical",
            values:[
                {lab:"垂直",val:"vertical"},
                {lab:"水平",val:"horizontal"}
            ],
            name:"方向",
            desc:"方向"
        },
        navs:{
            type:[Array],
            default:[
                
            ],
            name:"导航数据",
            desc:"导航数据"
        }
    }
}