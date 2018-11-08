<template>
    <yii-modal class="yii-comconfig-wrapper"
        v-model="modalShow"
        :auto-size="true"
        :size="size"
        :height="panelHeight"
        :appendToBody="false"
        v-on:after-leave="destroyElement">

        <template slot="title">配置信息</template>
        <div class="com-comconfig-wrapper">
            <div class="row" v-for="(prop, index) in configProps">
                <div class="lab">{{prop.name}}</div>
                <div class="val">
                    <yii-input v-if="!prop.values" v-model="prop.value"></yii-input>
                    <yii-select size="mini" style="width:150px;" v-if="prop.values" v-model="prop.value" placeholder="选择类型">
                        <yii-select-option v-for="(item, index) in prop.values" 
                          :key="index" :value="item.val" :label="item.lab"></yii-select-option>
                    </yii-select>
                </div>
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
    import comconfig from "./comconfig";
    export default comconfig;
</script>

<style src="./comconfig.css">
</style>