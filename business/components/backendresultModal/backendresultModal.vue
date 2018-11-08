<template>
    <yii-modal class="backendresultModal-wrapper"
        v-model="modalShow"
        :auto-size="true"
        :size="size"
        :height="panelHeight"
        :width="panelWidth"
        :mask-closable="false"
        :appendToBody="false"
        v-on:after-leave="destroyElement">
        <template slot="title">生成结果</template>
        <div class="backendresultModal">
            <textarea class="backendresultModal-textarea" readonly="readonly">{{msg}}</textarea>
        </div>
        <template slot="footer">
            <div class="btns">
                <button @click="close">关闭</button>
            </div>
        </template>
    </yii-modal>
</template>

<script>
    import backendresultModal from "./backendresultModal";
    export default backendresultModal;
</script>

<style src="./backendresultModal.css">
</style>