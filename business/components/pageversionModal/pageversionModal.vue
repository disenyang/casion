<template>
    <yii-modal class="pageversion-modal-wrapper"
        v-model="modalShow"
        :auto-size="true"
        :size="size"
        :height="panelHeight"
        :width="panelWidth"
        :mask-closable="false"
        :appendToBody="false"
        v-on:after-leave="destroyElement">
        <template slot="title">页面历史版本</template>
        <div class="pageversion-modal">
            <div>
                <yii-select v-model="pageversion">
                    <yii-select-option v-for="(pageversion,index) in pageversions" :label="pageversion.createtime" :value="pageversion"></yii-select-option>
                </yii-select>
            </div>
            <div>
                <yii-tabs 
                    v-model="activeName" 
                    type="second"
                    size="normal">
                    <yii-tab-pane label="视图内容" name="first">{{pageversion.content}}</yii-tab-pane>
                    <yii-tab-pane label="css样式" name="second">{{pageversion.styleContent}}</yii-tab-pane>
                    <yii-tab-pane label="视图模型" name="third">{{pageversion.viewModelContent}}</yii-tab-pane>
                </yii-tabs>
            </div>
        </div>
        <template slot="footer">
            <div class="btns">
                <button @click="recover">恢复</button>
                <button @click="close">关闭</button>
            </div>
        </template>
    </yii-modal>
</template>

<script>
    import pageversionModal from "./pageversionModal";
    export default pageversionModal;
</script>

<style src="./pageversionModal.css">
</style>