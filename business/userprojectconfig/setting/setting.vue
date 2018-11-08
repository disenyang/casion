<!-- Created by gaoyang 用户项目配置新建/修改页面-->
<template>
    <div class="userprojectconfig-setting-wrapper">
        <yii-form class="form" ref="form" :model="formModel" :rules="formRules" label-span="4" content-span="8" label-position="right">
            <yii-form-item prop="user" label="用户" required>
                <yii-input v-model="formModel.user"  maxlength="36" counter ime placeholder="请输入用户"></yii-input>
            </yii-form-item>
            <yii-form-item prop="project" label="项目" required>
                <yii-input v-model="formModel.project"  maxlength="36" counter ime placeholder="请输入项目"></yii-input>
            </yii-form-item>
            <yii-form-item prop="openpageid" label="打开的页面" required>
                <yii-input v-model="formModel.openpageid"  maxlength="36" counter ime placeholder="请输入打开的页面"></yii-input>
            </yii-form-item>
            <yii-form-item prop="rootopen" label="根结点是否打开" required>
                <yii-input v-model="formModel.rootopen"  maxlength="36" counter ime placeholder="请输入根结点是否打开"></yii-input>
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