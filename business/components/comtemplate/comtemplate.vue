<template>
    <yii-modal class="yii-comtemplate-wrapper"
        v-model="modalShow"
        :auto-size="true"
        :size="size"
        :height="panelHeight"
        :appendToBody="false"
        v-on:after-leave="destroyElement">

        <template slot="title">模版选择</template>
        <div class="com-comtemplate-wrapper">
            <div class="item" v-for="(template, index) in template.templates">
                    <yii-radio v-model="selectedIndex" :label="index">{{template.name}}</yii-radio>
            </div>
            <!-- <div class="tabContent" v-for="(template, index) in template.templates" v-if="template.selected">
                <div class="row" v-for="(com, index) in template.children">
                    <div class="lab">{{com.name}}</div>
                    <div class="val">
                       
                    </div>
                </div>
            </div> -->
                        
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
    import comtemplate from "./comtemplate";
    export default comtemplate;
</script>

<style src="./comtemplate.css">
</style>