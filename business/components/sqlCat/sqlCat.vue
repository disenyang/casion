<template>
    <yii-modal class="sqlCat-wrapper"
        v-model="modalShow"
        :auto-size="true"
        :size="size"
        :height="panelHeight"
        :width="panelWidth"
        :mask-closable="false"
        :appendToBody="false"
        v-on:after-leave="destroyElement">
        <template slot="title">sql脚本</template>
        <div class="sqlCat">
            <textarea class="sqlCat-textarea" readonly="readonly">{{sql}}</textarea>
        </div>
        <template slot="footer">
            <div class="btns">
                <button @click="close">关闭</button>
            </div>
        </template>
    </yii-modal>
</template>

<script>
    import sqlCat from "./sqlCat";
    export default sqlCat;
</script>

<style src="./sqlCat.css">
</style>