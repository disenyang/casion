<!-- Created by gaoyang 积分明细新建/修改页面-->
<template>
    <div class="scoredetail-setting-wrapper">
        <yii-form class="form" ref="form" :model="formModel" :rules="formRules" label-span="4" content-span="8" label-position="right">
            <yii-form-item prop="user" label="用户" required>
                <yii-input v-model="formModel.user"  maxlength="36" counter ime placeholder="请输入用户"></yii-input>
            </yii-form-item>
            <yii-form-item prop="type" label="类型" required>
                <yii-input v-model="formModel.type"  maxlength="36" counter ime placeholder="请输入类型"></yii-input>
            </yii-form-item>
            <yii-form-item prop="score" label="获得积分" required>
                <yii-input v-model="formModel.score"  maxlength="36" counter ime placeholder="请输入获得积分"></yii-input>
            </yii-form-item>
            <yii-form-item>
                <yii-button type="stroke" @click="back()">返回</yii-button>
                <yii-button @click="save()">保存</yii-button>
            </yii-form-item>
        </yii-form>
    </div>
</template>

<script>
    import setting from "./setting";
    export default setting;
</script>

<style src="./setting.css"></style>