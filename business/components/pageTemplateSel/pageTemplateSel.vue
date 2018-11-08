<template>
    <yii-modal class="pageTemplateSel-wrapper"
        v-model="modalShow"
        :auto-size="true"
        :size="size"
        :maskClosable="false"
        :height="panelHeight"
        :appendToBody="false"
        v-on:after-leave="destroyElement">

        <template slot="title">新建页面-选择模版</template>
        <div class="template-sel-wrapper">
            <div class="template-form">
                <yii-row>
                    <yii-col span="3">页面名称</yii-col>
                    <yii-col span="8">
                        <yii-input v-model="name" placeholder="请输入页面名称"></yii-input>
                    </yii-col>
                </yii-row>
            </div>
            <div class="templates">
                <div class="template" @click="selTemplateId=template.id" :class="{selected:selTemplateId==template.id}" v-for="(template,index) in templates">
                    <div class="image"><img :src="template.image"></div>
                    <div class="name">{{template.name}}</div>
                </div>
            </div>
            
        </div>
        <div id="template-mount">
        </div>
        <template slot="footer">
            <div class="btns">
                <yii-button @click="confirm"  :disabled="!name || !selTemplateId">确定</yii-button>
            </div>
        </template>
        
    </yii-modal>
</template>

<script>
    import pageTemplateSel from "./pageTemplateSel";
    export default pageTemplateSel;
</script>

<style src="./pageTemplateSel.css">
</style>