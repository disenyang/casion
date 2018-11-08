var marked = require('marked');
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
});

export default {
	data(){
		return {

		}
	},
	mounted(){
		let html = marked(`# Checkbox 多选框一组备选项中进行多选
      ## 示例
      ::: demo 基础用法&禁用`);
		let vueObj = {
                el:".reademeMount",
                beforeMount(){
                    
                },
                renderError (h, err) {
                    return h('pre', { style: { color: 'red' }}, err.stack)
                },
                errorCaptured:function(err, vm, info){
                    console.log("errorCaptured");
                    return false;
                },
                template:html
            };
            

            try{
                let vue = new Vue(vueObj);
            }catch(e){
                console.log("!!!!error");
            }
		
	}
}
