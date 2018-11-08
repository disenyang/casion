<!-- Created by gaoyang 基础组件详情页面-->
<template>
    <div class="basiccom-detail-wrapper">
        
        <div class="edit-area">
            <div class="line1">
                <div class="detail-page">
                    <div class="title">
                        组件详情
                    </div>
                    <div class="content">
                        <div class="row">
                            <div class="lab">
                                名称：
                            </div>
                            <div class="val">
                                {{basiccom.name}}
                            </div>
                        </div>
                        <div class="row">
                            <div class="lab">
                                英文名称：
                            </div>
                            <div class="val">
                                {{basiccom.enname}}
                            </div>
                        </div>
                        <div class="row">
                            <yii-tooltip content="编辑" v-if="basiccom.createuser==userinfo.id" placement="top">
                                <yii-button icon="edit" @click="edit()" type="text"></yii-button>
                            </yii-tooltip>
                            <yii-tooltip content="删除" v-if="basiccom.createuser==userinfo.id"  placement="top">
                                <yii-button icon="delete" @click="del()" type="text"></yii-button>
                            </yii-tooltip>
                        </div>
                    </div>
                </div>
                <div class="preview-page">
                    <div class="title1">
                        组件预览&案例
                    </div>
                    <div class="content">
                        
                    </div>
                </div>
                <div class="tabbar">
                    <div class="tab" @click="selTab=1" :class="{selected:selTab==1}">
                        视图代码
                    </div>
                    <div class="tab" @click="selTab=2" :class="{selected:selTab==2}">
                        样式代码
                    </div>
                    <div class="tab" @click="selTab=3" :class="{selected:selTab==3}">
                        文档代码
                    </div>
                    <div class="tab" @click="selTab=4" :class="{selected:selTab==4}">
                        <div class="title">测试代码</div>
                        <div class="runtest-btn" v-if="selTab==4" @click="runTest()"></div>
                    </div>
                </div>
                <div class="view-page" v-if="selTab==1">
                    <div class="content">
                        <codemirror
                          :value="viewcode"
                          :options="viewEditorOption"
                          ref="viewEditor"
                          @change="viewcodeChange">
                        </codemirror>
                    </div>
                </div>
                <div class="style-page" v-if="selTab==2">
                    <div class="content">
                        <codemirror
                          :value="stylecode"
                          :options="styleEditorOption"
                          ref="styleEditor"
                          @change="stylecodeChange">
                        </codemirror>
                    </div>
                </div>
                <div class="style-page" v-if="selTab==3">
                    <div class="content">
                        <codemirror
                          :value="documentcode"
                          :options="documentEditorOption"
                          ref="documentEditor"
                          @change="documentcodeChange">
                        </codemirror>
                    </div>
                </div>

                <div class="test-page" v-if="selTab==4">

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
                          :value="jscode"
                          :options="jsEditorOption"
                          ref="jsEditor"
                          @change="jscodeChange">
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