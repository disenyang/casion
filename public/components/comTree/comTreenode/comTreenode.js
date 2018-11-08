export default {
    name:"yiComTreeNode",
    data(){
        return {
           
        }
    },
    props:{
        "node":{
            type:Object
        },
        level:{
            type:Number,
            default:0
        }
    },
    computed:{
        //选择的组件
        selectedComponent:function(){
            return this.$store.state.selectedComponent;
        },
        //基本的组件
        basiccoms:function(){
            return this.$store.state.project.basiccoms;
        },
        basiccom:function(){
            let basiccoms = this.$store.state.project.basiccoms;
            for(let basiccom of basiccoms){
                if(basiccom.enname==this.node.name){
                    return basiccom;
                }
            }
            return null;
        },
    },
    created(){
        
    },
    filters:{
        
    },
    methods:{
        expand(){
            this.node.expand = !this.node.expand;
        },
        clickNode(){
            let parent = this.$parent;
            let count = 0;
            while(parent && count<100){
                if(parent.$options._componentTag=="yi-com-tree"){
                   
                    parent.$emit("clickNode",this.node);
                    break;
                }
                parent = parent.$parent;
                count++;
            }
        },
        getKeyName:function(name){
            if(!this.basiccom){
                return name;
            }
            for(let p of this.basiccom.props){
                if(p.prop==name){
                    return p.name;
                }
            }
            return "";
        }
    }
}