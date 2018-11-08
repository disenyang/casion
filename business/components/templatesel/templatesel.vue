<template>
    <yii-modal class="templatesel-wrapper"
        v-model="modalShow"
        :auto-size="true"
        :size="size"
        :maskClosable="false"
        :height="panelHeight"
        :appendToBody="false"
        v-on:after-leave="destroyElement">

        <template slot="title">插入模版</template>
        <div class="template-sel-wrapper">
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
                <yii-button @click="confirm"  :disabled="!selTemplateId">确定</yii-button>
            </div>
        </template>
        
    </yii-modal>
</template>

<script>
    import templatesel from "./templatesel";
    export default templatesel;
</script>

<style src="./templatesel.css">
</style>