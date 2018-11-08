export default {
	name:"YiLabel",
	data(){
		return {

		}
	},
	props:{
		"width":String,
		"height":String,
		"value":String,
		"formatter":{
			type:[Function,String]
		}
	},
	mounted(){
       	
       	this.$nextTick(function() {
       		this.value = this.dictionaryShow();
       	})
	},
	methods:{
		dictionaryShow(){
            if(!this.value) return '';

            let value = this.value;
            
            if(this.formatter){
            	if(Object.prototype.toString.call(this.formatter) == '[object Function]'){
                    return this.formatter(value);
                }else if(Object.prototype.toString.call(this.formatter) == '[object String]'){
                	let labels = eval(`(${this.formatter})`);
                    let label = labels[value+""];
                    
                    if(Object.prototype.toString.call(label) == '[object Object]'){
                        label = label.label;
                    }
                    return label == undefined ? value : label;
                }else{
            		return value;
            	}
            }else{
            	return value;
            }
            
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