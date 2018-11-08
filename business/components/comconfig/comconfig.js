export default{
    mixins: [Vue.prototype.yiiModalDefault],
    data() {
        return {
            modalShow: true,
            title: ''
        }
    },
    props:{
        configProps:{
            type:[Array,Object]
        },
        popSize:{
            type:[Array,Object]
        }
    },
    components: {
        
    },
    watch: {

    },
    created(){
        this.size = this.popSize;
    },
    mounted() {
        
    },
    methods:{
        confirm(){
            let data = this.configProps;
            this.$emit("confirm",data);
        },
        close(){
            this.modalShow = false;
        }
    }
}