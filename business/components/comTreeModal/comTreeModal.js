export default{
    mixins: [Vue.prototype.yiiModalDefault],
    data() {
        return {
            modalShow: true,
            title: '',
            panelHeight:570,
            panelWidth:800,
            selectedIndex:0
        }
    },
    props:{
        treeComs:{
            type:[Array,Object]
        },
        vmParent:{

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
        confirm(){
            this.$emit("confirm",this.propValue);
        },
        close(){
            this.modalShow = false;
        },
        clickTreeComNode(node){
            this.vmParent.clickTreeComNode(node);
        }

        
    }
}