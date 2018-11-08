<!-- Created by gaoyang 模版详情页面-->
<template>
    <div class="template-detail-wrapper">
        <div class="edit-area">
            <div class="detail-page">
                <div class="title">
                    模版详情
                </div>
                <div class="content">
                    <div class="row">
                        <div class="lab">
                            名称：
                        </div>
                        <div class="val">
                            {{template.name}}
                        </div>
                    </div>
                    <div class="row">
                        <div class="lab">
                            图标：
                        </div>
                        <div class="val">
                            <img :src="template.icon || defaultComImg">
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="edit-btn" @click="edit()" @mouseenter="enterEditBtn=true" @mouseleave="enterEditBtn=false">
                           <yi-tip msg="编辑" place="top" v-show="enterEditBtn"></yi-tip>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="page-wrapper">
                <div class="tabbar">
                    <div class="tab-wrapper" :class="{selected:tab.selected}" @click="clickTab(tab,index)" v-for="(tab,index) in tabs">
                        {{tab.name}}
                    </div>
                    <!-- <div class="mode-btn" :class="{edit:mode==1,preview:mode==2}" @mouseenter="showMode=true" @mouseleave="showMode=false" @click="clickModeBtn()">
                        <yi-tip :msg="mode==1?'编辑模式':'预览模式'" place="top" v-show="showMode"></yi-tip>
                    </div> -->
                     <div class="tree-btn"  @mouseenter="showTree=true" @mouseleave="showTree=false" @click="clickComTreeBtn()">
                        <yi-tip msg="组件树" place="top" v-show="showTree"></yi-tip>
                    </div>
                </div>
                <div id="preview-wrapper" v-show="tabs[0].selected">
                    <div id="preview">
                        
                    </div>
                </div>
                <!-- <div id="view-wrapper" v-if="tabs[1].selected">
                    <div id="viewCode">
                        <yi-edit-com-tree :nodes="treeComs" @clickNode="clickTreeComNode"></yi-edit-com-tree>
                    </div>
                </div> -->
               <!--  <div id="view-wrapper" v-if="tabs[1].selected">
                    <div id="viewCode">
                        <yi-edit-com-tree :nodes="treeComs" @clickNode="clickTreeComNode"></yi-edit-com-tree>
                    </div>
                </div> -->
                <!-- <div id="style" v-if="tabs[2].selected">
                    <codemirror
                      :value="template.cssContent"
                      :options="cssEditorOption"
                      ref="cssEditor"
                      @change="cssContentChange">
                    </codemirror>
                </div> -->
                <div id="viewModel" v-if="tabs[1].selected">
                    <codemirror
                      :value="template.jsContent"
                      :options="jsContentEditorOption"
                      ref="jsContentEditor"
                      @change="jsContentChange">
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
    </div>
</template>

<script>
    require('codemirror/mode/css/css')
    require('codemirror/mode/javascript/javascript')
    require('codemirror/mode/htmlmixed/htmlmixed')
    require('codemirror/mode/xml/xml')

    require('codemirror/addon/hint/show-hint.js')
    require('codemirror/addon/hint/show-hint.css')
    require('codemirror/addon/hint/javascript-hint.js')

    require('codemirror/addon/hint/xml-hint.js')
    require('codemirror/addon/hint/html-hint.js')
    require('codemirror/addon/hint/css-hint.js')
    require('codemirror/keymap/sublime.js')

    require('codemirror/theme/dracula.css');
    import detail from "./detail";
    export default detail;
</script>

<style src="./detail.css"></style>