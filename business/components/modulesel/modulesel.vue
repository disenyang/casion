<template>
    <yii-modal class="modulesel-wrapper"
        v-model="modalShow"
        :auto-size="true"
        :height="panelHeight"
        :width="panelWidth"
        :maskClosable="false"
        :appendToBody="false"
        v-on:after-leave="destroyElement">

        <template slot="title">功能模块配置</template>
        <div class="module-sel-wrapper">

            <div class="module-form">
                <yii-row>
                    <yii-col span="3">模块名称</yii-col>
                    <yii-col span="8">
                        <yii-input v-model="moduleName" placeholder="请输入模块名称"></yii-input>
                    </yii-col>
                </yii-row>
                
            </div>
            <div class="modules">
                <div class="module" @click="selModuleId=module.id" :class="{selected:selModuleId==module.id}" v-for="(module,index) in modules">
                    <div class="image"><img :src="module.image"></div>
                    <div class="name">{{module.name}}</div>
                </div>
            </div>
        </div>
        <div id="module-mount">
        </div>
        <template slot="footer">
            <div class="btns">
                <yii-button @click="confirm"  :disabled="!moduleName || !selModuleId">确定</yii-button>

            </div>
        </template>
        
    </yii-modal>
</template>

<script>
    import modulesel from "./modulesel";
    export default modulesel;
</script>

<style src="./modulesel.css">
</style>