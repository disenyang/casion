
<script>
    
    export default {
        name: 'YiTableCell',

        props: {
            line: Object,//一行数据
            column: Object,//列对象
            col: Number,//列下标
            row: Number//行下标
        },
        render(h){
            return (
            	<td><div class="yii-table-cell">{ this.dictionaryShow() }</div></td>
            )
        },    	
        methods: {
            dictionaryShow(){
            	
                if(!this.column.item) return '';

                let value = this.line[this.column.item];
                
                if(this.column.formatter){
                	if(Object.prototype.toString.call(this.column.formatter) == '[object Function]'){
	                    return this.column.formatter(value,this.line,this.column,this.row,this.col);
	                }else if(Object.prototype.toString.call(this.column.formatter) == '[object String]'){
	                	let labels = eval(`(${this.column.formatter})`);
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
                
            }
        }
    }
</script>