<template>
    <yii-modal class="yii-cominsert-wrapper"
        v-model="modalShow"
        :auto-size="true"
        :size="size"
        :appendToBody="false"
        v-on:after-leave="destroyElement">

        <template slot="title">插入选择</template>
        <div class="com-cominsert-wrapper">
            <div class="row">
                <yii-radio v-model="position" :label="2">选择的组件之前插入</yii-radio>
            </div>
            <div class="row">    
               <yii-radio v-model="position" :label="1">选择的组件内插入</yii-radio>
            </div>
            <div class="row">
                <yii-radio v-model="position" :label="3">选择的组件后插入</yii-radio>
            </div>
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
    import cominsert from "./cominsert";
    export default cominsert;
</script>

<style src="./cominsert.css">
</style>