<template>
    <yii-modal class="com-propEdit-wrapper"
        v-model="modalShow"
        :auto-size="true"
        :size="size"
        :height="panelHeight"
        :width="panelWidth"
        :mask-closable="false"
        :appendToBody="false"
        v-on:after-leave="destroyElement">
        <template slot="title">属性编辑-{{title}}</template>
        <div class="com-propEdit">
            <codemirror
              :value="propValue"
              :options="propValueEditorOption"
              ref="propValueEditor"
              @change="propValueChange">
            </codemirror>
        </div>
        <template slot="footer">
            <div class="btns">
                <button @click="confirm">确定</button>
                <button @click="close">关闭</button>
            </div>
        </template>
    </yii-modal>
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
    import propEdit from "./propEdit";
    export default propEdit;
</script>

<style src="./propEdit.css">
</style>