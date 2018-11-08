<!-- Created by gaoyang 基础组件新建/修改页面-->
<template>
    <div class="jstool-setting-wrapper">
        <div class="form">
            <div class="row">
                <div class="val">
                    <yii-input v-model="formModel.name"  maxlength="36" counter ime placeholder="工具名称"></yii-input>
                    <yi-tip :msg="checkParams.name.msg" v-show="checkParams.name.error"></yi-tip>
                </div>
            </div>
            <div class="row">
                <div class="val">
                    <yii-input v-model="formModel.jsname"  maxlength="36" counter ime placeholder="js变量名"></yii-input>
                    <yi-tip :msg="checkParams.jsname.msg" v-show="checkParams.jsname.error"></yi-tip>
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