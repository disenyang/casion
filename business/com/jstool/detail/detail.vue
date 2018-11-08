<!-- Created by gaoyang 基础组件详情页面-->
<template>
    <div class="jstool-detail-wrapper">
        <div class="edit-area">
            <div class="line1">
                <div class="detail-page">
                    <div class="title">
                        js工具详情
                    </div>
                    <div class="content">
                        <div class="row">
                            <div class="lab">
                                名称：
                            </div>
                            <div class="val">
                                {{jstool.name}}
                            </div>
                        </div>
                        <div class="row">
                            <div class="lab">
                                js变量名：
                            </div>
                            <div class="val">
                                {{jstool.jsname}}
                            </div>
                        </div>
                        <div class="row">
                            <div class="edit-btn" @click="edit()" @mouseenter="enterEditBtn=true" @mouseleave="enterEditBtn=false">
                               <yi-tip msg="编辑" place="top" v-show="enterEditBtn"></yi-tip>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="preview-page">
                    <div class="title1">
                        测试预览
                    </div>
                    <div class="content">
                        
                    </div>
                </div>
                
                

                <div class="test-page">
                    <div class="title">
                        <div class="name">测试代码</div>
                    </div>
                    <div class="content">
                        <codemirror
                          :value="testcode"
                          :options="testEditorOption"
                          ref="testEditor"
                          @change="testcodeChange">
                        </codemirror>
                    </div>
                </div>

                

                
                
            </div>
            <div class="line2">
                <div class="js-page">
                    <div class="title">
                        js代码
                    </div>
                    <div class="content">
                        <codemirror
                          :value="code"
                          :options="codeEditorOption"
                          ref="codeEditor"
                          @change="codeChange">
                        </codemirror>
                    </div>
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