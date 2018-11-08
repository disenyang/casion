export default{
    mixins: [Vue.prototype.yiiModalDefault],
    data() {
        return {
            modalShow: true,
            title: '',
            panelHeight: 570,
        }
    },
    props:{
        msg:{
            type:[String]
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
        }
    }
}