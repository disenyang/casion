export default {
    name:"yiComTree",
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