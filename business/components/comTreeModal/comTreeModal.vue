<template>
    <yii-modal class="comTree-wrapper"
        v-model="modalShow"
        :auto-size="true"
        :size="size"
        :height="panelHeight"
        :width="panelWidth"
        :mask-closable="false"
        :appendToBody="false"
        v-on:after-leave="destroyElement">
        <template slot="title">组件树</template>
        <div class="comTree">
            <div class="content">
                <yi-com-tree :nodes="treeComs" @clickNode="clickTreeComNode"></yi-com-tree>
            </div>
        </div>
        <template slot="footer">
            <div class="btns">
                <button @click="close">关闭</button>
            </div>
        </template>
    </yii-modal>
</template>

<script>
    import comTreeModal from "./comTreeModal";
    export default comTreeModal;
</script>

<style src="./comTreeModal.css">
</style>