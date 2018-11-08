export default {
	name:"YiButton",
	data(){
		return {

		}
	},
	props:["width","height","value"],
	methods:{
		elDblclickHandler(e){
            this.$emit('dblclick', val);
        },
        elClickHandler(e){
            this.$emit('click', e);
        },
        elMouseoverHandler(e){
            this.$emit('mouseover', e);
        },
        elMouseoutHandler(e){
            this.$emit('mouseout', e);
        },
        elMouseenterHandler(e){
            this.$emit('mouseenter', e);
        },
        elMouseleaveHandler(e){
            this.$emit('mouseleave', e);
        }
	}
}