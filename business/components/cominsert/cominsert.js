export default{
    mixins: [Vue.prototype.yiiModalDefault],
    data() {
        return {
            modalShow: true,
            size:"small",
            position: 2//1:内部,2:左边,3:右边
        }
    },
    props:{
        
    },
    components: {
        
    },
    watch: {

    },
    created(){
    },
    mounted() {
        
    },
    methods:{
        confirm(){
            let data = this.position;
            this.$emit("confirm",data);
        },
        close(){
            this.modalShow = false;
        }
    }
}