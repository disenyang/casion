import  {$} from 'jquery'
import {emitter} from 'utils'
import {uuid} from 'utils'

export default {
    name:"yiEditComTreeNode",
    mixins:[emitter],
    data(){
        return {
            menuProps:[],
            popMenu:{
                left:0,
                top:0,
                showMenu:false,
                props:[]
            },
            popNodeNameMenu:{
                left:0,
                top:0,
                showMenu:false,
                props:[],
                popMenus:[]
            },
            popMenuProps:[],
            showOptBtn:false
        }
    },
    props:{
        "node":{
            type:Object
        }
    },
    watch:{
        "node.propValues":function(newValue){
            //this.changePropValues();
            
        }
    },
    created(){
        
    },
    computed:{
        basiccoms:function(){
            return this.$store.state.project.basiccoms;
        },
        template:function(){
            return this.$store.state.template;
        },
        selectedNode:function(){

            return this.$store.state.page.selectedNode;
        },
        selectedNodeFocusType:function(){
            return this.$store.state.page.selectedNodeFocusType;
        }
    },
    mounted(){

        $(`#element${this.node.id}`).on("keydown",".prop-values",(event)=>{
            console.log("event.keyCode",event.keyCode);
            if( event.keyCode == 37 ){
                //向左
                let inputId = "input"+this.node.id;
                let textDom = document.getElementById(inputId);

                let cursorPostion = this.getCursorPosition(textDom);
                if(cursorPostion==0){
                    this.$store.commit("setSelectedNodeAndFocus",{
                        node:this.node,
                        type:1
                    });
                }
            }
            if( event.keyCode == 40 ){
                //向下
                for(let p of this.popMenuProps){
                    if(p.selected){
                        p.selected=false;
                        let index= this.popMenuProps.indexOf(p);
                        let toIndex = index+1;
                        if(toIndex>this.popMenuProps.length-1){
                            this.popMenu.showMenu = false;
                            break;
                        }

                        this.popMenuProps[toIndex].selected = true;
                        break;
                    }
                }
                event.stopPropagation();
                event.preventDefault();
            }
            if( event.keyCode == 38){
                //向上
                for(let p of this.popMenuProps){
                    if(p.selected){
                        p.selected=false;
                        let index= this.popMenuProps.indexOf(p);
                        let toIndex = index-1;
                        if(toIndex<0){
                            this.popMenu.showMenu = false;
                            break;
                        }

                        this.popMenuProps[toIndex].selected = true;
                        break;
                    }
                }
                event.stopPropagation();
                event.preventDefault();
            }

            if( event.keyCode == 13){
                //向上
                if(this.popMenu.showMenu){
                    for(let p of this.popMenuProps){
                        if(p.selected){
                            this.clickPropMenu(p);
                            break;
                        }
                    }
                }else{
                    this.createNode();
                }
                
                event.stopPropagation();
                event.preventDefault();
            }
            
            
            
        });


        $(`#element${this.node.id}`).on("keydown",".name-input",(event)=>{
            if( event.keyCode == 39 ){
                //向右
                let inputId = "nodeInput"+this.node.id;
                let textDom = document.getElementById(inputId);

                let cursorPostion = this.getCursorPosition(textDom);
                if(cursorPostion==this.node.name.length-1){
                    this.$store.commit("setSelectedNodeAndFocus",{
                        node:this.node,
                        type:2
                    });
                }
            }
            if( event.keyCode == 40 ){
                //向下
                for(let p of this.popNodeNameMenu.popMenus){
                    if(p.selected){
                        p.selected=false;
                        let index= this.popNodeNameMenu.popMenus.indexOf(p);
                        let toIndex = index+1;
                        if(toIndex>this.popNodeNameMenu.popMenus.length-1){
                            this.popNodeNameMenu.showMenu = false;
                            break;
                        }
                        this.popNodeNameMenu.popMenus[toIndex].selected = true;
                        break;
                    }
                }
                event.stopPropagation();
                event.preventDefault();
            }
            if( event.keyCode == 38){
                //向上
                for(let p of this.popNodeNameMenu.popMenus){
                    if(p.selected){
                        p.selected=false;
                        let index= this.popNodeNameMenu.popMenus.indexOf(p);
                        let toIndex = index-1;
                        if(toIndex<0){
                            this.popNodeNameMenu.showMenu = false;
                            break;
                        }

                        this.popNodeNameMenu.popMenus[toIndex].selected = true;
                        break;
                    }
                }
                event.stopPropagation();
                event.preventDefault();
            }
            console.log("key",event.keyCode);
            if( event.keyCode == 8){
                if(this.node.name==""){
                    let index = this.node.parent.children.indexOf(this.node);
                    this.node.parent.children.splice(index,1);
                }
            }
            if( event.keyCode == 13){
                //enter

                if(this.popNodeNameMenu.showMenu){
                    for(let p of this.popNodeNameMenu.popMenus){
                        if(p.selected){ 
                            this.clickPropNodeMenu(p);
                            break; 
                        }
                    }
                }else{
                    this.createNode();
                }
                
                
                event.stopPropagation();
                event.preventDefault();
            }
            
            
            
        });


    },
    methods:{
        expand(){
            this.node.expand = !this.node.expand;
        },
        createNode(){
            let index = this.node.parent.children.indexOf(this.node);
            let node = {name:"",children:[],expand:true,id:uuid.uuid(),nodeProps:{},propValues:"",props:{},parent:this.node.parent};
            this.node.parent.children.splice(index+1,0,node);
            this.$store.commit("setSelectedNodeAndFocus",{
                node:node,
                type:1
            });
        },
        delNode(){
            //删除节点
            console.log("this.$parent",this.$parent);
            let parent = this.$parent;
            let count = 0;
            while(parent && count<100){

                if(parent.$options._componentTag===undefined){
                    parent.deleteComponent(this.node.id);
                    break;
                }
                parent = parent.$parent;
                count++;
            }
        },
        clickNode(){
            let parent = this.$parent;
            let count = 0;
            while(parent && count<100){
                if(parent.$options._componentTag=="yi-com-tree"){
                   
                    parent.$emit("clickNode",this.node);
                    break;
                }
                parent = parent.$parent;
                count++;
            }
            
        },
        
        clickPropMenu(menu){
            let inputId = "input"+this.node.id;
            let textDom = document.getElementById(inputId);
            let cursorPostion = this.getCursorPosition(textDom);

            let cusourBeforeValue = this.node.propValues.substring(0,cursorPostion);
            let cusourAfterValue = this.node.propValues.substring(cursorPostion);

            let splitExp = new RegExp("\s+","g");
            let splits = cusourBeforeValue.split(/\s+/);
            let key = splits[splits.length-1];

            let bindData=key.indexOf(":")==0;


            cusourBeforeValue = cusourBeforeValue.substring(0,cusourBeforeValue.length-key.length);

            let cp = cusourBeforeValue.length+menu.origProp.prop.length+2;
            

            this.node.propValues = cusourBeforeValue+menu.origProp.prop+`=""`+cusourAfterValue;
            this.$nextTick(()=>{
                this.setCursorPosition(textDom,cp);
            });
            this.popMenu.showMenu = false;
        },
        clickPropNodeMenu(menu){
            this.node.name = menu.origProp.enname;
            this.popNodeNameMenu.showMenu = false;
            this.$store.commit("setSelectedNodeAndFocus",{
                node:this.node,
                type:2
            });
        },
        keydownPopMenu(event){

        },
        changeNodeName(){
            let inputId = "nodeInput"+this.node.id;
            let textDom = document.getElementById(inputId);
            let coord = this.getInputCoord(textDom);
            let cursorPostion = this.getCursorPosition(textDom);
            let inputPositionLeft =  $(`#${inputId}`).offset().left;
            let inputHeight =  $(`#${inputId}`).height();

            // let left = coord.left; 
            // let bottom = coord.bottom; 
            
            // this.popNodeNameMenu.left = left-inputPositionLeft;
            // this.popNodeNameMenu.top = inputHeight+3;
            let cusourBeforeValue = this.node.name.substring(0,cursorPostion);

           
            let key = cusourBeforeValue;

            let popMenus = [];

            if(key){
                this.popNodeNameMenu.showMenu=true;
                for(let com of this.basiccoms){
                    let exp = new RegExp("(.*)("+key+")(.*)","i");
                    let beforeProp = com.enname.replace(exp,"$1");
                    let selProp = com.enname.replace(exp,"$2");
                    let afterProp = com.enname.replace(exp,"$3");
                    let newp = {beforeProp:beforeProp,selProp:selProp,afterProp:afterProp,name:com.name,origProp:com,selected:false};
                    if(exp.test(com.enname)){
                        popMenus.push(newp);
                        if(popMenus.length==1){
                            newp.selected=true;
                        }
                    }else{

                    }
                } 
            }
            
            this.popNodeNameMenu.popMenus = popMenus;

            // splitExp = new RegExp("\s+","g");
            // splits = this.node.propValues.split(/\s+/);
            // if(this.node.props){
            //     for(let s of splits){
            //         let nvs=s.split(/="|"/);
            //         if(nvs.length==3){
            //             this.node.props[nvs[0]]=nvs[1];
            //         }
            //     }
            //     console.log("this.node.props",this.node.props);
            //     this.$store.commit("setEditVersion");
            // }
            

        },
        changePropValues(){
            if(!this.popMenu.props || this.popMenu.props.length==0){
                for(let com of this.basiccoms){
                    if(com.enname.trim()===this.node.name.trim()){
                        let props = [...com.props];
                        for(let p of props){
                            p.show = true;
                        }
                        this.popMenu.props = props;
                        break;
                    }
                }
            }
            
            let inputId = "input"+this.node.id;
            let textDom = document.getElementById(inputId);
            let coord = this.getInputCoord(textDom);
            let cursorPostion = this.getCursorPosition(textDom);
            let inputPositionLeft =  $(`#${inputId}`).offset().left;
            let inputHeight =  $(`#${inputId}`).height();

            let left = coord.left; 
            let bottom = coord.bottom; 
            
            this.popMenu.left = left-inputPositionLeft;
            this.popMenu.top = inputHeight+3;
            let cusourBeforeValue = this.node.propValues.substring(0,cursorPostion);

            let splitExp = new RegExp("\s+","g");
            let splits = cusourBeforeValue.split(/\s+/);
            console.log("splits",splits);
            let key = splits[splits.length-1];
            let bindData=key.indexOf(":")==0;
            key = bindData?key.substring(1):key;

            let popMenuProps = [];

            if(key){
                this.popMenu.showMenu=true;

                for(let p of this.popMenu.props){
                    let exp = new RegExp("(.*)("+key+")(.*)","i");
                    let beforeProp = p.prop.replace(exp,"$1");
                    let selProp = p.prop.replace(exp,"$2");
                    let afterProp = p.prop.replace(exp,"$3");
                    let newp = {beforeProp:beforeProp,selProp:selProp,afterProp:afterProp,name:p.name,origProp:p,selected:false};
                    if(exp.test(p.prop)){
                        popMenuProps.push(newp);
                        if(popMenuProps.length==1){
                            newp.selected=true;
                        }
                    }else{

                    }
                } 
            }
            
            this.popMenuProps = popMenuProps;

            splitExp = new RegExp("\s+","g");
            splits = this.node.propValues.split(/\s+/);
            if(this.node.props){
                for(let s of splits){
                    let nvs=s.split(/="|"/);
                    if(nvs.length==3){
                        this.node.props[nvs[0]]=nvs[1];
                    }
                }
                console.log("this.node.props",this.node.props);
                this.$store.commit("setEditVersion");
            }
            

        },
        // 获取光标位置
        getCursorPosition(textDom) {
            var cursorPos = 0;
            
            if (document.selection) {
                // IE Support
                textDom.focus ();
                var selectRange = document.selection.createRange();
                selectRange.moveStart ('character', -textDom.value.length);
                cursorPos = selectRange.text.length;
            }else if (textDom.selectionStart || textDom.selectionStart == '0') {
                // Firefox support
                
                cursorPos = textDom.selectionStart;
            }
            return cursorPos;
        },
        /*
         * 设置光标位置
         * @Method setCursorPosition
         * @param t element
         * @param p number
         * @return
        */
        setCursorPosition:function(t, p){
            this.sel(t,p,p);
        },
        /**
        * 获取输入光标在页面中的坐标
        * @param  {HTMLElement} 输入框元素        
        * @return  {Object}  返回left和top,bottom
        */
        getInputCoord(elem) {
            if (document.selection) {   //IE Support
                elem.focus();
                var Sel = document.selection.createRange();
                return {
                    left: Sel.boundingLeft,
                    top: Sel.boundingTop,
                    bottom: Sel.boundingTop + Sel.boundingHeight
                };
            } else {
                var that = this;
                var cloneDiv = '{$clone_div}', cloneLeft = '{$cloneLeft}', cloneFocus = '{$cloneFocus}', cloneRight = '{$cloneRight}';
                var none = '<span style="white-space:pre-wrap;"> </span>';
                var div = elem[cloneDiv] || document.createElement('div'), focus = elem[cloneFocus] || document.createElement('span');
                var text = elem[cloneLeft] || document.createElement('span');
                var offset = that._offset(elem), index = this._getFocus(elem), focusOffset = { left: 0, top: 0 };

                if (!elem[cloneDiv]) {
                    elem[cloneDiv] = div, elem[cloneFocus] = focus;
                    elem[cloneLeft] = text;
                    div.appendChild(text);
                    div.appendChild(focus);
                    document.body.appendChild(div);
                    focus.innerHTML = '|';
                    focus.style.cssText = 'display:inline-block;width:0px;overflow:hidden;z-index:-100;word-wrap:break-word;word-break:break-all;';
                    div.className = this._cloneStyle(elem);
                    div.style.cssText = 'visibility:hidden;display:inline-block;position:absolute;z-index:-100;word-wrap:break-word;word-break:break-all;overflow:hidden;';
                };
                div.style.left = this._offset(elem).left + "px";
                div.style.top = this._offset(elem).top + "px";
                var strTmp = elem.value.substring(0, index).replace(/</g, '<').replace(/>/g, '>').replace(/\n/g, '<br/>').replace(/\s/g, none);
                text.innerHTML = strTmp;

                focus.style.display = 'inline-block';
                try { focusOffset = this._offset(focus); } catch (e) { };
                focus.style.display = 'none';
                return {
                    left: focusOffset.left,
                    top: focusOffset.top,
                    bottom: focusOffset.bottom
                };
            }
        },
        // 克隆元素样式并返回类
        _cloneStyle(elem, cache) {
            if (!cache && elem['${cloneName}']) return elem['${cloneName}'];
            var className, name, rstyle = /^(number|string)$/;
            var rname = /^(content|outline|outlineWidth)$/; //Opera: content; IE8:outline && outlineWidth
            var cssText = [], sStyle = elem.style;

            for (name in sStyle) {
                if (!rname.test(name)) {
                    let val = this._getStyle(elem, name);
                    if (val !== '' && rstyle.test(typeof val)) { // Firefox 4
                        name = name.replace(/([A-Z])/g, "-$1").toLowerCase();
                        cssText.push(name);
                        cssText.push(':');
                        cssText.push(val);
                        cssText.push(';');
                    };
                };
            };
            cssText = cssText.join('');
            elem['${cloneName}'] = className = 'clone' + (new Date).getTime();
            this._addHeadStyle('.' + className + '{' + cssText + '}');
            return className;
        },

        // 向页头插入样式
        _addHeadStyle(content) {
            var style = this._style[document];
            if (!style) {
                style = this._style[document] = document.createElement('style');
                document.getElementsByTagName('head')[0].appendChild(style);
            };
            style.styleSheet && (style.styleSheet.cssText += content) || style.appendChild(document.createTextNode(content));
        },
        _style: {},

        // 获取最终样式
        _getStyle: 'getComputedStyle' in window ? function (elem, name) {
            return getComputedStyle(elem, null)[name];
        } : function (elem, name) {
            return elem.currentStyle[name];
        },

        // 获取光标在文本框的位置
        _getFocus(elem) {
            var index = 0;
            if (document.selection) {// IE Support
                elem.focus();
                var Sel = document.selection.createRange();
                if (elem.nodeName === 'TEXTAREA') {//textarea
                    var Sel2 = Sel.duplicate();
                    Sel2.moveToElementText(elem);
                    var index = -1;
                    while (Sel2.inRange(Sel)) {
                        Sel2.moveStart('character');
                        index++;
                    };
                }
                else if (elem.nodeName === 'INPUT') {// input
                    Sel.moveStart('character', -elem.value.length);
                    index = Sel.text.length;
                }
            }
            else if (elem.selectionStart || elem.selectionStart == '0') { // Firefox support
                index = elem.selectionStart;
            }
            return (index);
        },

        // 获取元素在页面中位置
        _offset(elem) {
            var box = elem.getBoundingClientRect(), doc = elem.ownerDocument, body = doc.body, docElem = doc.documentElement;
            var clientTop = docElem.clientTop || body.clientTop || 0, clientLeft = docElem.clientLeft || body.clientLeft || 0;
            var top = box.top + (self.pageYOffset || docElem.scrollTop) - clientTop, left = box.left + (self.pageXOffset || docElem.scrollLeft) - clientLeft;
            return {
                left: left,
                top: top,
                right: left + box.width,
                bottom: top + box.height
            };
        },
        /*
         * 插入到光标后面
         * @Method add
         * @param t element
         * @param txt String
         * @return
        */
        add(t, txt){
            var val = t.value;
            if(document.selection){
                t.focus()
                document.selection.createRange().text = txt;  
            } else {
                var cp = t.selectionStart;
                var ubbLength = t.value.length;
                var s = t.scrollTop;
            //    document.getElementById('aaa').innerHTML += s + '<br/>';
                t.value = t.value.slice(0,t.selectionStart) + txt + t.value.slice(t.selectionStart, ubbLength);
                this.setCursorPosition(t, cp + txt.length);
            //    document.getElementById('aaa').innerHTML += t.scrollTop + '<br/>';
                firefox=navigator.userAgent.toLowerCase().match(/firefox\/([\d\.]+)/) && setTimeout(function(){
                    if(t.scrollTop != s) t.scrollTop=s;
                },0)

            };
        },
        
        
        /*
         * 删除光标 前面或者后面的 n 个字符
         * @Method del
         * @param t element
         * @param n number  n>0 后面 n<0 前面
         * @return
         * 重新设置 value 的时候 scrollTop 的值会被清0
        */
        del(t, n){
            var p =this.getCursorPosition(t);
            var s = t.scrollTop;
            var val = t.value;
            t.value = n >0? val.slice(0, p - n) + val.slice(p):
                            val.slice(0, p) + val.slice(p - n);
            this.setCursorPosition(t ,p - (n <0?0 : n));
            firefox=navigator.userAgent.toLowerCase().match(/firefox\/([\d\.]+)/) && setTimeout(function(){
                if(t.scrollTop != s) t.scrollTop=s;
            },10)
        },
        
        /*
         * 选中 s 到 z 位置的文字
         * @Method sel
         * @param t element
         * @param s number
         * @param z number
         * @return
        */
        sel(t, s, z){
            if(document.selection){
                var range = t.createTextRange();
                range.moveEnd('character', -t.value.length);         
                range.moveEnd('character', z);
                range.moveStart('character', s);
                range.select();
            }else{
                t.setSelectionRange(s,z);
                t.focus();
            }

        },
        
        
        /*
         * 选中一个字符串
         * @Method sel
         * @param t element
         * @param s String
         * @return
        */
        selString(t, s){
            var index = t.value.indexOf(s);
            index !=-1?this.sel(t, index, index + s.length) : false;
        }

    }
}