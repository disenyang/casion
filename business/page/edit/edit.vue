<!-- Created by gaoyang 页面文件夹详情页面-->
<template>
    <div class="page-edit-wrapper">
        <!-- <div class="topbar">
            <div class="components" :class="{'overflowhidden':!showBasiccomponentsAll}">
                <div class="caption-bar">
                    基本<br>组件
                </div>
                <div class="components-content">
                    <yii-tooltip v-for="(com,index) in basiccoms" :content="com.name"  placement="top" effect="black">
                            <div :class="['com']" :style="{backgroundImage:`url(${com.icon||defaultComImg})`}"  @dblclick="dblclickCom(com)" :cid="com.id" draggable="true" @click="clickCom(com)">
                                <div class="table-layout" v-if="com.name=='layout' && showTable">
                                    <table> 
                                        <tr v-for="row in table.rows">
                                            <td v-for="col in table.cols" @click="insert(com.name,row,col)">
                                            </td>
                                        </tr>
                                    </table>
                                </div> 
                            </div> 
                    </yii-tooltip>
                </div>
                <div class="drop-icon" @click="showBasiccomponentsAll=!showBasiccomponentsAll">
                </div>
            </div>
            <div class="biz-components" :class="{'overflowhidden':!showBizcomponentsAll}">
                <div class="caption-bar">
                    业务<br>组件
                </div>
                <div class="biz-components-content">
                    <div :class="['biz-com']" v-for="(bizcom,index) in bizcoms" @dblclick="dblclickCom(bizcom)" :cid="bizcom.id" draggable="true" @click="clickCom(bizcom)">
                        <div class="name">{{bizcom.name}}</div>
                    </div> 
                    
                </div>
                <yii-tooltip content="创建业务组件"  placement="top" effect="black">
                    <yii-button class="add-biz-com" icon="plus" type="text"></yii-button>
                </yii-tooltip>
                <div class="drop-icon" @click="showBizcomponentsAll=!showBizcomponentsAll">
                </div>
            </div>
            <div class="templates">
                <yii-tooltip content="插入模版" placement="top" effect="black">
                    <div class="template-add-btn" @mouseenter="showTemplate=true" @mouseleave="showTemplate=false"  @click="openSelTemplate">
                    </div>
                </yii-tooltip> 
            </div>
            
        </div> -->
        
        <div class="page-wrapper">
            <div class="tabbar">
                <div class="tab-wrapper" v-if="index!=1" :class="{selected:tab.selected}" @click="clickTab(tab,index)" v-for="(tab,index) in tabs">
                    {{tab.name}}
                </div>
                <div class="options">
                    <yii-tooltip content="预览" placement="top" effect="black">
                        <div class="icon-btn run-btn" @click="preview()"></div>
                    </yii-tooltip>
                    <yii-tooltip content="移动" placement="top" effect="black">
                        <div class="icon-btn move-btn" :class="{moving:moving}" @click="move()"></div>
                    </yii-tooltip>
                    <yii-tooltip content="撤销" placement="top" effect="black">
                        <div class="icon-btn back-btn" @click="backComponent()"></div>
                    </yii-tooltip>
                    <yii-tooltip content="前进" placement="top" effect="black">
                        <div class="icon-btn ahead-btn" @click="aheadComponent()"></div>
                    </yii-tooltip>
                    <yii-tooltip content="删除组件" placement="top" effect="black">
                        <div class="icon-btn del-btn" @click="deleteComponent()"></div>
                    </yii-tooltip>
                    <yii-tooltip content="父组件" placement="top" effect="black">
                        <div class="icon-btn parent-btn" @click="selectParent()"></div>
                    </yii-tooltip>
                    <yii-tooltip content="保存" placement="top" effect="black">
                        <div class="icon-btn save-btn" @click="savePageContent()"></div>
                    </yii-tooltip>
                </div>
                <!-- <div class="mode-btn" :class="{edit:mode==1,preview:mode==2}" @mouseenter="showMode=true" @mouseleave="showMode=false" @click="clickModeBtn()">
                    <yi-tip :msg="mode==1?'编辑模式':'预览模式'" place="top" v-show="showMode"></yi-tip>
                </div> -->
                 <!-- <div class="tree-btn"  @mouseenter="showTree=true" @mouseleave="showTree=false" @click="clickComTreeBtn()">
                    
                </div> -->
            </div>
            <div id="view-wrapper" v-show="tabs[0].selected">
                <div class="pc-view" id="view" v-if="project.type=='pc' || !project.type">
                </div>

                <div class="mobile-view" v-if="project.type=='mobile' || project.type=='weixin'">
                    <div class="header">
                        <div class="mobile-select">
                            <div class="mobile-label" @click="showMobileDrop=!showMobileDrop">
                                {{selectMobile.name}}
                            </div>
                            <div class="mobile-select-drop" v-if="showMobileDrop">
                                <div class="mobile" @click="clickMobile(mobile)" v-for="(mobile,index) in mobiles">
                                    {{mobile.name}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mobile-view-content">
                        <div class="mobile-view-content-wrapper" :style="{width:selectMobile.width+'px',height:selectMobile.height+'px'}">
                            <div class="weixin-header" >
                                <div class="tool-top">
                                    <div class="left">3:53</div>
                                    <div class="center"></div>
                                    <div class="right">98%</div>
                                </div>
                                <div class="tool-title">
                                    <div class="left"></div>
                                    <div class="center">{{pagename}}</div>
                                    <div class="right">...</div>
                                </div>
                            </div>
                            <div id="view" >
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div class="toolbars" :class="{'big-toolbars':project.type=='mobile' || project.type=='weixin'}">
                    <div class="com-tree" :class="{'big-com-tree':comTreeBig}">
                        <div class="caption-bar">
                            <span>组件树</span>
                            <div class="zoom" v-if="project.type=='pc' || !project.type" :class="{'zoom-big':!comTreeBig,'zoom-small':comTreeBig}" @click="comTreeBig=!comTreeBig"></div>
                        </div>
                        <div class="vals">
                             <yi-com-tree :nodes="[page.content]" @clickNode="clickTreeComNode"></yi-com-tree>
                        </div>
                    </div>
                    <div id="props" >
                        <div class="caption-bar">
                            <div class="title" v-if="selectedComponent">{{selectedComponent.title}}</div>
                            <div class="tabbar" v-if="selectedComponent">
                                <div class="tab-wrapper" v-for="(tab,index) in propTabs" :class="{selected:tab.selected}" @click="clickPropTab(tab,index)"> 
                                    {{tab.name}}
                                </div>
                            </div>
                        </div>
                        <div class="vals">
                            <div class="row" v-for="(prop, index) in props">
                                <div class="lab">
                                    <div class="lab-title">{{prop.name}}</div>
                                    <div class="lab-prop">{{prop.prop}}</div>
                                </div>
                                <div class="val" v-if="prop.prop!='childrenDefine'">
                                    <yii-input v-if="!prop.values"  v-model="prop.value"></yii-input>
                                    <yii-select size="mini" width="145px" v-if="prop.values" v-model="prop.value" placeholder="选择类型">
                                        <yii-select-option v-for="(item, index) in prop.values" 
                                          :key="index" :value="item.val" :label="item.lab"></yii-select-option>
                                    </yii-select>
                                </div>
                                <div class="val" v-if="prop.prop=='childrenDefine'">
                                    <div class="pop-dialog" @click="openPropEdit(prop)">
                                    <div class="prop-value">{{prop.value}}</div>
                                    <yii-icon name="edit"></yii-icon>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="viewCode" v-if="tabs[1].selected">
                <yi-edit-com-tree :nodes="treeComponents" @clickNode="clickTreeComNode"></yi-edit-com-tree>
            </div>
            <div id="style" v-if="tabs[2].selected">
                <codemirror
                  :value="styleContent"
                  :options="styleEditorOption"
                  ref="styleEditor"
                  @change="stylecodeChange">
                </codemirror>
            </div>
            <div id="viewModel" v-if="tabs[3].selected">
                <codemirror
                  :value="viewModelContent"
                  :options="viewmodeEditorOption"
                  ref="viewmodeEditor"
                  @change="viewmodecodeChange">
                </codemirror>
            </div>
            <!-- <div id="service" v-if="tabs[3].selected">
                <textarea id="serviceValue" v-focus v-model="styleContent">
                    
                </textarea>
            </div> --> 
        </div>
        <div class="errors">
            <div class="error" v-for="(error,index) in errors">
                {{error}}
            </div>
            <div class="success" v-if="errors.length==0">
                100%正确
            </div>
        </div>
    </div>
</template>

<script>
    require('codemirror/mode/css/css')
    require('codemirror/mode/javascript/javascript')
    require('codemirror/mode/htmlmixed/htmlmixed')

    require('codemirror/addon/hint/show-hint.js')
    require('codemirror/addon/hint/show-hint.css')
    require('codemirror/addon/hint/javascript-hint.js')
    require('codemirror/addon/hint/html-hint.js')
    require('codemirror/addon/hint/css-hint.js')
    require('codemirror/keymap/sublime.js')

    
    require('codemirror/theme/dracula.css');

    import edit from "./edit";
    export default edit;
</script>

<style src="./edit.css"></style>