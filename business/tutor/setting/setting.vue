<!-- Created by gaoyang 导师新建/修改页面-->
<template>
    <div class="tutor-setting-wrapper">
        <yii-form class="form" ref="form" :model="formModel" :rules="formRules" label-span="4" content-span="8" label-position="right">
            <yii-form-item prop="tutor" label="导师" required>
                <yii-input v-model="formModel.tutor"  maxlength="36" counter ime placeholder="请输入导师"></yii-input>
            </yii-form-item>
            <yii-form-item prop="student" label="学生" required>
                <yii-input v-model="formModel.student"  maxlength="36" counter ime placeholder="请输入学生"></yii-input>
            </yii-form-item>
            <yii-form-item prop="finishing" label="完成度" required>
                <yii-input v-model="formModel.finishing"  maxlength="36" counter ime placeholder="请输入完成度"></yii-input>
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