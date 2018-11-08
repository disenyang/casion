<!-- Created by gaoyang 基础组件新建/修改页面-->
<template>
    <div class="basiccom-setting-wrapper">
        <div class="form">
            <div class="row">
                <div class="val">
                    <yii-input v-model="formModel.name"  maxlength="36" counter ime placeholder="组件名称"></yii-input>
                    <yi-tip :msg="checkParams.name.msg" v-show="checkParams.name.error"></yi-tip>
                </div>
            </div>
            <div class="row">
                <div class="val">
                    <yii-input v-model="formModel.enname"  maxlength="36" counter ime placeholder="标签名称"></yii-input>
                    <yi-tip :msg="checkParams.enname.msg" v-show="checkParams.enname.error"></yi-tip>
                </div>
            </div>
            <div class="row">
                <div class="val">
                    <div class="icon" @click="upload">
                        <div class="icon-img" v-if="formModel.icon">
                            <img :src="formModel.icon" >
                        </div>
                        <yii-button icon="plus" v-if="!formModel.icon" type="stroke"  size="large"></yii-button>
                    </div>
                    <div class="icon-lab">组件图标</div>
                    <yi-tip :msg="checkParams.icon.msg" v-show="checkParams.icon.error"></yi-tip>
                </div>
            </div>
            <div class="row">
                <div class="val">
                     <yii-select v-model="formModel.type">
                        <yii-select-option value="1" label="基本组件"></yii-select-option>
                        <yii-select-option value="2" label="表格类"></yii-select-option>
                        <yii-select-option value="3" label="布局"></yii-select-option>
                        <yii-select-option value="4" label="弹窗"></yii-select-option>
                        <yii-select-option value="6" label="树形组件"></yii-select-option>
                        <yii-select-option value="5" label="路由视图"></yii-select-option>
                     </yii-select>
                </div>
            </div>
            <div class="btns">
                <yii-button type="stroke" @click="back()">返回</yii-button>
                <yii-button @click="save()">保存</yii-button>
            </div>
        </div>

    </div>
</template>

<script>
    import setting from "./setting";
    export default setting;
</script>

<style src="./setting.css"></style>