export default {
	name: 'YiCell',
	data(){
		return {

		}
	},
	props:["width","height"],
	methods:{
		elInputHandler(e){
            this.$emit('input', val);
        },
        elFocusHandler(e){
            this.$emit('focus', e);
        },
        elBlurHandler(e){
            this.$emit('blur', e);
        },
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
