export default {
    name:"yiEditComTree",
    data(){
        return {
           
        }
    },
    props:{
        "nodes":{
            type:Array
        }
    },
    created(){
        console.log("nodes=======",this.nodes);
    }
}