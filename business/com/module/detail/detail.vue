<!-- Created by gaoyang 模版详情页面-->
<template>
    <div class="module-detail-wrapper">
        <div class="edit-area">
            <div class="detail-page">
                <div class="title">
                    功能模块详情
                </div>
                <div class="content">
                    <div class="row">
                        <div class="lab">
                            名称：
                        </div>
                        <div class="val">
                            {{module.name}}
                        </div>
                    </div>
                    <div class="row">
                        <div class="lab">
                            图标：
                        </div>
                        <div class="val">
                            <img :src="module.icon || defaultComImg">
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
                    <div class="tab-wrapper" :class="{selected:true}" @click="clickTab(tab,index)" v-for="(tab,index) in tabs">
                        {{tab.name}}
                    </div>
                    
                </div>
                
               
                <div id="viewModel">
                    <codemirror
                      :value="module.jsContent"
                      :options="jsContentEditorOption"
                      ref="jsContentEditor"
                      @change="jsContentChange">
                    </codemirror>
                </div>
                
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