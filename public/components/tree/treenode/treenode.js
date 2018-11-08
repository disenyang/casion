export default {
    name:"yiTreeNode",
    data(){
        return {
           
        }
    },
    props:{
        "node":{
            type:Object
        }
    },
    created(){
        
    },
    methods:{
        expand(){
            this.node.expand = !this.node.expand;
        },
        clickNode(){
            let parent = this.$parent;
            let count = 0;
            while(parent && count<100){
                if(parent.$options._componentTag=="yi-tree"){
                   
                    parent.$emit("clickNode",this.node);
                    break;
                }
                parent = parent.$parent;
                count++;
            }
            
        }
    }
}