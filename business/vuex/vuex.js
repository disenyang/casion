/**
 * File Created: 2017-12-31 1:58:46 am
 * Author: gaoyang
 * Last Modified: 2018-01-01 11:18:12 am
 * Modified By: gaoyang
 * Copyright (c) 2017 rongyi
 */
export default function(Vue) {
    var vuexMap = {
        state: {
            head_title:"",
            userinfo:{},
            page:{
                selectedPage:{},
                showMenuNode:{},
                //选中的节点
                selectedNode:null,
                //选中的节点焦点类型 1:焦点在组件名称上 2:在属性上
                selectedNodeFocusType:1
            },
            defaultHeadimg:"http://oxwmr019d.bkt.clouddn.com/default.jpg",
            editVersion:0,
            recoverPageversion:null,
            //选中的组件
            selectedComponent:null,
            defaultProps:{
                ref:{
                    type:String,
                    name:"组件引用",
                    desc:"组件引用"
                },
                width:{
                    type:String,
                    name:"宽度",
                    desc:"宽度",
                    propType:"style"
                },
                height:{
                    type:String,
                    name:"高度",
                    desc:"高度",
                    propType:"style"
                },
                paddingLeft:{
                    type:String,
                    name:"左内边距",
                    desc:"左内边距",
                    propType:"style"
                },
                paddingRight:{
                    type:String,
                    name:"右内边距",
                    desc:"右内边距",
                    propType:"style"
                },
                paddingTop:{
                    type:String,
                    name:"顶内边距",
                    desc:"顶内边距",
                    propType:"style"
                },
                paddingBottom:{
                    type:String,
                    name:"底内边距",
                    desc:"底内边距",
                    propType:"style"
                },
                marginLeft:{
                    type:String,
                    name:"左外边距",
                    desc:"左外边距",
                    propType:"style"
                },
                marginRight:{
                    type:String,
                    name:"右外边距",
                    desc:"右外边距",
                    propType:"style"
                },
                marginTop:{
                    type:String,
                    name:"顶外边距",
                    desc:"顶外边距",
                    propType:"style"
                },
                marginBottom:{
                    type:String,
                    name:"底外边距",
                    desc:"底外边距",
                    propType:"style"
                },
                borderLeft:{
                    type:String,
                    name:"左边框",
                    desc:"左边框",
                    propType:"style"
                },
                borderRight:{
                    type:String,
                    name:"右边框",
                    desc:"右边框",
                    propType:"style"
                },
                borderTop:{
                    type:String,
                    name:"顶边框",
                    desc:"顶边框",
                    propType:"style"
                },
                borderBottom:{
                    type:String,
                    name:"底边框",
                    desc:"底边框",
                    propType:"style"
                },
                backgroundColor:{
                    type:String,
                    name:"背景颜色",
                    desc:"背景颜色",
                    propType:"style"
                },
                backgroundImage:{
                    type:String,
                    name:"背景图片",
                    desc:"背景图片",
                    propType:"style"
                },
                backgroundRepeat:{
                    type:String,
                    name:"背景重复",
                    desc:"背景重复",
                    propType:"style"
                },
                backgroundPosition:{
                    type:String,
                    name:"背景位置",
                    desc:"背景位置",
                    propType:"style"
                },
                backgroundSize:{
                    type:String,
                    name:"背景大小",
                    desc:"背景大小",
                    propType:"style"
                },
                fontSize:{
                    type:String,
                    name:"字体大小",
                    desc:"字体大小",
                    propType:"style"
                },
                boxShadow:{
                    type:String,
                    name:"盒子阴影",
                    desc:"盒子阴影",
                    propType:"style"
                },
                color:{
                    type:String,
                    name:"字体颜色",
                    desc:"字体颜色",
                    propType:"style"
                },
                fontWeight:{
                    type:String,
                    name:"字体粗细",
                    desc:"字体粗细",
                    propType:"style"
                },
                borderRadius:{
                    type:String,
                    name:"圆角半径",
                    desc:"圆角半径",
                    propType:"style"
                }
                // textAlign:{
                //     type:String,
                //     name:"内容位置",
                //     desc:"内容位置",
                //     values:[
                //         {
                //             lab:"居左",
                //             val:"left"
                //         },
                //         {
                //             lab:"居中",
                //             val:"center"
                //         },
                //         {
                //             lab:"居右",
                //             val:"right"
                //         }
                //     ]
                // }
            },
            dealJscode(jscode,babel){
                let code = JSON.stringify(this.defaultProps);
                code = code.substring(1,code.length-1);
                let uncode = JSON.stringify(this.defaultUnProps);
                uncode = uncode.substring(1,uncode.length-1);

                jscode = jscode.replace(/\.\.\.defaultProps/g,code);
                jscode = jscode.replace(/\.\.\.defaultUnProps/g,uncode);
                if(jscode.indexOf("render(")!=-1){
                    let suffix = "var thishhhh = ";
                    //含有jsx语法
                    jscode=babel.transform(suffix+jscode, {presets: ['es2015'],plugins: ['vueJsx']}).code+"";  
                    
                    jscode = jscode.replace("\"use strict\";","");
                    jscode = jscode.replace("'use strict';","");
                    jscode = jscode.replace(suffix,"");
                    let lastChar = "";
                    lastChar = jscode.substring(jscode.length-1,jscode.length);
                    
                    if(lastChar==";"){
                        jscode = jscode.substring(0,jscode.length-1);
                    }
                }
                return jscode;            
            },
            defaultUnProps:{
                "v-if":{
                    type:String,
                    name:"是否创建",
                    desc:"是否创建"
                },
                "v-show":{
                    type:String,
                    name:"是否显示",
                    desc:"是否显示"
                },
                click:{
                    type:String,
                    name:"单击事件",
                    desc:"单击事件",
                    propType:"event"
                },
                dblclick:{
                    type:String,
                    name:"双击事件",
                    desc:"双击事件",
                    propType:"event"
                },
                mouseover:{
                    type:String,
                    name:"鼠标over",
                    desc:"鼠标over",
                    propType:"event"
                },
                mouseout:{
                    type:String,
                    name:"鼠标离开",
                    desc:"鼠标离开",
                    propType:"event"
                }
            },
            project:{
                basiccoms:[],
                pages:[],
                projectconfig:"",
                routerconfig:"",
                data:null,
                cssconfig:null
            },
            template:{
                
            }
        },
        mutations: { //修改数据的唯一途径
            setHead_title(state,title){
                state.head_title = title;
            },
            setSelectedPage(state,node){
                state.page.selectedPage = node;
            },
            setShowMenuNode(state,node){
                state.page.showMenuNode = node;
            },
            setBasiccoms(state,basiccoms){
                state.project.basiccoms = basiccoms;
            },
            setProjectconfig(state,projectconfig){
                state.project.projectconfig = projectconfig;
            },
            setRouterconfig(state,routerconfig){
                state.project.routerconfig = routerconfig;
            },
            setPages(state,pages){
                state.project.pages = pages;
            },
            setProject(state,project){
                state.project.data = project;
            },
            setCssconfig(state,cssconfig){
                state.project.cssconfig = cssconfig;
            },
            setEditVersion(state){
                state.editVersion=state.editVersion+1;
            },
            setTemplate(state,template){
                state.template=template;
            },
            setUserinfo(state,userinfo){
                state.userinfo=userinfo;
            },
            setRecoverPageversion(state,pageversion){
                state.recoverPageversion=pageversion;
            },
            setSelectedNodeAndFocus(state,nodeWrapper){
                state.page.selectedNode=nodeWrapper.node;
                state.page.selectedNodeFocusType=nodeWrapper.type;
            },
            setSelectedComponent(state,selectedComponent){
                state.selectedComponent=selectedComponent;
            }
        },
        actions: { //异步的操作时间
    
        }, 
        getters: { //这里的getters相当于就是实例中用到的计算属性
    
        }
    }
    return vuexMap
}