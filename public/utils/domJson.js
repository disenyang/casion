//组件转json工具
import  {$} from 'jquery'

export default{
    //dom:文档对象 idFunc:生成id方法 extendParent:是否继承上下级关系
    domToJson:function(dom,idFunc,extendParent){
        function attrCastToProps(e){
            var attArr = e.attributes;
            let props = {};
            for(var i in attArr){
                if(!isNaN(parseInt(i))){
                    let attrName = attArr[i].name;
                    let value = attArr[i].nodeValue;
                    value = attrName.startsWith(":")?`\{\{${value}\}\}`:value;
                    
                    attrName = attrName.startsWith(":")?attrName.substring(1):attrName;
                    attrName = attrName.startsWith("@")?attrName.substring(1):attrName;
                    attrName = attrName.startsWith("v-on:")?attrName.substring(5):attrName;
                    props[attrName] = value;
                }
            }
            return props;
        }
        let e = $(dom);
        let component = {name:e[0].localName,props:attrCastToProps(e[0])};
        if(idFunc){
            component.id = idFunc();
        }

        function digui(e,parent){
            let children = e.children();
            let cc = [];
            for(let i=0;i<children.length;i++){
                let c = children[i];
                let tagName = c.localName;
                let props = attrCastToProps(c);

                let comp = {name:tagName,props:props};
                if(extendParent){
                    comp.parent = parent;
                }
                if(idFunc){
                    comp.id = idFunc();
                }
                cc.push(comp);
                digui($(c),comp);
            }
            parent.children = cc;
        }

        digui(e,component);
        return component;
    }
}